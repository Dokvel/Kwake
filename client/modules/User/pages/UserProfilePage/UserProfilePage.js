import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './UserProfilePage.scss';

// Import Components
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';

// Import Actions

// Import Selectors
import { getCurrentUser, hasProfileCompleted } from '../../../App/AppReducer';

class UserProfilePage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && !hasProfileCompleted(nextProps.currentUser)) {
      this.context.router.push('/users/setup');
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.currentUser && <UserProfileCard user={this.props.currentUser}/>}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state)
  };
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UserProfilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserProfilePage);
