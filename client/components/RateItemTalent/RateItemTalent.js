import React, { Component } from 'react';

// Import Components
import Star from '../Star/Star';

// Import Style
import styles from './RateItemTalent.scss';

// Usage
// in parent use this:
//
// rate(value) {
//   this.setState({rating: value});
// }
//
// <RateItemTalent data={data} rating={ this.state.rating } onRate={ this.rate.bind(this) } />


export default class RateItemTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [1, 2, 3, 4, 5]
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.talent}>{this.props.data.talent}</div>
        <div className={styles.icon}><i className={this.props.data.icon} aria-hidden="true"></i></div>
        {
          this.state.values.map(value => (
            <div key={value} className={styles.star} onClick={ () => this.props.onRate(value) }>
              <Star checked={ value <= this.props.rating ? true : false }/>
            </div>
          ))
        }
      </div>
    );
  }
}
