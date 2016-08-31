/**
 * Created by alex on 31.08.16.
 */
import React, { Component, PropTypes } from 'react';
import GoogleButton from '../../../../components/GoogleButton/GoogleButton';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../../../util/apiCaller';

// Import Styles
import styles from './SignInStepPage.scss';

// Import Selectors
import { getCurrentUser } from '../../../App/AppReducer';

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
          <div className={styles.message}>
            Kwake &mdash; psychological profiles, that don`t suck.
          </div>
          <div className={styles.ability}>
            With Kwake you can quickly create and share you psychological profile and let others review it.
          </div>
          <div className={styles.actions}>
            <GoogleButton {...this.props}/>
          </div>
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
