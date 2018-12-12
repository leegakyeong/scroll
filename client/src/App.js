import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import ScrollsContainer from './components/ScrollsContainer';
import Paper from './components/Paper';
import Login from './components/Login';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: localStorage.jwt ? true : false,
      user: null // 현재 로그인한 유저
    };
  }
  
  login() {
    const request = {
      auth: {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      }
    };
    axios.post('http://localhost:3001/api/user_token', request)
    .then((response) => {
      localStorage.setItem('jwt', response.data.jwt);
      // this.setState({isLoggedIn: true});
      const token = "bearer " + localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: token
        }
      };
      axios.get('http://localhost:3001/api/user', config)
      .then((response) => {
        console.log(response);
        this.setState({
          isLoggedIn: true,
          user: response.data
        });
      })
      .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setState({isLoggedIn: false});
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <Route exact path="/" component={ScrollsContainer} />
            <Route path="/:id" component={Paper} />
          </div>
        </BrowserRouter>
      );
    } else {
      return <Login login={this.login} />;
    }
  }
}

export default App;
