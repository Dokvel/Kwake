/**
 * Created by alex on 24.08.16.
 */

import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

// Import Style
import styles from './EvaluateTalentsForm.scss';

// Import Data
const talents = _.keyBy(require('../../../../../data/talents').default, 'key')

// Import Components
import Button from '../../../../components/Button/Button';
import RateItem from '../../../../components/RateItem/RateItem';
import TalentIcon from '../../../../components/TalentIcon/TalentIcon';
import Tooltip from '../../../../components/Tooltip/Tooltip';

export class EvaluateTalentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { talentRates: {} };
  }

  isValid() {
    return this.props.talents && Object.keys(this.state.talentRates).length === this.props.talents.length
  }

  onComplete() {
    if (this.isValid()) {
      this.props.onCompleted(this.state.talentRates);
    }
  }

  onRate(talent, rating) {
    this.setState({ talentRates: { ...this.state.talentRates, [talent]: rating } })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}> Rate {this.props.givenName}`s personal talents:</div>
        <div className={styles.talents}>
          {
            this.props.talents.map((talent)=> (
              <div key={talent} className={styles['talent-row']}>
                <div className={styles.talent}>
                  <Tooltip tip={talents[talent].description}>
                    <div className={styles.name}>{talents[talent].name}</div>
                  </Tooltip>
                  <MediaQuery query='(max-width: 767px)'>
                    <TalentIcon name={talents[talent].icon} tip={talents[talent].description} talentKey={talent}
                                talentName={talents[talent].name}/>
                  </MediaQuery>
                  <MediaQuery query='(min-width: 768px)'>
                    <TalentIcon name={talents[talent].icon} tip={talents[talent].description} talentKey={talent}
                                talentName={talents[talent].name} circled={true}/>
                  </MediaQuery>
                </div>
                <RateItem value={this.state.talentRates[talent]} onChange={this.onRate.bind(this, talent)}/>
                <div style={{ flex: '1' }}></div>
              </div>
            ))
          }</div>
        <div className={styles.actions}>
          <Button disabled={!this.isValid()} onClick={this.onComplete.bind(this)}
                  rightIcon="icon-37-arrow">next</Button>
          <div className={styles.anonymous}>
            <i className="icon-35-lock" aria-hidden="true"/>
            This review will be fully anonymous
          </div>
        </div>
      </div>
    );
  }
}

EvaluateTalentsForm.propTypes = {
  talents: PropTypes.array.isRequired
}

EvaluateTalentsForm.defaultProps = {
  talents: []
}

export default EvaluateTalentsForm;
