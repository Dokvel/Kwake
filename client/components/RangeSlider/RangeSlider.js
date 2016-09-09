import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import cn from 'classnames';

import styles from './RangeSlider.scss';

class RangeSlider extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ReactSlider className={styles.progress} min={1} max={3} defaultValue={2}>
          <div className={styles.handle}></div>
        </ReactSlider>

        <svg>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}

export default RangeSlider;
