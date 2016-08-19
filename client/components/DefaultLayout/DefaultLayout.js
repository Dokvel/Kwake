import React, { Component } from 'react';

// Import Style
import styles from './DefaultLayout.css';

import Header from '../Header/Header';

export default class DefaultLayout extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
