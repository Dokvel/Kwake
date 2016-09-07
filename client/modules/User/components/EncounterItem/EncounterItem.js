import React from 'react';
import cn from 'classnames';

// Import Style
import styles from './EncounterItem.scss';

function EncounterItem(props) {
  let userPhotoStyle = props.image ? { backgroundImage: `url(${props.image})` } : undefined;

  return (
    <div className={ cn(styles['container'], { [styles['container--selected']]: props.selected })}
         onClick={props.onClick}>
      <div className={styles['user-photo']}
           style={userPhotoStyle}>
      </div>
      <div className={styles.details}>
        <span className={styles.name}> {props.displayName }</span>
        <span className={styles.email}>{ props.email}</span>
      </div>
      <div className={styles.marker}>
        <i className={cn("bi_interface-tick", styles.tick)}/>
      </div>
    </div>
  );
}

export default EncounterItem;
