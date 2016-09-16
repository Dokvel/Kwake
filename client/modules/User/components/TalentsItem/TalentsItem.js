/**
 * Created by alex on 18.08.16.
 */

import React, { Component } from 'react';

import TalentIcon from '../../../../components/TalentIcon/TalentIcon';
import Tooltip from '../../../../components/Tooltip/Tooltip';

import styles from './TalentsItem.scss';

export class TalentsItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles['talent-box']}>
        <TalentIcon onClick={this.props.onSelect.bind(this)} name={this.props.icon} selected={this.props.selected}
                    tip={this.props.description}
                    talentKey={this.props.talentKey} talentName={this.props.name} circled={true}/>
        <Tooltip tip={this.props.description}><div className={styles.title}>{this.props.name}</div></Tooltip>
      </div>
    );
  }
}

TalentsItem.propTypes = {};

export default TalentsItem;
