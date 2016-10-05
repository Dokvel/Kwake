import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Components
import GoogleButton from '../GoogleButton/GoogleButton';

// Import Style
import styles from './Jumbotron.scss';

class Jumbotron extends Component {

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
          <GoogleButton dispatch={this.props.dispatch}
                        onSuccessAuth={this.props.onGoogleSuccess}
                        currentUser={this.props.currentUser}
                        onContinue={this.props.onContinue }/>
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
