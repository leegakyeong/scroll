import React, { Component } from 'react';
import './stylesheets/Login.css';

class Login extends Component {
  render () {
    return (
      <div>
        <h1>Log in</h1>
        <form>
          <label>Email</label>
          <input name="email" id="email" />
          <label>Password</label>
          <input name="password" id="password" />
        </form>
        <button onClick={this.props.login.bind(this)}>login</button>
      </div>
    );
  }
}

export default Login;
