/**
 * Created by alex on 18.08.16.
 */

import React, { Component } from 'react';

// Import Style
import styles from './TalentsForm.scss';

// Import Data
import talents from '../../../../../data/talents';

// Import Components
import TalentsItem from '../TalentsItem/TalentsItem';
import Button from '../../../../components/Button/Button';

const AMOUNT_SELECT_TALENTS = 5;

export class TalentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTalents: [] };
  }

  updateResult(talent) {
    let selected = [...this.state.selectedTalents]
    let index = selected.indexOf(talent)
    if (index > -1) {
      selected.splice(index, 1);
    } else if (selected.length < 5) {
      selected.push(talent)
    }
    this.setState({ selectedTalents: selected });
  }

  isValid() {
    return this.state.selectedTalents.length === AMOUNT_SELECT_TALENTS
  }

  onComplete() {
    if (this.isValid()) {
      this.props.onCompleted(this.state.selectedTalents);
    } else {
      alert('You must select 5 talents');
    }
  }

  render() {
    return (
      <div>
        <div className={styles.title}>
          <span>Select <b>{AMOUNT_SELECT_TALENTS - this.state.selectedTalents.length}</b> talents that characterize you:</span>
        </div>
        {/*<pre>{JSON.stringify(this.state)}</pre>*/}
        <div className={styles.container}>
          {
            talents.map(talent => (
              <TalentsItem
                { ...talent }
                key={talent.key}
                selected={this.state.selectedTalents.indexOf(talent.key) > -1}
                onSelect={this.updateResult.bind(this, talent.key)}
              />
            ))
          }
        </div>
        <div className={styles.actions}>
          <Button disabled={!this.isValid()} onClick={this.onComplete.bind(this)}
                  rightIcon="bi_interface-arrow-right">Finish</Button>
        </div>
      </div>
    );
  }
}

export default TalentsForm;
