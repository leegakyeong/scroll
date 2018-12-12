import React, { Component } from 'react';
import axios from 'axios';
import Memo from './Memo';
import './stylesheets/Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.location.state.currentUser, // 근데 currentUser랑 paper는 상태가 변하지도 않는데 여기다 넣는 게 맞는 건지 모르겠다
      paper: this.props.location.state.paper, // Link 컴포넌트를 눌렀을 때 받아옴
      memos: []
    };
  }

  componentDidMount () {
    const token = "bearer " + localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: token
      }
    };
    const {id} = this.props.match.params; // 도대체 this.props.location.state.paper는 뭐고 this.props.match.params는 뭘까....
    axios.get(`http://localhost:3001/api/papers/${id}/memos.json`, config)
    .then((response) => {
      console.log(response);
      this.setState({
        memos: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render () {
    const style = { // 이거 뭔가 안 좋은 방법 같은데..뭐가 좋은 방법인지 잘 모르겠음
      color: this.state.paper.color,
      backgroundColor: this.state.paper.background_color,
      borderColor: this.state.paper.color
    };

    return (
      <div className="paper" style={style}>
        <div className="title">
          <div className="user-name">~~~의 롤링페이퍼</div> {/* 헐 롤링페이퍼 주인 이름은 또 어떻게 가져오지 */}
          {this.state.currentUser.id !== this.state.paper.user_id ? 
            ( <button className="write-bt">써주기</button> ) : ( <span>hello</span> )
          }
        </div>
        {this.state.memos.map((memo) => {
          return ( <Memo memo={memo} key={memo.id} /> );
        })}
      </div>
    );
  }
}

export default Paper;
