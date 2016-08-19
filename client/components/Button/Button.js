import React, { Component } from 'react';
import cn from 'classnames';

import styles from './Button.scss';

export class Button extends Component {

  render() {
    let { disabled } = this.props;
    return (
      <div onClick={ !disabled ? this.props.onClick : null}
           className={cn(styles.button, { [styles['button--disabled']]: disabled })}>
        <span className={cn(styles.icon, styles['icon--left'])}><i className={this.props.leftIcon}></i></span>
        <span className={styles.content}>{this.props.children}</span>
        <span className={cn(styles.icon, styles['icon--right'])}><i className={this.props.rightIcon}></i></span>
      </div>
    );
  }
}

export default Button;
