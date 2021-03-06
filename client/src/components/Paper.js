import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Memo from './Memo';
import MemoForm from './MemoForm';
import './stylesheets/Paper.css';
import ColorList from '../ColorList';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.location.state.currentUser, // 근데 currentUser랑 paper는 상태가 변하지도 않는데 여기다 넣는 게 맞는 건지 모르겠다 그냥 보기 편하려고?
      paper: this.props.location.state.paper, // Link 컴포넌트를 눌렀을 때 받아옴 (위의 currentUser도)
      memos: [],
      id: this.props.match.params,
      editingMemoId: null
    };
    this.editMemo = this.editMemo.bind(this);

    this.DOMAIN = 'http://localhost:3001';
  }

  componentDidMount() {
    const token = "bearer " + localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: token
      }
    };
    const {id} = this.props.match.params; // 도대체 this.props.location.state.paper는 뭐고 this.props.match.params는 뭘까....
    axios.get(`${this.DOMAIN}/api/papers/${id}/memos.json`, config)
    .then((response) => {
      this.setState({
        memos: response.data,
        id: id
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  addMemo = () => { // 내가 만든 메소드에서 this를 쓰기 위해 화살표 함수를 씀 여기서는
    const {id} = this.props.match.params;
    const data = { memo: { content: '', from: this.state.currentUser.name, paper_id: id, user_id: this.state.currentUser.id }};
    const config = { 
      headers: { Authorization: "bearer " + localStorage.getItem('jwt')}};
    axios.post(`${this.DOMAIN}/api/papers/${id}/memos.json`, data, config)
    .then((response) => {
      const memos = update(
        this.state.memos, {
          $splice: [[0, 0, response.data]]
        }
      );
      this.setState({ 
        memos: memos,
        editingMemoId: response.data.id
      });
    })
    .catch((error) => console.log(error));
  }

  editMemo = (memoId) => {
    this.setState({ editingMemoId: memoId });
  }

  completeEditingMemo = (memoId, memoContent, memoFrom) => {
    const {id} = this.props.match.params;
    const data = {
      memo: {
        id: memoId,
        content: memoContent,
        from: memoFrom,
        paper_id: id,
        user_id: this.state.currentUser.id
      }
    };
    const config = { headers: {Authorization: "bearer " + localStorage.getItem('jwt')}};
    axios.patch(`${this.DOMAIN}/api/papers/${id}/memos/${memoId}.json`, data, config)
    .then((response) => {
      const memoIndex = this.state.memos.findIndex((memo) => memo.id === memoId);
      const memos = update( this.state.memos, {
        [memoIndex]: { $set: response.data } 
      });
      this.setState({ 
        memos: memos,
        editingMemoId: null });
    })
    .catch((error) => console.log(error));
  }

  changeColor = (attr) => {
    const randomColor = ColorList[Math.floor(Math.random() * ColorList.length)];
    const {id} = this.props.match.params;
    const data = {
      paper: {
        id: id,
        color: attr === 'color' ? randomColor : this.state.paper.color,
        background_color: attr === 'color' ? this.state.paper.background_color : randomColor
      }
    };
    const config = { headers: {Authorization: "bearer " + localStorage.getItem('jwt')}};
    axios.patch(`${this.DOMAIN}/api/papers/${id}.json`, data, config)
    .then((response) => {
      this.setState({ paper: response.data });
    })
    .catch((error) => console.log(error));
  }

  render() {
    const style = {
      color: this.state.paper.color,
      backgroundColor: this.state.paper.background_color,
      borderColor: this.state.paper.color
    };
    const btStyle = {
      color: this.state.paper.background_color,
      backgroundColor: this.state.paper.color
    }

    let createButton;
    let hasMyMemo = false;
    if (this.state.currentUser.id !== this.state.paper.user_id) {
      this.state.memos.some((memo) => {
        if (memo.user_id === this.state.currentUser.id) { // 이미 써준 적이 있으면
          hasMyMemo = true;
        }
      });
      hasMyMemo ? ( createButton = null ) : ( createButton = <button className="paper-bt" style={btStyle} onClick={this.addMemo}>써주기</button> );
    } else {
      createButton = (
        // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
        <div>
          <button onClick={() => this.changeColor('color')} name="color" id="color" className="paper-bt" style={btStyle}>선 색 바꾸기</button>
          <button onClick={() => this.changeColor('background_color')} name="background_color" id="background_color" className="paper-bt" style={btStyle}>배경 색 바꾸기</button>
        </div>
      );
    }

    return (
      <div className="paper" style={style}>
        <div className="title">
          <div className="user-name">{`${this.state.paper.user.name}의 롤링페이퍼`}</div> {/* 이름이 자음으로 끝나면 어색해서 어떡하지 이것까지 신경쓸 시간이 생기려나 */}
          {createButton}
        </div>
        {this.state.memos.map((memo) => {
          if (memo.id === this.state.editingMemoId) {
            return ( <MemoForm memo={memo} key={memo.id} currentUser={this.state.currentUser} completeEditingMemo={this.completeEditingMemo} btStyle={btStyle} textColor={this.state.paper.color} /> );
          } else {
            return ( <Memo memo={memo} key={memo.id} currentUser={this.state.currentUser} editMemo={this.editMemo} btStyle={btStyle} /> );
          }
        })}
      </div>
    );
  }
}

export default Paper;
