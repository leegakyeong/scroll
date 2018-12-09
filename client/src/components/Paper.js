import React, { Component } from 'react';
import axios from 'axios';

class Paper extends Component {
  componentDidMount () {
    const {id} = this.props.match.params; // 왜 이름이 id가 아니면 안 되지..?!
    axios.get(`http://localhost:3001/api/v1/papers/${id}.json`)
    .then((response) => {
      console.log(response);
      //
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render () {
    return (
      <div>
        hello
      </div>
    );
  }
}

export default Paper;
