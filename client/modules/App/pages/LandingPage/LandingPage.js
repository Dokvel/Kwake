import React, { Component, PropTypes } from 'react';
import GoogleButton from '../../../../components/GoogleButton/GoogleButton';
import { connect } from 'react-redux';

// Import Components

// Import Styles

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Actions

// Import Selectors

export class LandingPage extends Component {

  render() {
    return (
      <div>
        <GoogleButton {...this.props}/>
      </div>
    );
  }
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(LandingPage);
