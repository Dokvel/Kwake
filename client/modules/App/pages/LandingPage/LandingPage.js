import React, { Component, PropTypes } from 'react';
import GoogleButton from '../../../../components/GoogleButton/GoogleButton';
import { connect } from 'react-redux';
import { hasProfileCompleted } from '../../AppReducer';
import { browserHistory } from 'react-router';

// Import Components

// Import Styles

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorized: true }
  }

  componentWillMount() {
    this.setState({ isAuthorized: isLoggedIn() });
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.loggedBehavior(this.props.currentUser)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isLoggedIn()) {
      this.loggedBehavior(nextProps.currentUser)
    }
  }

  loggedBehavior(user) {
    if (user && hasProfileCompleted(user)) {
      browserHistory.push('/profile/'+user.cuid);
    } else {
      browserHistory.push('/users/setup');
    }
  }

  render() {
    return (
      <div>
        {!this.state.isAuthorized && <GoogleButton {...this.props}/>}
      </div>
    );
  }
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    currentUser: getCurrentUser(store)
  };
}

export default connect(mapStateToProps)(LandingPage);
