import React from 'react';
import './stylesheets/Login.css';

const Login = (props) => {
  return (
    <div>
      <h1>Log in</h1>
      <form>
        <label>Name</label>
        <input name="name" id="name" />
        <label>Email</label>
        <input name="email" id="email" />
        <label>Password</label>
        <input name="password" id="password" />
      </form>
      <button onClick={props.login}>login</button>
    </div>
  );
}

export default Login;
