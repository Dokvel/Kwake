import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { browserHistory } from 'react-router';
import { getFirstUserPageLink } from '../../../../util/generalHelpers';
// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import Footer from '../../../../components/Footer/Footer';

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';

// Import Styles
import styles from './ThanxPage.scss';

let atom = require('./../../../../../vendor/atom.svg');

export class ThanxPage extends Component {

  renderJumbotron(titleSize, textSize) {
    return (
      <Jumbotron
        {...this.props}
        title="KWAKE &mdash; professional profiles that don’t suck!"
        titleSize={titleSize}
        text="With KWAKE you can quickly create and share you psychological profile and let others review it."
        textSize={textSize}
        onGoogleSuccess={(user) => {
          if (isLoggedIn()) {
            browserHistory.push(getFirstUserPageLink(user));
          }
        }}
      />
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.image}>
              <img src={atom} />
            </div>
            <div className={styles['thanks-message']}>
              THANKS FOR THE REVIEW!
            </div>
          </div>
          <div className={styles.jumbotron}>
            <MediaQuery query="(max-width: 767px)">
              <div className={styles.poweredBy}>REVIEW POWERED BY:</div>
              {this.renderJumbotron(30, 16)}
            </MediaQuery>
            <MediaQuery query="(min-width: 768px)">
              {this.renderJumbotron(56, 18)}
            </MediaQuery>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

ThanxPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return { currentUser: getCurrentUser(store) };
}

export default connect(mapStateToProps)(ThanxPage);
