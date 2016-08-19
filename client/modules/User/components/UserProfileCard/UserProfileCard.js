import React, { PropTypes } from 'react';

// Import Components
import RadarChart from './components/RadarChart/RadarChart';
import Button from '../../../../components/Button/Button';

// Import Style
import styles from './UserProfileCard.scss';

function UserProfileCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card_chart}>
        <RadarChart />
      </div>
      <div className={styles.card_user}>
        Kate Mayinnsee <span className={styles.card_user_isa}>is a</span>
      </div>
      <div className={styles.card_type}>
        Individualist
      </div>
      <div className={styles.card_btnAsk}>
        <Button rightIcon="bi_interface-arrow-right">Ask for a review</Button>
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
        <li>
          <span className={styles.talent}><i className="fa fa-star-o"></i></span>
          Strategic Self-Awareness (STG)
          <span className={styles.score}><i className="fa fa-lock"></i></span>
        </li>
        <li>
          <span className={styles.talent}><i className="fa fa-star-o"></i></span>
          Harmony (HAR)
          <span className={styles.score}><i className="fa fa-lock"></i></span>
        </li>
        <li>
          <span className={styles.talent}><i className="fa fa-star-o"></i></span>
          Includer (INC)
          <span className={styles.score}><i className="fa fa-lock"></i></span>
        </li>
        <li>
          <span className={styles.talent}><i className="fa fa-star-o"></i></span>
          Communication (COM)
          <span className={styles.score}><i className="fa fa-lock"></i></span>
        </li>
        <li>
          <span className={styles.talent}><i className="fa fa-star-o"></i></span>
          Achiever (ACH)
          <span className={styles.score}><i className="fa fa-lock"></i></span>
        </li>
      </ul>
      <div className={styles.card_info}>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Team</span>
          <br />
          <span className={styles.card_info_desc_text}>Relying on facts, structures and rules create a safe, peaceful environment for engaging with work and others.</span>
        </div>
      </div>
      <div className={styles.card_info, styles.card_info_troubleshooting}>
        <div className={styles.card_info_score}>
          <i className="fa fa-lock"></i>
        </div>
        <div className={styles.card_info_desc}>
          <span className={styles.card_info_desc_title}>Troubleshooting</span>
          <br />
          <span className={styles.card_info_desc_text}>Willfully sets off in new directions and relies on their own wits, resources for success.</span>
        </div>
      </div>
    </div>
  );
}

// UserProfileCard.propTypes = {
//
// };

export default UserProfileCard;
