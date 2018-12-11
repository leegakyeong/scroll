import React from 'react';
import './stylesheets/Memo.css';

const Memo = ({memo}) => {
  return (
    <div className="memo">
      <div className="content">{memo.content}</div>
      <div className="from">{memo.from}</div>
    </div>
  );
}

export default Memo;
