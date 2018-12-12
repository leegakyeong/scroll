import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/Header.css';

const Header = (props) => {
  return (
    <header>
      <Link to="/">Home</Link>
      <div>snulion2018</div>
      <button onClick={props.logout}>logout</button>
    </header>
  );
}

export default Header;
