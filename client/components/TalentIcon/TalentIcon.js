import React, { Component }from 'react';
import cn from 'classnames';
import Tooltip from '../Tooltip/Tooltip';

import styles from './TalentIcon.scss';

export default class TalentIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.setState({ selected: 'selected' });
    } else if (this.props.selected && !nextProps.selected) {
      this.setState({ selected: 'unselected' });
    }
  }

  render() {
    let iconWrapper = cn(styles.icon, {
      [styles.circled]: this.props.circled && !this.props.selected,
      [styles['icon--enabled']]: !!this.props.onClick
    });

    let jumpingContainer = cn({
      [styles.jumpingContainer]: this.props.selected
    });

    let waveT = cn ({
      [styles.wave]: this.state.selected === 'selected'
    });
    let waveF = cn ({
      [styles.wave]: this.state.selected === 'unselected'
    });

    return (
      <Tooltip id={this.props.talentKey} tip={this.props.tip}>
        <div className={styles.wrapper}>
          <div className={jumpingContainer}>
            <div className={iconWrapper} onClick={this.props.onClick}>
              <i className={this.props.name || "bi_com-group-bubble-a"} aria-hidden="true"/>
            </div>
            <div className={styles.liquidContainer}>
              <div className={styles.mainBall}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
            </div>
          </div>
          <div className={waveT}></div>
          <div className={waveF}></div>
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
}
