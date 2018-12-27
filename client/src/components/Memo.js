import React, { Component } from 'react';
import './stylesheets/Memo.css';

class Memo extends Component {
  handleClick = () => {
    this.props.editMemo(this.props.memo.id); // 수정할 메모의 id를 부모 컴포넌트에게 넘겨줌
  }

  render() {
    const memo = this.props.memo;
    const currentUser = this.props.currentUser;

    let editButton;
    if (memo.user_id === currentUser.id) {
      editButton = <button onClick={this.handleClick} style={this.props.btStyle} className="memo-bt">수정하기</button>;
    } else {
      editButton = null;
    }

    return (
      <div className="memo">
        {editButton}<br />
        <div className="content">{memo.content}</div>
        <div className="from">{memo.from}</div>
      </div>
    );
  }
}

export default Memo;
