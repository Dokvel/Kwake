import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { getFirstUserPageLink } from '../../util/generalHelpers';
import { Link } from 'react-router';

// Import Components
import GoogleButton from '../GoogleButton/GoogleButton';
import Button from '../Button/Button';

// Import Style
import styles from './Jumbotron.scss';

class Jumbotron extends Component {

  loggedBehavior = () => {
    if (this.props.currentUser) {
      browserHistory.push(getFirstUserPageLink(this.props.currentUser));
    }
  };

  render() {
    let titleStyle = {
      fontSize: this.props.titleSize + 'px'
    };

    let textStyle = {
      fontSize: this.props.textSize + 'px'
    };

    return (
      <div className={styles.container}>
        <div className={styles.title} style={titleStyle}>
          {this.props.title}
        </div>
        <div className={styles.text} style={textStyle}>
          {this.props.text}
        </div>
        <div className={styles['button-section']}>
          {!this.props.currentUser ?
            <GoogleButton {...this.props} onSuccess={this.props.onGoogleSuccess} /> :
            <Button
              onClick={this.props.onContinue || this.loggedBehavior}>{`Continue as ${this.props.currentUser.givenName} ${this.props.currentUser.familyName}`}</Button>
          }
          <Link to="/terms">
            Terms and Conditions
          </Link>
        </div>
      </div>
    );
  }
}

Jumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  textSize: PropTypes.number.isRequired,
  user: PropTypes.object
};

Jumbotron.defaultProps = {
  title: 'Title',
  titleSize: 30,
  text: 'Text',
  textSize: 16
};

export default Jumbotron;
