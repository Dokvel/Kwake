import React, { Component } from 'react';

// Import Styles
import styles from './Loader.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}>
          <div className={styles.bounce1}></div>
          <div className={styles.bounce2}></div>
          <div className={styles.bounce3}></div>
        </div>
      </div>
    );
  }
}
