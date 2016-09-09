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
    this.state = { form: {}, attentionItem: { key: undefined, value: undefined } };
  }

  updateDiscResult(criteria, value) {
    let form = { ...this.state.form };
    let attentionItem = { ...this.state.attentionItem };
    let discKeys = discItems.map(item=>item.key);

    if (value === undefined) {
      delete form[criteria];
    } else {
      if (this.state.attentionItem.key === criteria && this.state.attentionItem.value === value) {
        return;
      }
      form[criteria] = value;
    }

    let lowerValues = discKeys.filter(item => form[item] === 0);
    let higherValues = discKeys.filter(item => form[item] === 1);
    let formLength = Object.keys(form).length;

    if (formLength >= discKeys.length - 1) {
      if (formLength === discKeys.length && (lowerValues.length === formLength || higherValues.length === formLength)) {
        attentionItem = {};
      }
      if (lowerValues.length >= formLength - 1) {
        attentionItem = { key: _.xor(lowerValues, discKeys)[0], value: 0 };
      }
      if (higherValues.length >= formLength - 1) {
        attentionItem = { key: _.xor(higherValues, discKeys)[0], value: 1 };
      }
    }
    this.setState({ ...this.state, form, attentionItem });
  }

  isValid() {
    let valid = true;
    _.each(discItems, (item) => {
      if (this.state.form[item.key] === undefined) valid = false;
    });
    return valid;
  }

  onComplete() {
    if (this.isValid()) {
      this.props.onCompleted(this.state.form);
    } else {
      alert('You must fill all items');
    }
  }

  render() {
    let { attentionItem }  = this.state;
    return (
      <div>
        <div className={styles.title}>How do people see you at work:</div>
        <div className={styles.container}>
          <div className={styles.headers}>
            <div className={styles['low-header']}>lower</div>
            <div></div>
            <div className={styles['high-header']}>higher</div>
          </div>
          {
            discItems.map(item => (
              <DiscItem
                { ...item }
                key={item.key}
                value={this.state.form[item.key]}
                unavailableValue={attentionItem.key === item.key && attentionItem.value}
                onChangeValue={this.updateDiscResult.bind(this, item.key)}
              />
            ))
          }
        </div>
        <div className={styles.actions}>
          <Button disabled={!this.isValid()} onClick={this.onComplete.bind(this)}
                  rightIcon="bi_interface-arrow-right">Continue</Button>
        </div>
      </div>
    );
  }
}

export default DiscForm;
