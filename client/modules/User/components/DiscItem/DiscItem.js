import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import Tooltip from '../../../../components/Tooltip/Tooltip';

import RangeSlider from '../../../../components/RangeSlider/RangeSlider';

import styles from './DiscItem.scss';

export class DiscItem extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.description}>{this.props.description}</div>
        <div className={styles.controls}>
          <Tooltip disabled={this.props.unavailableValue !== 0} tip="Select at least one that you are higher at">
            <div
              className={cn(styles['manage-button-minus'], { [styles['manage-button-minus--selected']]: this.props.value === 0 })}
              onClick={ () => this.props.onChangeValue(0) }>
            </div>
          </Tooltip>
          <div className={styles.sliderContainer}>
            <RangeSlider value={this.props.value}/>
          </div>
          <Tooltip disabled={this.props.unavailableValue !== 1} tip="Select at least one that you are lower at">
            <div
              className={cn(styles['manage-button-plus'], { [styles['manage-button-plus--selected']]: this.props.value === 1 })}
              onClick={ () => this.props.onChangeValue(1) }>
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

DiscItem.propTypes = {};

export default DiscItem;
