import React from 'react';
import cn from 'classnames';

import ReactTooltip from 'react-tooltip';
import styles from './TalentIcon.scss';

function TalentIcon(props) {
  let classes = cn(styles.icon, {
    [styles.circled]: props.circled,
    [styles['icon--selected']]: props.selected,
    [styles['icon--enabled']]: !!props.onClick
  });
  return (
    <div data-for={props.talentKey} className={classes} onClick={props.onClick} data-tip={props.tip}>
      <i className={props.name || "bi_com-group-bubble-a"} aria-hidden="true"/>
      <ReactTooltip id={props.talentKey} class={styles.tooltip} effect='solid'/>
    </div>
  )
}

export default TalentIcon;
