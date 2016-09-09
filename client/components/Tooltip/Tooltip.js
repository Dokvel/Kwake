import React, { Component, PropTypes }from 'react';
import { isTouchDevice } from '../../util/generalHelpers';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';

import styles from './Tooltip.scss';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { showMobile: false };
  };

  showMobileTooltip = (event) => {
    this.setState({ showMobile: true });
    setTimeout(() => {
      this.setState({ showMobile: false });
    }, 2000);
  };

  renderTouchable = (children) => {
    return (
      <div onClick={this.showMobileTooltip}>
        {children}
        <div className={cn(styles.overlay, { [styles['overlay--visible']]: this.state.showMobile })}>
          <span className={styles['mobile-title']}>{this.props.title}</span>
          <span className={styles['mobile-message']}>{this.props.tip}</span>
        </div>
      </div>
    )
  };

  renderUntouchable = (children)=> {
    return (
      <div data-for={this.props.id} data-tip={this.props.tip}>
        {children}
        <ReactTooltip id={this.props.id} class='kwake-tooltip' effect='solid'/>
      </div>
    )
  };

  render() {
    if (!this.props.disabled) {
      if (isTouchDevice()) {
        return this.renderTouchable(this.props.children);
      } else {
        return this.renderUntouchable(this.props.children);
      }
    } else {
      return (<div>{this.props.children}</div>)
    }
  }
}

Tooltip.propTypes = {
  disabled: PropTypes.bool
};

Tooltip.defaultProps = {
  disabled: false
};

export default Tooltip;
