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
          <input name="name" id="name" placeholder="NAME" onKeyUp={() => handleSubmit()}/>
        </div>
        <div className="Email">
          {/* <label>Email</label> */}
          <input name="email" id="email" placeholder="EMAIL" onKeyUp={() => handleSubmit()}/>
        </div>
        <div className="Password">
          {/* <label>Password</label> */}
          <input name="password" id="password" type="password" placeholder="PASSWORD" onKeyUp={() => handleSubmit()}/>
        </div>
      </form>
      <button onClick={props.login}>LOG IN</button>
    </div>
  );

  function handleSubmit() {
    if (window.event.keyCode === 13) {
      props.login();
    }
  }
}

export default Login;
