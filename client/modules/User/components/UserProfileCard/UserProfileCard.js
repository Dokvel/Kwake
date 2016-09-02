import React, { PropTypes } from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Import Functions
import callApi from '../../../../util/apiCaller';

// Import Components
import Button from '../../../../components/Button/Button';
import RadarChart from '../../../../components/RadarChart/RadarChart';
import ScoreRadial from '../../../../components/ScoreRadial/ScoreRadial';

// Import Functions
import { getPersonalityType } from '../../../../../utils/disc_helpers';

// Import Style
import styles from './UserProfileCard.scss';

// Import Static Data
import talents from '../../../../../data/talents';

function UserProfileCard(props) {
  let talentsObj = _.keyBy(talents, 'key');
  let user = props.user;
  let userType = getPersonalityType(user);

  let classes = cn({
    [styles.margin]: _.isEmpty(props.feedbackRates.talents)
  });

  return (
    <div>
      {props.isCurrentUser && !props.summary && <div className={styles.limitInfo}>Get <span className={styles.more}>{user.scoreLimit - props.feedbackRates.talents.length} more</span> reviews to unlock your scores!</div>}
      <div className={styles.card}>
        <div className={styles.card_chart}>
          <RadarChart
            image={user.image}
            limit={user.scoreLimit}
            talents={user.talents}
            talentRates={props.feedbackRates.talents}
            summary={props.summary && props.summary.talents} />
        </div>
        <div className={classes}></div>
        <div className={styles.card_user}>
          {`${user.givenName} ${user.familyName}`} <span className={styles.card_user_isa}>is a</span>
        </div>
        <div className={styles.card_type}>
          {userType && userType.name}
        </div>
        {props.isCurrentUser &&
        <div className={styles.card_btnAsk}>
          <Button
            rightIcon="bi_interface-arrow-right"
            color={props.summary ? Button.COLOR_GREEN : Button.COLOR_BLUE}
            onClick={props.showRequestModal}>
            Ask for a review
          </Button>
        </div>
        }
        <div className={styles.card_desc}>
          <div className={styles.card_desc_score}>
            {
              props.summary && props.summary.statements
              ?
              <span className={styles.card_desc_score_summary}>{props.summary.statements.personality.toFixed(1)}</span>
              :
              <i className="fa fa-lock"></i>
            }
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
              { props.summary ? <span className={styles.value}>{props.summary.talents[talent].toFixed(1)}</span> : <i className="fa fa-lock"></i> }
              </span>
            </li>)
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
                  colorStart={'coral'}
                  colorEnd={'brown'}
                  contentType={'text'}
                  content={props.summary.statements.team.toFixed(1)}
                  maxValue={5}
                  value={props.summary.statements.team}
                  strokeWidth={1}
                  strokeDistance={2}
                  progressStrokeWidth={5} />
              </div>
              :
              <div className={styles.card_info_score_icon}><i className="fa fa-lock"></i></div>
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
          {
            props.summary && props.summary.statements
            ?
            <div className={styles.card_info_score_radial}>
              <ScoreRadial
                colorStart={'coral'}
                colorEnd={'brown'}
                contentType={'text'}
                content={props.summary.statements.troubleshooting.toFixed(1)}
                maxValue={5}
                value={props.summary.statements.troubleshooting}
                strokeWidth={1}
                strokeDistance={2}
                progressStrokeWidth={5} />
            </div>
            :
            <div className={styles.card_info_score_icon}><i className="fa fa-lock"></i></div>
          }
          </div>
          <div className={styles.card_info_desc}>
            <span className={styles.card_info_desc_title}>Troubleshooting</span>
            <br />
            <span className={styles.card_info_desc_text}>{userType && userType.troubleshooting}</span>
          </div>
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
