import React, { Component } from 'react';
import axios from 'axios';
import Memo from './Memo';
import './Paper.css';

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paper: this.props.location.state.paper, // Link 컴포넌트를 눌렀을 때 받아옴
      memos: []
    };
  }

  componentDidMount () {
    const {id} = this.props.match.params; // 도대체 this.props.location.state.paper는 뭐고 this.props.match.params는 뭘까....
    axios.get(`http://localhost:3001/api/papers/${id}/memos.json`)
    .then((response) => {
      console.log(response);
      this.setState({
        memos: response.data
      }); console.log(id, this.state.paper);
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
        <div className="title">~~~의 롤링페이퍼</div>
        {this.state.memos.map((memo) => {
          return ( <Memo memo={memo} key={memo.id} /> );
        })}
      </div>
    );
  }
}

export default Paper;
