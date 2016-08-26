import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.scss';

// Import Components
import Helmet from 'react-helmet';
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
      callApi('user_info', 'get').then(userInfo => {
        this.props.dispatch(authenticated(userInfo.user));
      });
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div className={styles.main}>
        <Helmet
          title="KWAKE"
          titleTemplate="%s - Kwake App"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        {this.props.children}
      </div>
    );
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
