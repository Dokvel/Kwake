import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import styles from './SetupAccountPage.scss';

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Components
import DiscForm from '../../components/DiscForm/DiscForm';
import TalentsForm from '../../components/TalentsForm/TalentsForm';

// Import Actions
import { setupProfileRequest } from '../../../User/UserActions';

// Import Selectors
import { getCurrentUser, hasProfileCompleted } from '../../../App/AppReducer';

class SetupAccountPage extends Component {

  constructor(props) {
    super(props);
    this.state = { currentStage: 1, amountStage: 2, disc: {}, talents: {} }
  }

  componentWillMount() {
    if (!isLoggedIn()) {
      browserHistory && browserHistory.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser && hasProfileCompleted(nextProps.currentUser)) {
      this.context.router.push('/profile/' + nextProps.currentUser.cuid);
    }
  }

  onCompleted(result) {
    if (this.state.currentStage === 1) {
      this.setState({ currentStage: this.state.currentStage + 1, disc: result });
      window.scrollTo(0, 0);
    } else if (this.state.currentStage === 2) {
      this.setState({ talents: result })
      this.props.dispatch(setupProfileRequest({ talents: result, ...this.state.disc }));
    }
  }

  renderStage() {
    if (this.state.currentStage === 1) {
      return (<DiscForm onCompleted={this.onCompleted.bind(this)}/>)
    } else if (this.state.currentStage === 2) {
      return (<TalentsForm onCompleted={this.onCompleted.bind(this)}/>)
    }
  }

  render() {
    let { amountStage, currentStage } = this.state;
    let { currentUser } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.stage}>Setup account - step {currentStage} of {amountStage}</div>
        {currentUser && this.renderStage()}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state)
  };
}

SetupAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

SetupAccountPage.contextTypes = {
  router: React.PropTypes.object,
};

SetupAccountPage.willTransitionFrom = (transition, component) => {
  console.log(transition)
  if (this.state.currentStage > 1) {
    this.setState({ currentStage: this.state.currentStage - 1 });
    transition.abort();
  }
}

export default connect(mapStateToProps)(SetupAccountPage);
