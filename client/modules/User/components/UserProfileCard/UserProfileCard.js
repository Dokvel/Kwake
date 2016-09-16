import React from 'react';
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

class UserProfileCard extends React.Component {

  fbShare = () => {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    FB.ui({
      method: 'feed',
      link: window.location.origin,
      caption: 'enQounter',
      picture: `${window.location.origin}/api/users/${this.props.user.cuid}/sm_post_picture`
    }, (response) => {
      console.log(response);
    });
  };

  render() {
    let talentsObj = _.keyBy(talents, 'key');
    let user = this.props.user;
    let userType = getPersonalityType(user);

    let teamColorRange, troubleshootingColorRange;
    if (this.props.summary && this.props.summary.statements) {
      teamColorRange = getColorRange(this.props.summary.statements.team);
      troubleshootingColorRange = getColorRange(this.props.summary.statements.troubleshooting);
    }

    let cardStyles = cn(styles.card, {
      [styles['locked--margin-top']]: this.props.isCurrentUser && !this.props.summary,
      [styles['unlocked--margin-top']]: this.props.isCurrentUser && this.props.summary
    });

    return (
      <div className={cardStyles}>
        { this.props.isCurrentUser && !this.props.summary &&
        <div className={styles.limitInfo}>
          <span className={styles.icon}><i className="icon-36-info" aria-hidden="true"/></span>
          Get <b>{user.scoreLimit - this.props.feedbackRates.talents.length} more</b> reviews to unlock your scores!
        </div>
        }
        <div className={styles.card_chart}>
          <RadarChart
            image={user.image}
            limit={user.scoreLimit}
            talents={user.talents}
            talentRates={this.props.feedbackRates.talents}
            summary={this.props.summary && this.props.summary.talents}/>
        </div>
        <div className={styles.card_user}>
          {`${user.givenName} ${user.familyName}`} <span className={styles.card_user_isa}>is a</span>
        </div>
        <div className={styles.card_type}>
          {userType && userType.name}
        </div>
        {this.props.isCurrentUser &&
        <div className={styles.card_btnAsk}>
          <Button
            rightIcon="icon-37-arrow"
            // {!props.summary && Button.COLOR_BLUE} throws error
            color={!this.props.summary ? Button.COLOR_BLUE : undefined}
            onClick={this.props.showRequestModal}>
            Ask for a review
          </Button>
          <div className={styles['share-links']}>
            <div className={styles['fb-share-link']} onClick={this.fbShare.bind(this)}>
              <span className="fa fa-facebook-square" aria-hidden="true"/> share
            </div>
          </div>
        </div>
        }
        <div className={styles.card_desc}>
          <div className={styles.card_desc_score}>
            {
              this.props.summary && this.props.summary.statements ?
                <span className={styles.card_desc_score_summary}>
                {this.props.summary.statements.personality.toFixed(1)}
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
              { this.props.summary ?
                <span className={styles.value}>{this.props.summary.talents[talent].toFixed(1)}</span> :
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
              this.props.summary && this.props.summary.statements
                ?
                <div className={styles.card_info_score_radial}>
                  <ScoreRadial
                    id={'team'}
                    colorStart={teamColorRange[0]}
                    colorEnd={teamColorRange[1]}
                    contentType={'text'}
                    content={this.props.summary.statements.team.toFixed(1)}
                    maxValue={5}
                    value={this.props.summary.statements.team}
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
            { this.props.summary && this.props.summary.statements ?
              <div className={styles.card_info_score_radial}>
                <ScoreRadial
                  id={'troubleshooting'}
                  colorStart={troubleshootingColorRange[0]}
                  colorEnd={troubleshootingColorRange[1]}
                  contentType={'text'}
                  content={this.props.summary.statements.troubleshooting.toFixed(1)}
                  maxValue={5}
                  value={this.props.summary.statements.troubleshooting}
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
}

export default UserProfileCard;
