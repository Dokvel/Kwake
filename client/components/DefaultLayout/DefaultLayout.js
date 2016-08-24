import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// Import Style
import styles from './DefaultLayout.css';

import Header from '../Header/Header';

import { isLoggedIn } from '../../util/apiCaller';

export default class DefaultLayout extends Component {

  componentWillMount() {
    if (!isLoggedIn()) {
      browserHistory && browserHistory.push('/');
    }
  }

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
