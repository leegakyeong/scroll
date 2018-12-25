import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/Scroll.css';

const Scroll = ({paper, currentUser}) => {
  const style = {
    color: paper.color, 
    backgroundColor: paper.background_color,
    borderColor: paper.color
  };

  let scrollTitle, scrollLink;
  if (currentUser.id === paper.user_id) {
    scrollTitle = '내 롤링페이퍼';
    scrollLink = '읽으러 가기';
  } else {
    scrollTitle = paper.color;
    scrollLink = '쓰러 가기';
  }

  return (
    <div className="scroll" key={paper.id}>
      <div className="ellipse" style={style}></div>
      <div className="side" style={style}>
        <div className="flex-container">
          {scrollTitle}
          <Link to={{pathname: `${paper.id}`, state: {paper: paper, currentUser: currentUser}}} style={{...style, textDecoration: 'none'}}>{scrollLink}</Link>
        </div>
      </div>
      <div className="ellipse right" style={style}></div>
    </div>
  );
}

export default Scroll;
