import React, { Component } from 'react';
import cn from 'classnames';

import styles from './RangeSlider.scss';

class RangeSlider extends Component {
  render() {
    let handleClasses = cn(styles.handle, {
      [styles['handle-left']]: this.props.value === 0,
      [styles['handle-center']]: this.props.value === undefined,
      [styles['handle-right']]: this.props.value === 1,
    });
    let lightClasses = cn(styles.light, {
      [styles['light-left']]: this.props.value === 0,
      [styles['light-center']]: this.props.value === undefined,
      [styles['light-right']]: this.props.value === 1,
    });
    return (
      <div className={styles.container}>
      <div className={styles.light}></div>
        <div className={styles.progress}>
          <div className={handleClasses}></div>
        </div>

        <svg>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}

export default RangeSlider;
