import React from 'react';
import cn from 'classnames';

import styles from './TalentIcon.scss';

function TalentIcon(props) {
  let classes = cn(styles.icon, {
    [styles['icon--selected']]: props.selected,
    [styles['icon--enabled']]: !!props.onClick
  });
  return (
    <div className={classes} onClick={props.onClick}>
      <i className={props.name || "bi_com-group-bubble-a"} aria-hidden="true"/>
    </div>
  )
}

export default TalentIcon;
