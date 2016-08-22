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

    let points = [ 5, 4, 3.5, 5, 4.75 ];
    let baseMult = 3;

    let subPoints = [];
    let subPoint = null;
    let data = [[]];
    let item = {};

    for (var i = 0; i < points.length; i++) {
      if (i === (points.length - 1)) {
        subPoint = (points[i] + points[0])/baseMult;
        subPoints.push(subPoint);
      } else {
        subPoint = (points[i] + points[i+1])/baseMult;
        subPoints.push(subPoint);
      }
    }

    for (var i = 0; i < talents.length; i++) {
      item = {
        axis: talentsObj[talents[i]].abbreviation,
        value: points[i]
      }
      data[0].push(item);

      item = {
        axis: "",
        value: subPoints[i]
      }
      data[0].push(item);
    }

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
