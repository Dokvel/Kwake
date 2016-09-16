import React, { PropTypes }from 'react';
import _ from 'lodash';

// Import Components
import Star from '../Star/Star';
import Tooltip from '../Tooltip/Tooltip';

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
  let headings = ['Not seen', 'Work in Progress', 'Good', 'Great', 'Master'];
  return (
    <div className={styles.container}>
      {
        _.range(1, props.max+1).map(value => (
          <div key={value} className={styles.star}>
            <Tooltip tip={headings[value - 1]}>
              <Star checked={ props.value && value <= props.value }
                    onClick={ () => props.onChange(value) } />
            </Tooltip>
          </div>
        ))
      }
    </div>
  );

}

RateItem.defaultProps = { max: 5 };

export default RateItem;
