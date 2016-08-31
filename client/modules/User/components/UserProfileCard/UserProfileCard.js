import React, { PropTypes } from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Import Functions
import callApi from '../../../../util/apiCaller';
import { checkLimit, generateSummary } from '../../../../util/feedbackHelpers';

// Import Components
import Button from '../../../../components/Button/Button';
import RadarChart from '../../../../components/RadarChart/RadarChart';

// Import Functions
import { getPersonalityType } from '../../../../util/disc_helpers';

// Import Style
import styles from './UserProfileCard.scss';

// Import Static Data
import talents from '../../../../../data/talents';

function UserProfileCard(props) {
  let talentsObj = _.keyBy(talents, 'key');
  let user = props.user;
  let userType = getPersonalityType(user);
  let talentsFeedbacks = props.votes;
  let limitStatus = checkLimit(props.votes, user.scoreLimit);
  if (limitStatus) {
    talentsFeedbacks = generateSummary(props.votes);
  }
  let talentsSummary = _.last(talentsFeedbacks);
  let talentsSummaryObj = _.zipObject(user.talents, talentsSummary);

  return (
    <div className={styles.card}>
      <div className={styles.card_chart}>
        <RadarChart user={user} votes={talentsFeedbacks}/>
      </div>
      <div className={styles.card_user}>
        {`${user.givenName} ${user.familyName}`} <span className={styles.card_user_isa}>is a</span>
      </div>
      <div className={styles.card_type}>
        {userType && userType.name}
      </div>
      {props.isCurrentUser &&
      <div className={styles.card_btnAsk}>
        <Button rightIcon="bi_interface-arrow-right" color={Button.COLOR_BLUE} onClick={props.showRequestModal}>
          Ask for a review
        </Button>
      </div>
      }
      <div className={styles.card_desc}>
        <div className={styles.card_desc_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_desc_text}>
          {userType && userType.description}
        </div>
      </div>
      <ul className={styles.card_talentsList}>
        { user.talents.map((talent) => {
          return (<li key={talent}>
            <span className={styles.talent}><i className="fa fa-star-o"></i></span>
            {`${talentsObj[talent].name} (${talentsObj[talent].abbreviation})`}
            <span className={styles.score}>
            { limitStatus ? <span className={styles.value}>{talentsSummaryObj[talent]}</span> : <i className="fa fa-lock"></i> }
            </span>
          </li>)
        }) }
      </ul>
      <div className={styles.card_info}>
        <div className={styles.card_info_title}>Team</div>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Team</span>
          <br />
          <span className={styles.card_info_desc_text}>{userType && userType.team}</span>
        </div>
      </div>
      <div className={cn(styles.card_info, styles.card_info_troubleshooting)}>
        <div className={styles.card_info_title}>Troubleshooting</div>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Troubleshooting</span>
          <br />
          <span className={styles.card_info_desc_text}>{userType && userType.troubleshooting}</span>
        </div>
      </div>
    </div>
  );
}

UserProfileCard.propTypes = {
  votes: PropTypes.array.isRequired
};

UserProfileCard.defaultProps = {
  votes: [[]]
};

export default UserProfileCard;
