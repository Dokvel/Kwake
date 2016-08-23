import React, { Component } from 'react';

// Import Components
import Star from '../Star/Star';

// Import Style
import styles from './RateItemStatement.scss';

// Usage
// in parent use this:
//
// rate(value) {
//   this.setState({rating: value});
// }
//
// <RateItemStatement data={data} rating={ this.state.rating } onRate={ this.rate.bind(this) } />

export default class RateItemStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [1, 2, 3, 4, 5]
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.icon}><i className={this.props.data.icon} aria-hidden="true"></i></div>
          <div className={styles.desc}>{this.props.data.description}</div>
        </div>
        <div className={styles.starLine}>
          {
            this.state.values.map(value => (
              <div key={value} className={styles.star} onClick={ () => this.props.onRate(value) }>
                <Star checked={ value <= this.props.rating ? true : false }/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
