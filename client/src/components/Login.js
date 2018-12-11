import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor (props) {
    super(props);
  }

  login () {
    // const name = document.getElementsByName('name')[0].value; // 배열을 리턴함
    // const password = document.getElementsByName('password')[0].value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const request = {
      auth: {
        email: email,
        password: password
      }
    };
    axios.post('http://localhost:3001/api/user_token', request)
    .then((response) => {
      console.log(response.data.jwt, '\n', response);
      localStorage.setItem('jwt', response.data.jwt);
    })
    .catch((error) => console.log(error));
  }

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
        <button onClick={this.login}>login</button>
      </div>
    );
  }
}

export default Login;
