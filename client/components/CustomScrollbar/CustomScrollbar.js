/**
 * Created by alex on 07.09.16.
 */
import React, { createClass } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default createClass({
  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: `#393939`
    };
    return (
      <div style={{ ...style, ...thumbStyle }} {...props}/>
    );
  },

  renderTrackVertical({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: `transparent`,
      border: '1px solid #393939',
      opacity: '0.3'
    };
    return (
      <div style={{ ...style, ...thumbStyle }} {...props}/>
    );
  },

  render() {
    return (
      <Scrollbars
        {...this.props}/>
    );
  }
});
