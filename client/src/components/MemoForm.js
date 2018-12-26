import React, { Component } from 'react';

class MemoForm extends Component {
  handleClick = () => {
    this.props.completeEditingMemo( // 여기서 바로 http 요청 안 보내는 이유 - Paper 컴포넌트 다시 렌더되라고
      this.props.memo.id,
      document.getElementById('content').value,
      document.getElementById('from').value
    );
  }

  render() {
    return (
      <div>
        <form>
          <textarea name="content" id="content" defaultValue={this.props.memo.content}></textarea>
          <input name="from" id="from" defaultValue={this.props.memo.from} />
        </form>
        <button onClick={this.handleClick} style={this.props.btStyle} className="memo-bt">완료</button>
      </div>
    );
  }
}

export default MemoForm;
