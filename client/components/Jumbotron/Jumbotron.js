import React, { Component, PropTypes } from 'react';

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
        <div className={styles.button}>
          <GoogleButton {...this.props} />
        </div>
      </div>
    );
  }
}

Jumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  textSize: PropTypes.number.isRequired
};

Jumbotron.defaultProps = {
  title: 'Title',
  titleSize: 16,
  text: 'Text',
  textSize: 16
};

export default Jumbotron;
