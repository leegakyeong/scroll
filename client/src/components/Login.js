import React from 'react';
import './stylesheets/Login.css';

const Login = (props) => {
  return (
    <div className="loginBox">
      <img src="/scroll_logo.png" alt="scroll logo"></img>
      <h1>SCROLL</h1>
      <form>
        <div className="Name">
          {/* <label>Email</label> */}
          <input name="name" id="name" placeholder="NAME"/>
        </div>
        <div className="Email">
          {/* <label>Email</label> */}
          <input name="email" id="email" placeholder="EMAIL"/>
        </div>
        <div className="Password">
          {/* <label>Password</label> */}
          <input name="password" id="password" placeholder="PASSWORD"/>
        </div>
      </form>
      <button onClick={props.login}>LOG IN</button>
    </div>
  );
}

export default Login;
