import React, { Component } from 'react';
import axios from 'axios';
import Scroll from './Scroll';
import './stylesheets/ScrollsContainer.css';

class ScrollsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papers: []
    };

    this.DOMAIN = 'http://localhost:3001';
  }

  componentDidMount() {
    // https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
    // https://wpsn-axios-example.glitch.me/
    const token = "bearer " + localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: token
      }
    };
    axios.get(`${this.DOMAIN}/api/papers.json`, config)
    .then((response) => { console.log(response.data);
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
          return ( <Scroll paper={paper} key={paper.id} currentUser={this.props.currentUser} /> );
        })}
      </div>
    );
  }
}

export default ScrollsContainer;
