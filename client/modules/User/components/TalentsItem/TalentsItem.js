/**
 * Created by alex on 18.08.16.
 */

import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import styles from './TalentsItem.scss';

export class TalentsItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div onClick={this.props.onSelect}
           className={cn(styles['talent-box'], { [styles['talent-box--selected']]: this.props.selected })}>
        <div className={styles.icon}>
          <i className="bi_com-group-bubble-a"></i>
        </div>
        <div className={styles.title}>{this.props.name}</div>
      </div>
    );
  }
}

TalentsItem.propTypes = {};

export default TalentsItem;
