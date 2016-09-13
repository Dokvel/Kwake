import React from 'react';

// Import Styles
import styles from './Loader.scss';

export default function Loader(props) {
  let wrapperStyle = {
    filter: "url('#filter')"
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
      </div>

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
