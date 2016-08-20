import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './UserProfilePage.scss';

// Import Components
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';

// Import Actions

// Import Selectors

class UserProfilePage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <UserProfileCard />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    null
  };
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UserProfilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserProfilePage);
