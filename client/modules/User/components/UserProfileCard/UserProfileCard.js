import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Import Components
import RadarChart from '../../../../components/RadarChart/RadarChart';
import Button from '../../../../components/Button/Button';

// Import Style
import styles from './UserProfileCard.scss';

// Import Static Data
import talents from '../../../../../data/talents';
import personalityTypes from '../../../../../data/personalityTypes';

function UserProfileCard(props) {
  let talentsObj = _.keyBy(talents, 'key');
  let personalityTypesObj = _.keyBy(personalityTypes, 'key');

  let user = props.user;
  let userType = personalityTypesObj[`${user.dominance}${user.influence}${user.steadiness}${user.conscientiousness}`];

  return (
    <div className={styles.card}>
      <div className={styles.card_chart}>
        <RadarChart user={user} />
      </div>
      <div className={styles.card_user}>
        {`${user.givenName} ${user.familyName}`} <span className={styles.card_user_isa}>is a</span>
      </div>
      <div className={styles.card_type}>
        {userType.name}
      </div>
      <div className={styles.card_btnAsk}>
        <Button rightIcon="bi_interface-arrow-right" color={Button.COLOR_BLUE}>Ask for a review</Button>
      </div>
      <div className={styles.card_desc}>
        <div className={styles.card_desc_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_desc_text}>
          Ability to quickly identify multiple options when evaluating solutions; and assure viability.
        </div>
      </div>
      <ul className={styles.card_talentsList}>
        { user.talents.map((talent)=> {
          return (<li key={talent}>
            <span className={styles.talent}><i className="fa fa-star-o"></i></span>
            {`${talentsObj[talent].name} (${talentsObj[talent].abbreviation})`}
            <span className={styles.score}><i className="fa fa-lock"></i></span>
          </li>)
        }) }
      </ul>
      <div className={styles.card_info}>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Team</span>
          <br />
          <span className={styles.card_info_desc_text}>{userType.team}</span>
        </div>
      </div>
      <div className={cn(styles.card_info, styles.card_info_troubleshooting)}>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Troubleshooting</span>
          <br />
          <span className={styles.card_info_desc_text}>{userType.troubleshooting}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
