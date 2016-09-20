import React, { Component } from 'react';

// Import Functions
import { problemWithFilters } from '../../util/generalHelpers';

// Import Styles
import styles from './Loader.scss';

export default class Loader extends Component {
  renderAppleLoader() {
    return (
      <div className={styles['apple-wrapper']}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  renderLoader() {
    let wrapperStyle = {
      filter: "url('#filter')"
    };
    return (
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        { problemWithFilters() ? this.renderAppleLoader() : this.renderLoader() }
        <svg>
          <defs>
            <filter id="filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="filter" />
              <feComposite in="SourceGraphic" in2="filter" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}
