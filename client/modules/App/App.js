import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import { isLoggedIn } from '../../util/apiCaller';

// Import Actions
import { authenticated } from './AppActions';
import callApi from '../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from './AppReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    if (isLoggedIn()) {
      callApi('users/me', 'get').then(userInfo => {
        this.props.dispatch(authenticated(userInfo.user));
      });
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    currentUser: getCurrentUser(store),
  };
}

export default connect(mapStateToProps)(App);
