import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import RadarChart from '../../../../components/RadarChart/RadarChart';

// Import Functions
import { generateAVG } from '../../../../util/feedbackHelpers';

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
        title='Kwake — professional profiles, that don’t suck.'
        titleSize={titleSize}
        text='With Kwake you can quickly create and share you psychological profile and let others review it. Here should be a bit more text, describing the product overall. At least 3 sentances.'
        textSize={textSize} />
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
    let keys = [1,2,3,4,5];
    let talentRates = [
      {1:5, 2:4, 3:3, 4:4, 5:5},
      {1:3, 2:4, 3:5, 4:4, 5:3},
      {1:4, 2:3, 3:4, 4:3, 5:4}
    ];
    let summary = generateAVG(keys, talentRates);;
    return (
      <div className={styles.container}>
        <div className={styles.header}>kwake</div>
        <div className={styles.content}>
        <div className={styles.radarChart}>
          <RadarChart
            image='https://s3.amazonaws.com/uifaces/faces/twitter/jonohunt/128.jpg'
            limit={3} // just for unlocked scoreRadial propgress-border
            talents='none' // if there are no titles for axes
            talentRates={talentRates}
            summary={summary} />
        </div>
        <div className={styles.jumbotron}>
          <MediaQuery query='(max-width: 767px)'>
            {this.renderJumbotron(30, 16)}
          </MediaQuery>
          <MediaQuery query='(min-width: 769px)'>
            {this.renderJumbotron(60, 18)}
          </MediaQuery>
        </div>
        </div>
        <div className={styles.footer}>
          Copyright © {new Date().getFullYear()} Kwake. All rights reserved.
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
