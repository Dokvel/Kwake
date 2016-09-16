import React, { PropTypes } from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Import Components
import Button from '../../../../components/Button/Button';
import RadarChart from '../../../../components/RadarChart/RadarChart';
import ScoreRadial from '../../../../components/ScoreRadial/ScoreRadial';

// Import Functions
import { getPersonalityType } from '../../../../../utils/disc_helpers';
import { getColorRange } from '../../../../util/feedbackHelpers';

// Import Style
import styles from './UserProfileCard.scss';

// Import Static Data
import talents from '../../../../../data/talents';

function fbShare() {
  FB.ui({
    method: 'feed',
    link: 'https://developers.facebook.com/docs/',
    caption: 'An example caption',
  }, function(response){});
}

function UserProfileCard(props) {
  let talentsObj = _.keyBy(talents, 'key');
  let user = props.user;
  let userType = getPersonalityType(user);

  let teamColorRange, troubleshootingColorRange;
  if (props.summary && props.summary.statements) {
    teamColorRange = getColorRange(props.summary.statements.team);
    troubleshootingColorRange = getColorRange(props.summary.statements.troubleshooting);
  }

  let cardStyles = cn(styles.card, {
    [styles['locked--margin-top']]: props.isCurrentUser && !props.summary,
    [styles['unlocked--margin-top']]: props.isCurrentUser && props.summary
  });

  return (
    <div className={cardStyles}>
      { props.isCurrentUser && !props.summary &&
      <div className={styles.limitInfo}>
        <span className={styles.icon}><i className="icon-36-info" aria-hidden="true"/></span>
        Get <b>{user.scoreLimit - props.feedbackRates.talents.length} more</b> reviews to unlock your scores!
      </div>
      }
      <div className={styles.card_chart}>
        <RadarChart
          image={user.image}
          limit={user.scoreLimit}
          talents={user.talents}
          talentRates={props.feedbackRates.talents}
          summary={props.summary && props.summary.talents}/>
      </div>
      <div className={styles.card_user} onClick={fbShare.bind(this)}>
        {`${user.givenName} ${user.familyName}`} <span className={styles.card_user_isa}>is a</span>
      </div>
      <div className={styles.card_type}>
        {userType && userType.name}
      </div>
      {props.isCurrentUser &&
      <div className={styles.card_btnAsk}>
        <Button
          rightIcon="icon-37-arrow"
          // {!props.summary && Button.COLOR_BLUE} throws error
          color={!props.summary ? Button.COLOR_BLUE : undefined}
          onClick={props.showRequestModal}>
          Ask for a review
        </Button>
      </div>
      }
      <div className={styles.card_desc}>
        <div className={styles.card_desc_score}>
          {
            props.summary && props.summary.statements ?
              <span className={styles.card_desc_score_summary}>
                {props.summary.statements.personality.toFixed(1)}
              </span> :
              <i className="icon-35-lock"/>
          }
        </div>
        <div className={styles.card_desc_text}>
          {userType && userType.description}
        </div>
      </div>
      <ul className={styles.card_talentsList}>
        { user.talents.map((talent) => {
          return (
            <li key={talent}>
              <span className={styles.talent}><i className={talentsObj[talent].icon}/></span>
              {`${talentsObj[talent].name} (${talentsObj[talent].abbreviation})`}
              <span className={styles.score}>
              { props.summary ?
                <span className={styles.value}>{props.summary.talents[talent].toFixed(1)}</span> :
                <i className="fa fa-lock"/> }
              </span>
            </li>
          )
        }) }
      </ul>
      <div className={styles.card_info}>
        <div className={styles.card_info_title}>Team</div>
        <div className={styles.card_info_score}>
          {
            props.summary && props.summary.statements
              ?
              <div className={styles.card_info_score_radial}>
                <ScoreRadial
                  id={'team'}
                  colorStart={teamColorRange[0]}
                  colorEnd={teamColorRange[1]}
                  contentType={'text'}
                  content={props.summary.statements.team.toFixed(1)}
                  maxValue={5}
                  value={props.summary.statements.team}
                  strokeWidth={1}
                  strokeDistance={2}
                  progressStrokeWidth={5}/>
              </div> :
              <div className={styles.card_info_score_icon}><i className="icon-35-lock"/></div>
          }
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
          { props.summary && props.summary.statements ?
            <div className={styles.card_info_score_radial}>
              <ScoreRadial
                id={'troubleshooting'}
                colorStart={troubleshootingColorRange[0]}
                colorEnd={troubleshootingColorRange[1]}
                contentType={'text'}
                content={props.summary.statements.troubleshooting.toFixed(1)}
                maxValue={5}
                value={props.summary.statements.troubleshooting}
                strokeWidth={1}
                strokeDistance={2}
                progressStrokeWidth={5}/>
            </div> :
            <div className={styles.card_info_score_icon}><i className="icon-35-lock"/></div>
          }
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

export default UserProfileCard;
