import React, { Component, PropTypes } from 'react';
import _ from 'lodash'

// Import Style
import styles from './DiscForm.scss';

// Import Data
import discItems from '../../../../../data/disc';

// Import Components
import DiscItem from '../DiscItem/DiscItem';
import Button from '../../../../components/Button/Button';

export class DiscForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateDiscResult(criteria, value) {
    this.setState({ [criteria]: value });
  }

  isValid() {
    let valid = true
    _.each(discItems, (item) => {
      if (this.state[item.key] === undefined) valid = false;
    });
    return valid;
  }

  onComplete() {
    if (this.isValid()) {
      this.props.onCompleted(this.state);
    } else {
      alert('You must fill all items');
    }
  }

  render() {
    return (
      <div>
        <div className={styles.title}>What behaviour characterizes you:</div>
        <div className={styles.container}>
          <div className={styles.headers}>
            <div className={styles['low-header']}>low</div>
            <div></div>
            <div className={styles['high-header']}>high</div>
          </div>
          {
            discItems.map(item => (
              <DiscItem
                { ...item }
                key={item.key}
                value={this.state[item.key]}
                onChangeValue={this.updateDiscResult.bind(this, item.key)}
              />
            ))
          }
        </div>
        {/*<pre>{JSON.stringify(this.state)}</pre>*/}
        <div className={styles.actions}>
          <Button disabled={!this.isValid()} onClick={this.onComplete.bind(this)}
                  rightIcon="bi_interface-arrow-right">Continue</Button>
        </div>
      </div>
    );
  }
}

export default DiscForm;
