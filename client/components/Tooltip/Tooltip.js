import React, { Component, PropTypes }from 'react';
import { isTouchDevice } from '../../util/generalHelpers';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { showFlashMessage } from '../../modules/App/AppActions';

class Tooltip extends Component {

  setFlashMessage = (e)=> {
    this.props.dispatch(showFlashMessage(this.props.title, this.props.tip));
  };

  renderTouchable = (children) => {
    return (
      <div onClick={this.setFlashMessage}>
        {children}
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

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Tooltip);
