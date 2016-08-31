import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Import Style
import styles from './UserProfilePage.scss';

// Import Components
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import RequestReviewModal from '../../components/RequestReviewModal/RequestReviewModal';

// Import Actions
import { fetchUser } from '../../UserActions';
import { getEvaluates } from '../../../Evaluate/EvaluateActions';

// Import Functions
import { generateAVG } from '../../../../util/feedbackHelpers';

// Import Selectors
import { getUser } from '../../UserReducer';
import { getUserEvaluates } from '../../../Evaluate/EvaluateReducer';

// Import Selectors
import { hasProfileCompleted } from '../../../App/AppReducer';

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { showReviewModal: false }
  }

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

  hideReviewModal = ()=> {
    this.setState({ showReviewModal: false })
  };

  showRequestModal = ()=> {
    this.setState({ showReviewModal: true })
  };

  isUnlocked = () => {
    return this.props.user && this.props.evaluates.length >= this.props.user.scoreLimit;
  }

  render() {
    let feedbackRates = {
      statements: [],
      talents: []
    };

    let summary = {
      statements: {},
      talents: {}
    }

    if (this.props.user && this.props.evaluates) {
      _.each(this.props.evaluates, evaluate => {
        feedbackRates.statements.push(evaluate.statements);
        feedbackRates.talents.push(evaluate.talents);
      });
    }

    if (this.isUnlocked()) {
      summary.statements = generateAVG(['personality', 'team', 'troubleshooting'] ,feedbackRates.statements);
      summary.talents = generateAVG(this.props.user.talents, feedbackRates.talents);
    }

    return (
      <div className={styles.container}>

          <UserProfileCard
            user={this.props.user}
            showRequestModal={this.showRequestModal}
            isCurrentUser={this.props.isCurrentUser}
            feedbackRates={feedbackRates}
            summary={this.isUnlocked() ? summary : undefined} />
        }
        {this.props.user && this.state.showReviewModal && <RequestReviewModal handleClose={this.hideReviewModal}/>}
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
  let user = getUser(state, props.params.cuid)
  return {
    user,
    isCurrentUser: user && user.cuid === state.app.currentUser,
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
