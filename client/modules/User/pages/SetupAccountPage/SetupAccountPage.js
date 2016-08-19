import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import styles from './SetupAccountPage.scss';

// Import Components
import DiscForm from '../../components/DiscForm/DiscForm';
import TalentsForm from '../../components/TalentsForm/TalentsForm';

// Import Actions
import { setupProfileRequest } from '../../../User/UserActions';

// Import Selectors
import { getCurrentUser, hasProfileCompleted } from '../../../App/AppReducer';

class SetupAccountPage extends Component {

  constructor(props) {
    super(props)
    this.state = { currentStage: 1, amountStage: 2, disc: {}, talents: {} }
  }

  componentDidMount() {
    let { currentUser } = this.props;

    if (currentUser && hasProfileCompleted(currentUser)) {
      this.context.router.push('/profile');
    }
  }

  onCompleted(result) {
    if (this.state.currentStage === 1) {
      this.setState({ currentStage: this.state.currentStage + 1, disc: result })
    } else if (this.state.currentStage === 2) {
      this.setState({ talents: result })
      this.props.dispatch(setupProfileRequest({
        email: this.props.currentUser.email,
        talents: result,
        ...this.state.disc
      }));//TODO: Update after maje JWT auth api
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

    return (
      <div className={styles.wrapper}>
        <div className={styles.stage}>Setup account - step {currentStage} of {amountStage}</div>
        {this.renderStage()}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SetupAccountPage.need = [];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state)
  };
}

SetupAccountPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

SetupAccountPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SetupAccountPage);
