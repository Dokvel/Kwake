import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import { problemWithFilters } from '../../../../util/generalHelpers';

import RangeSlider from '../../../../components/RangeSlider/RangeSlider';
import Tooltip from '../../../../components/Tooltip/Tooltip';

import styles from './DiscItem.scss';

export class DiscItem extends Component {
  renderAppleControls() {
    return (
      <div className={cn(styles['apple-controls'], {
        [styles['apple-controls-lower']]: this.props.value === 0,
        [styles['apple-controls-middle']]: this.props.value === undefined,
        [styles['apple-controls-higher']]: this.props.value === 1
      })}>
        <Tooltip disabled={this.props.unavailableValue !== 0} tip={this.props.tipHigher}>
          <div className={cn(styles['manage-button-lower'], { [styles['manage-button-lower--selected']]: this.props.value === 0 })} onClick={ () => this.props.onChangeValue(0) }>
            Lower
          </div>
        </Tooltip>
        <Tooltip disabled={this.props.unavailableValue !== 1} tip={this.props.tipLower}>
          <div className={cn(styles['manage-button-higher'], { [styles['manage-button-higher--selected']]: this.props.value === 0 })} onClick={ () => this.props.onChangeValue(1) }>
            Higher
          </div>
        </Tooltip>
      </div>
    );
  }

  renderControls() {
    return (
      <div className={styles.controls}>
        <Tooltip disabled={this.props.unavailableValue !== 0} tip={this.props.tipHigher}>
          <div
            className={cn(styles['manage-button-minus'], { [styles['manage-button-minus--selected']]: this.props.value === 0 })}
            onClick={ () => this.props.onChangeValue(0) }>
            <i className="icon-44-vote-left"/>
          </div>
        </Tooltip>
        <div className={styles.sliderContainer}>
          <RangeSlider value={this.props.value}/>
        </div>
        <Tooltip disabled={this.props.unavailableValue !== 1} tip={this.props.tipLower}>
          <div
            className={cn(styles['manage-button-plus'], { [styles['manage-button-plus--selected']]: this.props.value === 1 })}
            onClick={ () => this.props.onChangeValue(1) }>
            <i className="icon-43-vote-right"/>
          </div>
        </Tooltip>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.description}>{this.props.description}</div>
        { problemWithFilters() ? this.renderAppleControls() : this.renderControls() }
      </div>
    );
  }
}

DiscItem.propTypes = {
  tipHigher: PropTypes.string,
  tipLower: PropTypes.string
};

DiscItem.defaultProps = {
  tipHigher: 'Select at least one that you are higher at',
  tipLower: 'Select at least one that you are lower at'
};

export default DiscItem;
