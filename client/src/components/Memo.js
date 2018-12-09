import React from 'react';
import './Memo.css';

const Memo = ({memo}) => {
  return (
    <div>
      {memo.content}, {memo.from}
    </div>
  );
}

export default Memo;
