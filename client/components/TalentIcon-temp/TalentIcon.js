import React, { Component }from 'react';
import cn from 'classnames';
import Tooltip from '../Tooltip/Tooltip';

import styles from './TalentIcon.scss';

function TalentIcon(props) {
  let classes = cn(styles.icon, {
    [styles.circled]: props.circled,
    [styles['icon--selected']]: props.selected,
    [styles['icon--enabled']]: !!props.onClick
  });
  return (
    <Tooltip id={props.talentKey} tip={props.tip}>
      <div className={classes} onClick={props.onClick}>
        <i className={props.name || "bi_com-group-bubble-a"} aria-hidden="true"/>
      </div>
    </Tooltip>
  )
}

export default TalentIcon;
