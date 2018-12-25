import React from 'react';
import './stylesheets/Login.css';

const Login = (props) => {
  return (
    <div class="loginBox">
      <img src="/favicon.ico"></img>
      <h1>SCROLL</h1>
      <form>
        <div class="Email">
          {/* <label>Email</label> */}
          <input name="email" id="email" placeholder="EMAIL"/>
        </div>
        <div class="Password">
          {/* <label>Password</label> */}
          <input name="password" id="password" placeholder="PASSWORD"/>
        </div>
      </form>
      <button onClick={props.login}>LOG IN</button>
    </div>
  );
}

export default Login;
