import React, { Component } from 'react';
import axios from 'axios';
import Paper from './Paper';

class PapersContainer extends Component {
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
      <div className="Papers-container">
        {this.state.papers.map((paper) => {
          return ( <Paper paper={paper} key={paper.id} /> );
        })}
      </div>
    );
  }
}

export default PapersContainer;
