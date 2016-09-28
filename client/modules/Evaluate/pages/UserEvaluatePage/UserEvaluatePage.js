/**
 * Created by alex on 24.08.16.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

import {
  gaLogReviewRequestOpened,
  gaLogReviewRequestPassed,
  gaLogUserScoreUnlocked
} from '../../../../../utils/gaHelpers';

import styles from './UserEvaluatePage.scss';

import { getPersonalityType } from '../../../../../utils/disc_helpers';

// Import Components
import EvaluateStatementForm from '../../components/EvaluateStatementForm/EvaluateStatementForm';
import EvaluateTalentsForm from '../../components/EvaluateTalentsForm/EvaluateTalentsForm';
import SignInStepPage from '../../components/SignInStepPage/SignInStepPage';
import Header from '../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';

// Import Actions
import { fetchTokenInfo } from '../../EvaluateActions';

// Import Selectors
import { getTokenInfo } from '../../EvaluateReducer';

const TYPE_TALENTS = 'TYPE_TALENTS';
const TYPE_STATEMENT = 'TYPE_STATEMENT';
const TYPE_SIGN_IN = 'TYPE_SIGN_IN';

class UserEvaluatePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.isSignIn() ? TYPE_SIGN_IN : TYPE_TALENTS,
      statements: {},
      talents: {}
    }
  }

  isSignIn() {
    return this.props.location.query.sign_in === 'true';
  }

  componentDidMount() {
    gaLogReviewRequestOpened(this.isSignIn());
    this.props.dispatch(fetchTokenInfo(this.props.params.token));
  }

  onCompleted(result) {
    if (this.state.type === TYPE_SIGN_IN) {
      this.setState({ type: TYPE_TALENTS })
    } else if (this.state.type === TYPE_TALENTS) {
      this.setState({ type: TYPE_STATEMENT, talents: result })
    } else if (this.state.type === TYPE_STATEMENT) {
      callApi(`evaluate/${this.props.params.token}`, 'post', {
        personalityKey: this.props.personalityType.key,
        statements: result,
        talents: this.state.talents
      }).then(res => {
        browserHistory.push('/thanks');
        gaLogReviewRequestPassed();
        if (res.isUnlocked) {
          gaLogUserScoreUnlocked();
        }
      });
    }
  }

  renderForm() {
    if (this.state.type === TYPE_SIGN_IN) {
      return (<SignInStepPage onCompleted={this.onCompleted.bind(this)}/>)
    } else if (this.state.type === TYPE_STATEMENT) {
      return (<EvaluateStatementForm {...this.props} onCompleted={this.onCompleted.bind(this)}/>)
    } else {
      return (<EvaluateTalentsForm onCompleted={this.onCompleted.bind(this)}
                                   talents={this.props.evaluate.talents} givenName={this.props.evaluate.givenName}/>)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header {...this.props.evaluate}/>
        <div className={styles.container}>
          {this.props.evaluate && this.renderForm()}
        </div>
        <Footer/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  let evaluate = getTokenInfo(state, props.params.token);
  let personalityType = evaluate ? getPersonalityType(evaluate) : undefined;

  return {
    evaluate,
    personalityType
  };
}

UserEvaluatePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

UserEvaluatePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserEvaluatePage);
