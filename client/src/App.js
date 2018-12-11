import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollsContainer from './components/ScrollsContainer';
import Paper from './components/Paper';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoggedIn: localStorage.jwt ? true : false
  //   };
  // }

  // handleClick() { // 이렇게 짜는 거 별로 안 좋은 것 같지만 일단..
  //   this.setState({
  //     isLoggedIn: true ? false : true
  //   });
  //   console.log(1111111111111111);
  // }

  render() {
    if (localStorage.jwt) { // if (this.state.isLoggedIn) {
      return (
        <BrowserRouter>
          <div className="App">
            <Header />
            <Route exact path="/" component={ScrollsContainer} />
            <Route path="/:id" component={Paper} />
          </div>
        </BrowserRouter>
      );
    } else {
      return <Login />;
    }
  }
}

export default App;
