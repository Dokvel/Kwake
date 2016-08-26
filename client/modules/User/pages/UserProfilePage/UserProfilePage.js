import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './UserProfilePage.scss';

// Import Components
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';

// Import Actions
import { fetchUser } from '../../UserActions';

// Import Selectors
import { getUser } from '../../UserReducer';

// Import Selectors
import { hasProfileCompleted } from '../../../App/AppReducer';

class UserProfilePage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !hasProfileCompleted(nextProps.user)) {
        this.context.router.push('/');
    }
  }
  componentDidMount() {
    if (this.props.user && !hasProfileCompleted(this.props.user)) {
        this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.user && <UserProfileCard user={this.props.user}/>}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserProfilePage.need = [params => {
  return fetchUser(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    user: getUser(state, props.params.cuid)
  };
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UserProfilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserProfilePage);
