import React, { Component } from 'react';
import axios from 'axios';

class Header extends Component {
  logout () {
    console.log('logout');
    localStorage.removeItem('jwt');
    const request = null;
    axios.post('http://localhost:3001/api/user_token', request)
    .then((response) => {
      console.log(response.data.jwt, '\n', response);
      localStorage.setItem('jwt', response.data.jwt);
    })
    .catch((error) => console.log(error));
  }

  render () {
    return (
      <header>
        hello
        <button onClick={this.logout}>logout</button>
      </header>
    );
  }
}

export default Header;
