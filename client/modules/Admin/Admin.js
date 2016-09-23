import React, { Component } from 'react';

require('../../../stylesheets/static/adminLayout.scss');
require('../../../vendor/bootstrap/css/bootstrap.css');

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
