import React, { PropTypes } from 'react';

// Import Style
import styles from './UserListItem.scss';

function UserListItem(props) {
  return (
    <div className={styles['single-user']}>
      <span className={styles.attr}>
        {props.user.givenName} {props.user.familyName}
      </span>
      <span className={styles.attr}>
          {props.user.email}
      </span>
    </div>
  );
}

UserListItem.propTypes = {};

export default UserListItem;
