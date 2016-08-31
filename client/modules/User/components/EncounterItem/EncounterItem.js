import React from 'react';
import cn from 'classnames';

// Import Style
import styles from './EncounterItem.scss';

function EncounterItem(props) {
  let avatar = props.image ? props.image : "https://lh4.googleusercontent.com/-9GtzGQSWlcY/AAAAAAAAAAI/AAAAAAAAAAs/rQ3kmKyAtVo/photo.jpg";
  let userPhotoStyle = {
    backgroundImage: `url(${avatar})`
  };

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
