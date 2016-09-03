import React from 'react';
import MediaQuery from 'react-responsive';

// Import Components
import RateItem from '../../../../components/RateItem/RateItem';
import TalentIcon from '../../../../components/TalentIcon/TalentIcon';

// Import Style
import styles from './RateItemStatement.scss';

// Usage
// in parent use this:
//
// rate(value) {
//   this.setState({rating: value});
// }
//
// <RateItemStatement value={ this.state.rating } onRate={ this.rate.bind(this) } />

export default function RateItemStatement(props) {
  return (
    <div className={styles.container}>
      <div className={styles['info-row']}>
        <div className={styles.info}>
          <MediaQuery query='(max-width: 767px)'>
            <TalentIcon talentKey={props.statementKey}/>
          </MediaQuery>
          <MediaQuery query='(min-width: 768px)'>
            <TalentIcon talentKey={props.statementKey} circled={true}/>
          </MediaQuery>
          <div className={styles.desc}>
            {props.children}
          </div>
        </div>
      </div>
      <RateItem value={props.value} onChange={props.onRate}/>
    </div>
  );
}
