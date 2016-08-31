import React from 'react';
import cn from 'classnames';

// Import Style
import styles from './EncounterItem.scss';

function EncounterItem(props) {
  let userPhotoStyle = props.image ? { backgroundImage: `url(${props.image})` } : undefined;

  return (
    <div className={styles.container}>
      <div className={cn(styles['user-photo'], { [styles['user-photo--selected']]: props.selected })}
           style={userPhotoStyle}
           onClick={props.onClick}>
        <i className={cn("bi_interface-tick", styles.tick)}/>
      </div>
      <div className={cn(styles.name, { [styles['name--selected']]: props.selected })}>
        {props.displayName || props.email}
      </div>
    </div>
  );
}

export default EncounterItem;
