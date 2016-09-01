import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import RadarChart from '../../../../components/RadarChart/RadarChart';

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
    return (
      <div className={styles.container}>
        <div className={styles.header}>kwake</div>
        <div className={styles.content}>
        <div className={styles.radarChart}>
          <RadarChart
            image={'https://s3.amazonaws.com/uifaces/faces/twitter/jonohunt/128.jpg'}
            talents={['ACHIEVER','ACHIEVER','ACHIEVER','ACHIEVER','ACHIEVER']}
            talentRates={[[5,5,5,5,5]]} />
        </div>
        <div className={styles.jumbotron}>
          <Jumbotron
            {...this.props}
            title={'Kwake — professional profiles, that don’t suck.'}
            titleSize={60}
            text={'With Kwake you can quickly create and share you psychological profile and let others review it. Here should be a bit more text, describing the product overall. At least 3 sentances.'}
            textSize={18} />
        </div>
        </div>
        <div className={styles.footer}>
          Copyright © 2016 Krake. All rights reserved.
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
