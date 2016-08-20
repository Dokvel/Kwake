import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import styles from './Button.scss';

export class Button extends Component {

  render() {
    let { disabled, color } = this.props;
    let btClasses = cn(styles.button, {
      [styles['button--' + color]]: color !== undefined,
      [styles['button--disabled']]: disabled
    })
    return (
      <div onClick={ !disabled ? this.props.onClick : null}
           className={btClasses}>
        <span className={cn(styles.icon, styles['icon--left'])}><i className={this.props.leftIcon}></i></span>
        <span className={styles.content}>{this.props.children}</span>
        <span className={cn(styles.icon, styles['icon--right'])}><i className={this.props.rightIcon}></i></span>
      </div>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string
};

Button.defaultProps = {
  color: undefined
};

Button.COLOR_BLUE = 'blue';
export default Button;
