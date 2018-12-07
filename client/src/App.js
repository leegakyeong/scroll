import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import PapersContainer from './components/PapersContainer';
import MyPaper from './components/MyPaper';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={PapersContainer} />
          <Route path="/hello" component={MyPaper} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
