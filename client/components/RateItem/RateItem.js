import React, { PropTypes }from 'react';
import _ from 'lodash';

// Import Components
import Star from '../Star/Star';

// Import Style
import styles from './RateItem.scss';

// Usage
// in parent use this:
//
// onRate(value) {
//   this.setState({rating: value});
// }
//
// <RateItem data={data} value={ this.state.rating } max={5} onChange={ this.onRate.bind(this) } />

function RateItem(props) {

  return (
    <div className={styles.container}>
      {
        _.range(1, props.max+1).map(value => (
          <div key={value} className={styles.star}>
            <Star checked={ props.value && value <= props.value }
                  onClick={ () => props.onChange(value) }/>
          </div>
        ))
      }
    </div>
  );

}

RateItem.defaultProps = { max: 5 };

export default RateItem;
