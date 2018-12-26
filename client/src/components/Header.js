import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/Header.css';

const Header = (props) => {
  return (
    <header>
      <Link to="/"><img id="logo" src="/scroll_logo.png" alt="home" width="32" height="32"></img></Link>
      <div>SNULION 2018</div>
      <button onClick={props.logout}>LOGOUT</button>
    </header>
  );
}

export default Header;
