import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';

// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import RadarChart from '../../../../components/RadarChart/RadarChart';

// Import Functions
import { getFirstUserPageLink } from '../../../../util/generalHelpers';

// Import Styles
import styles from './LandingPage.scss';

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';

export class LandingPage extends Component {

  renderJumbotron(titleSize, textSize) {
    return (
      <Jumbotron
        {...this.props}
        title='enQounter &mdash; professional profiles that don’t suck!'
        titleSize={titleSize}
        text='With enQounter, you can quickly create and share your unique type and talent, grow personal Superpower Scores via invited, but anonymous, encounter reviews, and always be ready to play to your best at work.'
        textSize={textSize}
        onGoogleSuccess={(user)=>{
          if (isLoggedIn()) {
            browserHistory.push(getFirstUserPageLink(user))
          }
        }}/>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['mobile-header']}>enQounter</div>
        <div className={styles.content}>
          <div className={styles['column-left']}>
            <div className={styles['radar-chart']}>
              <RadarChart special='randomize' />
            </div>
          </div>
          <div className={styles['column-right']}>
            <div className={styles.header}>enQounter</div>
            <div className={styles.jumbotron}>
              <MediaQuery query='(max-width: 1280px)'>
                {this.renderJumbotron(30, 16)}
              </MediaQuery>
              <MediaQuery query='(min-width: 1281px)'>
                {this.renderJumbotron(56, 18)}
              </MediaQuery>
            </div>
            <div className={styles.footer}>
              Copyright &copy; {new Date().getFullYear()} enQounter. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    currentUser: getCurrentUser(store)
  };
}

export default connect(mapStateToProps)(LandingPage);
