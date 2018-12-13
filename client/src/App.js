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
      currentUser: null
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
    axios.get('http://localhost:3001/api/get_current_user', config)
    .then((response) => {
      this.setState({ currentUser: response.data });
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
      currentUser: null
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <Route exact path="/" render={() => <ScrollsContainer currentUser={this.state.currentUser}/>} /> {/* 토큰을 App 컴포넌트에서 받아 오는 거랑 localStorage에서  받아오는것중에 뭐가 더 좋을까??!! */}
            {/* <Route path="/:id" render={() => <Paper currentUser={this.state.currentUser}/>} /> */}
            <Route path="/:id" component={Paper} /> {/* 왜 ScrollsContainer처럼 여기다 props를 전달하면 안 되고 Link로 전달해야 할까???? */}
          </div>
        </BrowserRouter>
      );
    } else {
      return <Login login={this.login} />;
    }
  }
}

export default App;
