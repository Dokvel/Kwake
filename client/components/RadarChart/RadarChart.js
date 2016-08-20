import React, { Component } from 'react';

// Import Style
import styles from './RadarChart.scss';

// Import Functions
import { RadarChartFunc } from '../../util/charts/RadarChart';

export default class RadarChart extends Component {
  componentDidMount() {
    var margin = {top: 50, right: 50, bottom: 50, left: 50},
    		width  = 300,
    		height = 300;

    var stg = 5,
    		ach = 4,
    		com = 3.5,
    		inc = 5,
    		har = 4.75;

    var baseMult = 3.75;

    var stg_ach = ((stg+ach)/baseMult)*1.1,
    		ach_com = (ach+com)/baseMult,
    		com_inc = (com+inc)/baseMult,
    		inc_har = (inc+har)/baseMult,
    		har_stg = (har+stg)/baseMult;

    var data = [
    	[
    		{axis:"stg",value:stg},
    		{axis:"",value:stg_ach},
    		{axis:"ach",value:ach},
    		{axis:"",value:ach_com},
    		{axis:"com",value:com},
    		{axis:"",value:com_inc},
    		{axis:"inc",value:inc},
    		{axis:"",value:inc_har},
    		{axis:"har",value:har},
    		{axis:"",value:har_stg}
    	]
    ];

    var color = d3.scale.ordinal().range(["here will be color"]);

    var radarChartOptions = {
    	w: width,
    	h: height,
    	margin: margin,
    	color: color
    };

    //Call function to draw the Radar chart
    RadarChartFunc(".radarChart", data, radarChartOptions);
  }

  render() {
    return (
      <div className={styles.chart}>
        <div className="radarChart">
          <div className={styles.userPhoto}></div>
        </div>
      </div>
    );
  }
}
