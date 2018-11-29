import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PapersContainer from './components/PapersContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">paper list</h1>
        </header>
        <PapersContainer />
      </div>
    );
  }
}

export default App;
