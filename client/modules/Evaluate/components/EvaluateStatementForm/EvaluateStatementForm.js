/**
 * Created by alex on 24.08.16.
 */

import React, { Component } from 'react';

// Import Style
import styles from './EvaluateStatementForm.scss';

// Import Components
import Button from '../../../../components/Button/Button';
import RateItemStatement from '../RateItemStatement/RateItemStatement';

export class EvaluateTalentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isValid() {
    return this.state.personality && this.state.team && this.state.troubleshooting
  }

  onComplete() {
    if (this.isValid()) {
      this.props.onCompleted(this.state);
    }
  }

  onRate(statement, rating) {
    this.setState({ [statement]: rating })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.statements}>
          <div key="personality" className={styles['statement-row']}>
            <RateItemStatement value={this.state['personality']} onRate={this.onRate.bind(this, 'personality')}>
              <span><b>{this.props.evaluate.givenName}</b>’ overall profile says that she’s an <b>{this.props.personalityType.name}</b>.
                That means {this.props.personalityType.description} <b>How correct is this?</b></span>
            </RateItemStatement>
          </div>
          <div key="team" className={styles['statement-row']}>
            <RateItemStatement value={this.state['team']} onRate={this.onRate.bind(this, 'team')}>
              <span><b>In team</b> {this.props.evaluate.givenName} is {this.props.personalityType.team} <b>How correct is this statement?</b></span>
            </RateItemStatement>
          </div>
          <div key="troubleshooting" className={styles['statement-row']}>
            <RateItemStatement value={this.state['troubleshooting']}
                               onRate={this.onRate.bind(this, 'troubleshooting')}>
              <span><b>To solve problems</b>, {this.props.evaluate.givenName} {this.props.personalityType.troubleshooting}
                <b>How correct is this statement?</b></span>
            </RateItemStatement>
          </div>
        </div>

        <div className={styles.actions}>
          <Button disabled={!this.isValid()} onClick={this.onComplete.bind(this)}>send anonymously</Button>
          <div className={styles.anonymous}>This review will be fully anonymous</div>
        </div>
      </div>
    );
  }
}

export default EvaluateTalentsForm;
