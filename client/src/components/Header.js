import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <header>
        hello
        <button onClick={this.props.logout.bind(this)}>logout</button>
      </header>
    );
  }
}

export default Header;
