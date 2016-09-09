import React, { Component }from 'react';
import cn from 'classnames';
import Tooltip from '../Tooltip/Tooltip';

import styles from './TalentIcon.scss';

function TalentIcon(props) {
  let iconWrapper = cn(styles.icon, {
    [styles.circled]: props.circled && !props.selected,
    [styles['icon--enabled']]: !!props.onClick
  });

  let jumpingContainer = cn({
    [styles.jumpingContainer]: props.selected
  });

  let wave = cn ({
    [styles.wave]: props.selected
  });

  return (
    <Tooltip id={props.talentKey} tip={props.tip}>
      <div className={jumpingContainer}>
        <div className={wave}></div>
        <div className={iconWrapper} onClick={props.onClick}>
          <i className={props.name || "bi_com-group-bubble-a"} aria-hidden="true"/>
        </div>
        <div className={styles.liquidContainer}>
          <div className={styles.mainBall}></div>
          <div className={styles.ball}></div>
          <div className={styles.ball}></div>
          <div className={styles.ball}></div>
          <div className={styles.ball}></div>
          <div className={styles.ball}></div>
        </div>
      </div>

      <svg id={styles.svgFilters}>
        <defs>
          <filter id="filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -10" result="filter" />
            <feComposite in="SourceGraphic" in2="filter" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Tooltip>
  )
}

export default TalentIcon;
