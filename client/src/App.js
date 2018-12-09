import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ScrollsContainer from './components/ScrollsContainer';
import Paper from './components/Paper';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ScrollsContainer} />
          <Route path="/:id" component={Paper} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
