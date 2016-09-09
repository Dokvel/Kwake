import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import RangeSlider from '../../../../components/RangeSlider/RangeSlider';

import styles from './DiscItem.scss';

export class DiscItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.description}>{this.props.description}</div>
        <div className={styles.controls}>
          <div
            className={cn(styles['manage-button-minus'], { [styles['manage-button-minus--selected']]: this.props.value === 0 })}
            onClick={ () => this.props.onChangeValue(0) }>
          </div>
          <div className={styles.sliderContainer}>
            <RangeSlider value={this.props.value}/>
          </div>
          <div
            className={cn(styles['manage-button-plus'], { [styles['manage-button-plus--selected']]: this.props.value === 1 })}
            onClick={ () => this.props.onChangeValue(1) }>
          </div>
        </div>
      </div>
    );
  }
}

DiscItem.propTypes = {};

export default DiscItem;
