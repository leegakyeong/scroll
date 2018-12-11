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
    this.login = this.login.bind(this); // 아직 bind의 의미를 잘 이해 못 함..이거 하니까 되긴 되는데
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: localStorage.jwt ? true : false
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
      console.log(response.data.jwt, '\n', response);
      localStorage.setItem('jwt', response.data.jwt);
      this.setState({isLoggedIn: true});
      /** promise인가 그것 때문인지 위 구문을 .then() 밖에 두면 .then() 후에 처리되는 게 아니라
       *  비동기적으로? 먼저 처리돼서 아직 인증이 안 되었다고 오류가 뜸!!
       */
    })
    .catch((error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setState({isLoggedIn: false});
  }

  render() {
    if (this.state.isLoggedIn) {
      console.log(this.state.isLoggedIn);
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
      console.log(this.state.isLoggedIn);
      return <Login login={this.login} />;
    }
  }
}

export default App;
