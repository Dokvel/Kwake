import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Sandbox.scss';

// Import Components
import TalentIcon from '../../components/TalentIcon-temp/TalentIcon';

export default class Sandbox extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.workspace}>

          <div className={styles.liquidContainer}>
            <div className={styles.mainBall}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
          </div>

          <svg>
            <defs>
              <filter id="filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 28 -10" result="filter" />
                <feComposite in="SourceGraphic" in2="filter" operator="atop" />
              </filter>
            </defs>
          </svg>

        </div>
      </div>
    );
  }
}
