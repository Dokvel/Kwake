import React from 'react';

// Import Style
import styles from './Star.scss';

// Usage
// set 'checked="true"' for filled Star
// set 'checked="false"' for empty bordered star

function Star(props) {
  let fill = 'none', stroke = '#434448';
  if (props.checked === true) {
    fill = 'url(#lgrad)';
    stroke = 'none';
  }

  let stop_1_style = {
    stopColor: 'rgb(255,172,82)',
    stopOpacity: 1
  };

  let stop_2_style = {
    stopColor: 'rgb(255,60,87)',
    stopOpacity: 1
  };

  return (
    <svg className={styles.star} id="Star"viewBox="0 0 35 35">
    	<defs>
        <linearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" >
          <stop className={styles.stop_1} offset="0%" style={stop_1_style} />
          <stop className={styles.stop_2} offset="100%" style={stop_2_style} />
        </linearGradient>
      </defs>
    	<path fill={fill} stroke={stroke}  d="M18.67,2.53,22.84,11a1.31,1.31,0,0,0,1,.72L33.14,13a1.31,1.31,0,0,1,.73,2.23l-6.74,6.57A1.31,1.31,0,0,0,26.75,23l1.59,9.28a1.31,1.31,0,0,1-1.9,1.38l-8.33-4.38a1.31,1.31,0,0,0-1.22,0L8.56,33.66a1.31,1.31,0,0,1-1.9-1.38L8.25,23a1.31,1.31,0,0,0-.38-1.16L1.13,15.27A1.31,1.31,0,0,1,1.86,13l9.32-1.35a1.31,1.31,0,0,0,1-.72l4.17-8.44A1.31,1.31,0,0,1,18.67,2.53Z"/>
    </svg>
  );
}

export default Star;
