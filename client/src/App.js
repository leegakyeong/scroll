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
    this.state = {
      isLoggedIn: localStorage.jwt ? true : false,
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const config = { 
      headers: { 
        Authorization: "bearer " + localStorage.getItem('jwt') 
      }
    };
    axios.get('http://localhost:3001/api/user', config)
    .then((response) => {
      console.log(response);
      this.setState({ user: response.data });
    })
    .catch((error) => console.log(error));
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
      this.setState({ isLoggedIn: true });
      this.componentDidMount(); // 이게 좋은 방법인지는 잘 모르겠지만..!
    })
    .catch((error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setState({
      isLoggedIn: false,
      user: null
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <Route exact path="/" render={() => <ScrollsContainer user={this.state.user}/>} /> {/* 토큰을 App 컴포넌트에서 받아 오는 거랑 localStorage에서  받아오는것중에 뭐가 더 좋을까??!! */}
            {/* <Route path="/:id" render={() => <Paper user={this.state.user}/>} /> */}
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
