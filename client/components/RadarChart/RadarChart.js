import React, { Component } from 'react';
import _ from 'lodash';

// Import Functions
import { RadarChartFunc } from '../../util/charts/RadarChart';

// Import Style
import styles from './RadarChart.scss';

// Import Static Data
import dataTalents from '../../../data/talents';

export default class RadarChart extends Component {
  componentDidMount() {
    let margin = {top: 50, right: 50, bottom: 50, left: 50},
    		width  = 300,
    		height = 300;

    let talentsObj = _.keyBy(dataTalents, 'key');
    let { talents } = this.props.user;

    let point_1 = 5,
    		point_3 = 4,
    		point_5 = 3.5,
    		point_7 = 5,
    		point_9 = 4.75;

    let baseMult = 3.75;

    let point_2  = (point_1+point_3)/baseMult,
    		point_4  = (point_3+point_5)/baseMult,
    		point_6  = (point_5+point_7)/baseMult,
    		point_8  = (point_7+point_9)/baseMult,
    		point_10 = (point_9+point_1)/baseMult;

    let data = [
    	[
    		{axis: talentsObj[talents[0]].abbreviation, value: point_1},
    		{axis: "", value: point_2},
    		{axis: talentsObj[talents[1]].abbreviation, value: point_3},
    		{axis: "", value: point_4},
    		{axis: talentsObj[talents[2]].abbreviation, value: point_5},
    		{axis: "", value: point_6},
    		{axis: talentsObj[talents[3]].abbreviation, value: point_7},
    		{axis: "", value: point_8},
    		{axis: talentsObj[talents[4]].abbreviation, value: point_9},
    		{axis: "", value: point_10}
    	]
    ];

    let color = d3.scale.ordinal().range(["here will be color"]);

    let radarChartOptions = {
    	w: width,
    	h: height,
    	margin: margin,
    	color: color
    };

    RadarChartFunc(".radarChart", data, radarChartOptions);
  }

  render() {
      let userPhotoStyle = {
      backgroundImage: 'url(' + this.props.user.image + ')'
    };

    return (
      <div className={styles.chart}>
        <div className="radarChart">
          <div className={styles.userPhoto} style={userPhotoStyle}></div>
        </div>
      </div>
    );
  }
}
