import React from 'react';

import styles from './Header.scss';

function Header(props) {
  return (
    <div className={styles.container}>
      <span className={styles.message}><b>{props.givenName}</b> <b>{props.familyName}</b> asked you to review her psychological profile</span>
      <div className={styles['user-photo']} style={{ backgroundImage: `url(${props.image })` }}></div>
    </div>
  )
}

export default Header;
