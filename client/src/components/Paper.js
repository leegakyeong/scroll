import React from 'react';

const Paper = ({paper}) => { // 중괄호로 묶으면 안 되네? 이유 찾아보기
  const style = {
    color: paper.color, 
    backgroundColor: paper.background_color
  };

  return (
    <div style={style} key={paper.id}>
      <h4>{paper.color}</h4>
      <p>{paper.background_color}</p>
    </div>
  );
}

export default Paper;
