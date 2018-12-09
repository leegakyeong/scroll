import React, { Component } from 'react';
import axios from 'axios';
import Scroll from './Scroll';
import './ScrollsContainer.css';

class ScrollsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/papers.json')
    .then((response) => {
      console.log(response);
      this.setState({
        papers: response.data
      });
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="scrolls-container">
        {this.state.papers.map((paper) => {
          return ( <Scroll paper={paper} key={paper.id} /> );
        })}
      </div>
    );
  }
}

export default ScrollsContainer;
