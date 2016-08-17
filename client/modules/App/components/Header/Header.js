import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import GoogleButton from '../../components/GoogleButton/GoogleButton';

// Import Style
import styles from './Header.scss';

export function Header(props, context) {

  return (
    <div className={styles.content}>
      <div className={styles.brand}>
        kwake
      </div>
      <div className={styles.auth}>
        <GoogleButton {...props}/>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {};

export default Header;
