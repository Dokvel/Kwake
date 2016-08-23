import React, { Component } from 'react';

// Import Components
import Star from '../Star/Star';

// Import Style
import styles from './RateItem.scss';

// Usage
// set 'type' attribute 'talent' or 'statement'
// set 'data' attribute as object with fields
// 'talent' (if 'type' is 'talent'), 'description' (if 'type' is 'description') and 'icon'
//
// current rating value is in `state.rating`

export default class RateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [1, 2, 3, 4, 5],
      rating: null
    };
  }

  setRating(value) {
    this.setState({ rating: value });
  }

  render() {
    if (this.props.type === 'talent') {
      return (
        <div className={styles.container_talent}>
          <div className={styles.talent}>{this.props.data.talent}</div>
          <div className={styles.icon}><i className={this.props.data.icon} aria-hidden="true"></i></div>
          {
            this.state.values.map(value => (
              <div key={value} className={styles.star} onClick={ () => this.setRating(value) }>
                <Star checked={ value <= this.state.rating ? true : false }/>
              </div>
            ))
          }
        </div>
      );
    } else if (this.props.type === 'statement') {
      return (
        <div className={styles.container_statement}>
          <div className={styles.info}>
            <div className={styles.icon}><i className="fa fa-comment-o" aria-hidden="true"></i></div>
            <div className={styles.desc}>{this.props.data.description}</div>
          </div>
          <div className={styles.starLine}>
            {
              this.state.values.map(value => (
                <div key={value} className={styles.star} onClick={ () => this.setRating(value) }>
                  <Star checked={ value <= this.state.rating ? true : false }/>
                </div>
              ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          Set correctly rater's type
        </div>
      );
    }
  }
}
