import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
import { domainAddress } from '../../../../util/generalHelpers';

// Import Components
import Button from '../../../../components/Button/Button';
import RadarChart from '../../../../components/RadarChart/RadarChart';
import ScoreRadial from '../../../../components/ScoreRadial/ScoreRadial';
import Tooltip from '../../../../components/Tooltip/Tooltip';

// Import Functions
import { getPersonalityType } from '../../../../../utils/disc_helpers';
import { getColorRange } from '../../../../util/feedbackHelpers';

// Import Style
import styles from './UserProfileCard.scss';

// Import Static Data
import talents from '../../../../../data/talents';

import { gaLogSocialNetworkShare } from '../../../../../utils/gaHelpers';

class UserProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nextPropsReceived: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ nextPropsReceived: true });
  }

  fbShare = () => {
    FB.ui({
      method: 'feed',
      link: domainAddress(),
      caption: 'enQounter',
      picture: `${domainAddress()}/api/users/${this.props.user.cuid}/sm_post_picture`
    }, (response) => {
      if (response && response.post_id) {
        gaLogSocialNetworkShare();
      }
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

    let positionHelperCN = cn({
      [styles['position-helper--unrated']]: this.props.isCurrentUser && this.props.feedbackRates.talents.length === 0,
      [styles['position-helper--locked']]: this.props.isCurrentUser && !this.props.summary && this.props.feedbackRates.talents.length !== 0,
      [styles['position-helper--unlocked']]: this.props.isCurrentUser && this.props.summary
    });

    let cardCN = cn(styles.card, {
      [styles['card--unrated']]: this.props.isCurrentUser && this.props.feedbackRates.talents.length === 0,
      [styles['card--locked']]: this.props.isCurrentUser && !this.props.summary && this.props.feedbackRates.talents.length !== 0,
      [styles['card--unlocked']]: this.props.isCurrentUser && this.props.summary
    });

    let chartCN = cn(styles.card_chart, {
      [styles['chart--unrated']]: this.props.isCurrentUser && this.props.feedbackRates.talents.length === 0
    });

    let limitMessage = `Get ${user.scoreLimit - this.props.feedbackRates.talents.length} more reviews to unlock your scores!`;

    return (
      <div className={cardCN}>
        <div className={positionHelperCN}></div>
        { this.props.isCurrentUser && !this.props.summary &&
        <div className={styles.limitInfo}>
          <span className={styles.icon}><i className="icon-36-info" aria-hidden="true"/></span>
          Get <b>{user.scoreLimit - this.props.feedbackRates.talents.length} more</b> reviews to unlock your scores!
        </div>
        }
        <div className={chartCN}>
          {
            this.state.nextPropsReceived
            &&
            <RadarChart
            special={this.props.feedbackRates.talents.length === 0 ? 'empty' : undefined}
            image={user.image}
            limit={user.scoreLimit}
            talents={user.talents}
            data={this.props.feedbackRates.talents}
            score={this.props.summary && this.props.summary.talents ? this.props.summary.talents : undefined} />
          }
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
              this.props.summary && this.props.summary.statements
              ?
              <span className={styles.card_desc_score_summary}>
                {this.props.summary.statements.personality.toFixed(1)}
              </span>
              :
              <Tooltip tip={limitMessage}>
                <i className="icon-35-lock"/>
              </Tooltip>
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
                </div>
                :
                <div className={styles.card_info_score_icon}>
                  <Tooltip tip={limitMessage}>
                    <i className="icon-35-lock"/>
                  </Tooltip>
                </div>
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
              this.props.summary && this.props.summary.statements
              ?
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
              </div>
              :
              <div className={styles.card_info_score_icon}>
                <Tooltip tip={limitMessage}>
                  <i className="icon-35-lock"/>
                </Tooltip>
              </div>
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
