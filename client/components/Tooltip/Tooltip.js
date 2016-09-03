import React, { Component }from 'react';
import { findDOMNode } from 'react-dom';
import { isTouchDevice } from '../../util/generalHelpers';
import Tappable from 'react-tappable';

import ReactTooltip from 'react-tooltip';

class Tooltip extends Component {
  onLongPress = (event) => {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
    ReactTooltip.show(findDOMNode(this.refs[this.props.id]));
  };

  renderTouchable = (children)=> {
    return (
      <Tappable onPress={this.onLongPress}>
        {children}
        <snap ref={this.props.id} data-tip={this.props.tip}/>
        <ReactTooltip class='kwake-tooltip' effect='solid' globalEventOff="click" eventOff="click"/>
      </Tappable>
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
    return isTouchDevice() ? this.renderTouchable(this.props.children) : this.renderUntouchable(this.props.children);
  }
}

export default Tooltip;
