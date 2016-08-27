import React, { Component } from 'react';
// Base stylesheet
let styles = require('./layout.scss');
require('../vendor/fonts/Budicon/css/budicon.css');

export class Base extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }
}

export default Base;
