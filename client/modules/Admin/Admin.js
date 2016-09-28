import React, { Component } from 'react';

require('../../../stylesheets/static/adminLayout.scss');

export class AdminApp extends Component {
  render() {
    return (
      <div className="adminMain">
        {this.props.children}
      </div>
    )
  }
}

export default AdminApp;
