import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Memo from './Memo';
import MemoForm from './MemoForm';
import './stylesheets/Paper.css';

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
    console.log(memoContent, memoFrom);
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
    .then((response) => { console.log(response);
      const memoIndex = this.state.memos.findIndex((memo) => memo.id === memoId);
      const memos = update( this.state.memos, {
        [memoIndex]: { $set: response.data } 
      });
      this.setState({ 
        memos: memos,
        editingMemoId: null }); console.log(this.state.memos);
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
      hasMyMemo ? ( createButton = null ) : ( createButton = <button className="write-bt" style={btStyle} onClick={this.addMemo}>써주기</button> );
    } else {
      createButton = null;
    }

    return (
      <div className="paper" style={style}>
        <div className="title">
          <div className="user-name">~~~의 롤링페이퍼</div> {/* 헐 롤링페이퍼 주인 이름은 또 어떻게 가져오지 */}
          {createButton}
        </div>
        {this.state.memos.map((memo) => {
          if (memo.id === this.state.editingMemoId) {
            return ( <MemoForm memo={memo} key={memo.id} currentUser={this.state.currentUser} completeEditingMemo={this.completeEditingMemo} /> );
          } else {
            return ( <Memo memo={memo} key={memo.id} currentUser={this.state.currentUser} editMemo={this.editMemo} /> );
          }
        })}
      </div>
    );
  }
}

export default Paper;
