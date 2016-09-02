/**
 * Created by alex on 31.08.16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../../../util/apiCaller';

// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';

// Import Selectors
import { getCurrentUser } from '../../../App/AppReducer';

// Import Styles
import styles from './SignInStepPage.scss';

export class SignInStepPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (isLoggedIn() && nextProps.currentUser) {
      this.props.onCompleted();
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Jumbotron
            {...this.props}
            title='Kwake &mdash; professional profiles, that don’t suck.'
            titleSize={60}
            text='With Kwake you can quickly create and share you psychological profile and let others review it.'
            textSize={18} />
        </div>
      </div>
    );
  }
}

SignInStepPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return { currentUser: getCurrentUser(store) };
}

export default connect(mapStateToProps)(SignInStepPage);
