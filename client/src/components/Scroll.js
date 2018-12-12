import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/Scroll.css';

const Scroll = ({paper, user}) => {
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
          {user.id === paper.user_id ? (
            <h4>내 롤링페이퍼</h4> ) : (
            <h4>{paper.color}</h4> )
          }
          <Link to={{pathname: `${paper.id}`, state: {paper: paper}}} style={{...style, textDecoration: 'none'}}>쓰러 가기?</Link>
        </div>
      </div>
      <div className="ellipse right" style={style}></div>
    </div>
  );
}

export default Scroll;
