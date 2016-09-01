import React, { Component, PropTypes } from 'react';
import GoogleButton from '../../../../components/GoogleButton/GoogleButton';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isLoggedIn } from '../../../../util/apiCaller';

// Import Components
import Footer from '../../../../components/Footer/Footer';

// Import Styles
import styles from './ThanxPage.scss';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';

let atom = require("./../../../../../vendor/atom.svg");

export class ThanxPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (isLoggedIn() && nextProps.currentUser) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.image}>
              <img src={atom}/>
            </div>
            <div className={styles['thanks-message']}>
              THANKS FOR THE REVIEW!
            </div>
          </div>
          <div className={styles.message}>
            Kwake &mdash; professional profiles, that don't suck!
          </div>
          <div className={styles.ability}>
            With Kwake you can quickly create your professional profile and let others to rate how you really work.
          </div>
          <div className={styles.actions}>
            <GoogleButton {...this.props}/>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

ThanxPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return { currentUser: getCurrentUser(store) };
}

export default connect(mapStateToProps)(ThanxPage);
