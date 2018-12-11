import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollsContainer from './components/ScrollsContainer';
import Paper from './components/Paper';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';

class App extends Component {
  render() {
    if (localStorage.getItem('jwt')) { // 앗 localStorage.jwt도 되네
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
