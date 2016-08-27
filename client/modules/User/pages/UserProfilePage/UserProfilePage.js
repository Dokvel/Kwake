import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Import Style
import styles from './UserProfilePage.scss';

// Import Components
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';

// Import Actions
import { fetchUser } from '../../UserActions';
import { getEvaluates } from '../../../Evaluate/EvaluateActions';

// Import Selectors
import { getUser } from '../../UserReducer';
import { getUserEvaluates } from '../../../Evaluate/EvaluateReducer';

// Import Selectors
import { hasProfileCompleted } from '../../../App/AppReducer';

class UserProfilePage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !hasProfileCompleted(nextProps.user)) {
      this.context.router.push('/');
    }
  }

  componentWillMount() {
    this.props.dispatch(getEvaluates());
  }

  componentDidMount() {
    if (this.props.user && !hasProfileCompleted(this.props.user)) {
      this.context.router.push('/');
    }
  }

  render() {
    let votes = [];
    if (this.props.user && this.props.evaluates) {
      _.each(this.props.evaluates, evaluate => {
        votes.push(this.props.user.talents.map(talent=> evaluate.talents[talent] || 0));
      })
      if (votes.length === 0) {
        votes.push([]);
      }
    }

    return (
      <div className={styles.container}>
        {this.props.user && <UserProfileCard user={this.props.user} votes={votes}/>}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserProfilePage.need = [
  params => {
    return fetchUser(params.cuid);
  },
  params => {
    return getEvaluates();
  }
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    user: getUser(state, props.params.cuid),
    evaluates: getUserEvaluates(state, props.params.cuid)
  };
}

UserProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UserProfilePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserProfilePage);
