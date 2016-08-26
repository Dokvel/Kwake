/**
 * Created by alex on 24.08.16.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

import styles from './UserEvaluatePage.scss';

import { getPersonalityType } from '../../../../util/disc_helpers';

// Import Components
import EvaluateStatementForm from '../../components/EvaluateStatementForm/EvaluateStatementForm';
import EvaluateTalentsForm from '../../components/EvaluateTalentsForm/EvaluateTalentsForm';
import Header from '../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';

// Import Actions
import { fetchTokenInfo } from '../../EvaluateActions';

// Import Selectors
import { getTokenInfo } from '../../EvaluateReducer';

const TYPE_TALENTS = 'talents';
const TYPE_STATEMENT = 'statement';

class UserEvaluatePage extends Component {

  constructor(props) {
    super(props);
    this.state = { type: TYPE_TALENTS, statements: {}, talents: {} }
  }

  componentDidMount() {
    this.props.dispatch(fetchTokenInfo(this.props.params.token));
  }

  onCompleted(result) {
    if (this.state.type === TYPE_TALENTS) {
      this.setState({ type: TYPE_STATEMENT, talents: result })
    } else if (this.state.type === TYPE_STATEMENT) {
      callApi(`evaluate/${this.props.params.token}`, 'post', {
        personalityKey: this.props.personalityType.key,
        statements: result,
        talents: this.state.talents
      }).then(res => {
        browserHistory.push('/thanks');
      });
    }
  }

  renderForm() {
    if (this.state.type === TYPE_STATEMENT) {
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
