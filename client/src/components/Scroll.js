import React from 'react';
import { Link } from 'react-router-dom';
import './Scroll.css';

const Scroll = ({paper}) => { // 중괄호로 묶으면 안 되네? 이유 찾아보기
  const style = {
    color: paper.color, 
    backgroundColor: paper.background_color,
    borderColor: paper.color
  };

  return (
    <div className="scroll" key={paper.id}>
      <div className="ellipse" style={style}></div>
      <div className="side" style={style}>
        <div className="flex-container">
          <h4>{paper.color}</h4>
          <p>{paper.background_color}</p>
          <Link to={{pathname: `${paper.id}`, state: {params: paper.id}}}>go to paper</Link>
        </div>
      </div>
      <div className="ellipse right" style={style}></div>
    </div>
  );
}

export default Scroll;
