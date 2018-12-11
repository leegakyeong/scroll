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
    // https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
    // https://wpsn-axios-example.glitch.me/
    let token = "bearer " + localStorage.getItem('jwt');
    let config = {
      headers: {
        Authorization: token
      }
    };
    console.log(token);
    axios.get('http://localhost:3001/api/papers.json', config)
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
