import React from 'react';
import './Paper.css';

const Paper = ({paper}) => { // 중괄호로 묶으면 안 되네? 이유 찾아보기
  const style = {
    color: paper.color, 
    backgroundColor: paper.background_color,
    borderColor: paper.color
  };

  return (
    <div className="paper" key={paper.id}>
      <div className="ellipse" style={style}></div>
      <div className="side" style={style}>
        <div className="flex-container">
          <h4>{paper.color}</h4>
          <p>{paper.background_color}</p>
        </div>
      </div>
      <div className="ellipse right" style={style}></div>
    </div>
  );
}

export default Paper;
