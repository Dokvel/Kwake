import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import _ from 'lodash';
import browser from 'detect-browser';

// Import Components
import Loader from '../../../../components/Loader/Loader';
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import RadarChart from '../../../../components/RadarChart/RadarChart';

// Import Functions
import { generateAVG } from '../../../../util/feedbackHelpers';
import { isAppleDevice } from '../../../../util/generalHelpers';

// Import Styles
import styles from './LandingPage.scss';

import { isLoggedIn } from '../../../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';
import { hasProfileCompleted } from '../../AppReducer';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorized: true }
  }

  componentWillMount() {
    this.setState({ isAuthorized: isLoggedIn() });
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.loggedBehavior(this.props.currentUser)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isLoggedIn()) {
      this.loggedBehavior(nextProps.currentUser)
    }
  }

  renderJumbotron(titleSize, textSize) {
    return (
      <Jumbotron
        {...this.props}
        title='enQounter &mdash; professional profiles that don’t suck!'
        titleSize={titleSize}
        text='With enQounter, you can quickly create and share your unique type and talent, grow personal Superpower Scores via invited, but anonymous, encounter reviews, and always be ready to play to your best at work.'
        textSize={textSize}/>
    );
  }

  loggedBehavior(user) {
    if (user) {
      if (hasProfileCompleted(user)) {
        browserHistory.push('/profile/' + user.cuid);
      } else {
        browserHistory.push('/users/setup');
      }
    }
  }

  render() {
    let keys = [1, 2, 3, 4, 5];
    let talentRates = [
      { 1: 5, 2: 4, 3: 3, 4: 4, 5: 5 },
      { 1: 3, 2: 4, 3: 5, 4: 4, 5: 3 },
      { 1: 4, 2: 3, 3: 4, 4: 3, 5: 4 }
    ];
    let summary;
    if (isAppleDevice()) {
      summary = generateAVG(keys, talentRates);
    } else {
      summary = {1:0,2:0,3:0,4:0,5:0};
    }
    return (
      <div className={styles.container}>
        <div className={styles['mobile-header']}>enQounter</div>
        <div className={styles.content}>
          <div className={styles['column-left']}>
            <div className={styles['radar-chart']}>
              <div className={styles['main-star']}>
                { isAppleDevice() ? undefined : <Loader /> }

              </div>
              <RadarChart
                image=''
                limit={3} // just for unlocked scoreRadial propgress-border
                talents='none' // if there are no titles for axes
                talentRates={talentRates}
                summary={summary} />
              <div className={styles['user-photo']}></div>
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
              Copyright © {new Date().getFullYear()} enQounter. All rights reserved.
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
