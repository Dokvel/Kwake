import React, { Component } from 'react';

// Import Style
import styles from './DefaultLayout.scss';

import Header from '../Header/Header';

export default class DefaultLayout extends Component {

  render() {
    return (
      <div>
        <div className={styles.lightBox}>
          <div className={styles.light}></div>
        </div>
        <Header />
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
