import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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
            <Jumbotron
              {...this.props}
              title='Kwake &mdash; professional profiles, that don’t suck!'
              titleSize={72}
              text='With Kwake you can quickly create and share you psychological profile and let others review it.'
              textSize={18} />
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
