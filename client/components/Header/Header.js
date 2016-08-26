import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Header.scss';

// Import Selectors
import { getCurrentUser } from '../../modules/App/AppReducer';

import { signOut } from '../../util/google-api'
import { notAuthenticated } from '../../modules/App/AppActions';

export class Header extends Component {
  clickSignOut(event) {
    this.props.dispatch(notAuthenticated());
    window.gapi.auth2.getAuthInstance().signOut().then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.brand}>
          kwake
        </div>
        { this.props.currentUser &&
        <div className={styles['user-info']}>
          <span>Logged in as {this.props.currentUser.givenName} {this.props.currentUser.familyName}
            ({this.props.currentUser.email})</span>
          <a className={styles['user-menu']} href="#" onClick={this.clickSignOut.bind(this)}>Sign out</a>
        </div>
        }
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    currentUser: getCurrentUser(store),
  };
}

export default connect(mapStateToProps)(Header);
