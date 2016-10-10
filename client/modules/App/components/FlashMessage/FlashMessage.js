import React, { Component, PropTypes }from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

import styles from './FlashMessage.scss';
import { hideFlashMessage } from '../../AppActions';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.timerID = undefined;
    this.animTimer = undefined;
    this.state = { willHide: false }
  };

  componentDidMount() {
    this.timerID = this.initTimer();
  }

  componentWillReceiveProps(newProps) {
    clearTimeout(this.animTimer);
    clearTimeout(this.timerID);
    this.timerID = this.initTimer();
  }

  initTimer() {
    return setTimeout(() => {
      this.setState({ willHide: true });
      this.animTimer = setTimeout(() => {
        this.props.dispatch(hideFlashMessage());
      }, 150);
    }, 7000);
  }

  render() {
    return (
      <div className={cn(styles.overlay, { [styles.hide]: this.state.willHide })}>
        { this.props.title && <div className={styles['mobile-title']}>{this.props.title}</div>}
        <div className={styles['mobile-message']}>{this.props.message}</div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(FlashMessage);
