import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';

// Import Components
import Jumbotron from '../../../../components/Jumbotron/Jumbotron';
import Footer from '../../../../components/Footer/Footer';

// Import Functions
import { isLoggedIn } from '../../../../util/apiCaller';

// Import Selectors
import { getCurrentUser } from '../../AppReducer';

// Import Styles
import styles from './ThanxPage.scss';

let atom = require("./../../../../../vendor/atom.svg");

export class ThanxPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (isLoggedIn() && nextProps.currentUser) {
      browserHistory.push('/');
    }
  }

  renderJumbotron(titleSize, textSize) {
    return (
      <Jumbotron
        {...this.props}
        title='Kwake &mdash; psychological profiles, that don’t suck.'
        titleSize={titleSize}
        text='With Kwake you can quickly create and share you psychological profile and let others review it.'
        textSize={textSize} />
    );
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
          <div className={styles.jumbotron}>
            <MediaQuery query='(max-width: 767px)'>
              <div className={styles.poweredBy}>REVIEW POWERED BY:</div>
              {this.renderJumbotron(30, 16)}
            </MediaQuery>
            <MediaQuery query='(min-width: 768px)'>
              {this.renderJumbotron(60, 18)}
            </MediaQuery>
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
