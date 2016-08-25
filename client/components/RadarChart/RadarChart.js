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

    let votes = [
      [3,4,5,4,3],
      [4,3,2,3,4],
      [1,5,1,5,1],

      // final vote
      [3,4,4,3.5,4]
    ];

    let data = new Array(votes.length);
    let colorArray = [];
    let opacityArray = [];

    for (var i = 0; i < votes.length; i++) {
      if (i === (votes.length - 1)) {
        colorArray.push("url(#gradient)");
        opacityArray.push("1");
      } else {
        colorArray.push("#B2C4FF");
        opacityArray.push(".15");
      }

      data[i] = [];
    }

    let color = d3.scale.ordinal().range(colorArray);
    let opacity = d3.scale.ordinal().range(opacityArray);

    let baseMult = 3;

    for (let v = 0; v < votes.length; v++) {
      let points = votes[v];
      let subPoints = [];
      let subPoint = null;

      for (let i = 0; i < points.length; i++) {
        if (i === (points.length - 1)) {
          subPoint = (points[i] + points[0])/baseMult;
          // 1 | 5
          if ((baseMult/1.8 <= subPoint && subPoint <= baseMult/1.5) && (points[i]>baseMult*1.6 || points[0]>baseMult*1.6)) {
            subPoint = subPoint*(baseMult/3.61);
          }
          // 1 | 4
          if ((baseMult/2.24 <= subPoint && subPoint < baseMult/1.799) && (points[i]>baseMult*1.3 || points[0]>baseMult*1.3)) {
            subPoint = subPoint*(baseMult/3.7);
          }
          // 1 | 3
          if (baseMult/baseMult < subPoint && subPoint < baseMult/2.24) {
            subPoint = subPoint*(baseMult/3.16);
          }
          // 1 | 2
          if (baseMult/4.48 <= subPoint && subPoint <= baseMult/baseMult) {
            subPoint = subPoint*(baseMult/2.5);
          }
          // 1 | 1
          if (subPoint < baseMult/4.48) {
            subPoint = subPoint*(baseMult/2);
          }

          subPoints.push(subPoint);
        } else {
          subPoint = (points[i] + points[i+1])/baseMult;
          // 1 | 5
          if ((baseMult/1.8 <= subPoint && subPoint <= baseMult/1.5) && (points[i+1]>baseMult*1.6 || points[0]>baseMult*1.6)) {
            subPoint = subPoint*(baseMult/3.61);
          }
          // 1 | 4
          if ((baseMult/2.24 <= subPoint && subPoint < baseMult/1.799) && (points[i+1]>baseMult*1.3 || points[0]>baseMult*1.3)) {
            subPoint = subPoint*(baseMult/3.7);
          }
          // 1 | 3
          if (baseMult/baseMult < subPoint && subPoint < baseMult/2.24) {
            subPoint = subPoint*(baseMult/3.16);
          }
          // 1 | 2
          if (baseMult/4.48 <= subPoint && subPoint <= baseMult/baseMult) {
            subPoint = subPoint*(baseMult/2.5);
          }
          // 1 | 1
          if (subPoint < baseMult/4.48) {
            subPoint = subPoint*(baseMult/2);
          }

          subPoints.push(subPoint);
        }
      }

      for (let i = 0; i < talents.length; i++) {
        let item = {};

        item = {
          axis: talentsObj[talents[i]].abbreviation,
          value: points[i]
        }
        data[v].push(item);

        item = {
          axis: "",
          value: subPoints[i]
        }
        data[v].push(item);
      }

    }

    let radarChartOptions = {
    	w: width,
    	h: height,
    	margin: margin,
    	color: color,
      opacity: opacity
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
