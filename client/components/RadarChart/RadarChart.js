import React, { Component } from 'react';
import cn from 'classnames';
import _ from 'lodash';

// Import Components
import ScoreRadial from '../ScoreRadial/ScoreRadial';

// Import Functions
import { RadarChartFunc } from '../../util/charts/RadarChart';

// Import Style
import styles from './RadarChart.scss';

// Import Static Data
import dataTalents from '../../../data/talents';

export default class RadarChart extends Component {
  componentDidMount() {
    let talentsObj = _.keyBy(dataTalents, 'key');

    if (!(_.isEmpty(this.props.talentRates))) {
      this.renderChart();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!(_.isEmpty(this.props.talentRates))) {
      this.renderChart();
    }
  }

  renderChart() {
    let talentsObj = _.keyBy(dataTalents, 'key');
    let {talents} = this.props;
    let {talentRates, summary} = this.props;
    let votes = [];

    _.each(talentRates, talentRate => {
      votes.push(_.toArray(talentRate));
    });

    if (summary) {
      votes.push(_.toArray(summary))
    }

    let data = new Array(votes.length);
    let colorArray = [];
    let opacityArray = [];

    for (var i = 0; i < votes.length; i++) {
      if (summary && i === (votes.length - 1)) {
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
          subPoint = (points[i] + points[0]) / baseMult;
          // 1 | 5
          if ((baseMult / 1.8 <= subPoint && subPoint <= baseMult / 1.5) && (points[i] > baseMult * 1.6 || points[0] > baseMult * 1.6)) {
            subPoint = subPoint * (baseMult / 3.61);
          }
          // 1 | 4
          if ((baseMult / 2.24 <= subPoint && subPoint < baseMult / 1.799) && (points[i] > baseMult * 1.3 || points[0] > baseMult * 1.3)) {
            subPoint = subPoint * (baseMult / 3.7);
          }
          // 1 | 3
          if (baseMult / baseMult < subPoint && subPoint < baseMult / 2.24) {
            subPoint = subPoint * (baseMult / 3.16);
          }
          // 1 | 2
          if (baseMult / 4.48 <= subPoint && subPoint <= baseMult / baseMult) {
            subPoint = subPoint * (baseMult / 2.5);
          }
          // 1 | 1
          if (subPoint < baseMult / 4.48) {
            subPoint = subPoint * (baseMult / 2);
          }

          subPoints.push(subPoint);
        } else {
          subPoint = (points[i] + points[i + 1]) / baseMult;
          // 1 | 5
          if ((baseMult / 1.8 <= subPoint && subPoint <= baseMult / 1.5) && (points[i + 1] > baseMult * 1.6 || points[0] > baseMult * 1.6)) {
            subPoint = subPoint * (baseMult / 3.61);
          }
          // 1 | 4
          if ((baseMult / 2.24 <= subPoint && subPoint < baseMult / 1.799) && (points[i + 1] > baseMult * 1.3 || points[0] > baseMult * 1.3)) {
            subPoint = subPoint * (baseMult / 3.7);
          }
          // 1 | 3
          if (baseMult / baseMult < subPoint && subPoint < baseMult / 2.24) {
            subPoint = subPoint * (baseMult / 3.16);
          }
          // 1 | 2
          if (baseMult / 4.48 <= subPoint && subPoint <= baseMult / baseMult) {
            subPoint = subPoint * (baseMult / 2.5);
          }
          // 1 | 1
          if (subPoint < baseMult / 4.48) {
            subPoint = subPoint * (baseMult / 2);
          }

          subPoints.push(subPoint);
        }
      }

      if (talents === 'none') {
        for (let i = 0; i < 5; i++) {
          let item = {};

          item = {
            axis: "",
            value: points[i]
          }
          data[v].push(item);

          item = {
            axis: "",
            value: subPoints[i]
          }
          data[v].push(item);
        }
      } else {
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
    }

    let radarChartOptions = {
      color: color,
      opacity: opacity
    };

    RadarChartFunc(".radarChart", data, radarChartOptions);
  }

  render() {
    let userPhotoStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    };

    if (!(_.isEmpty(this.props.talentRates))) {
      if (typeof window !== 'undefined') {
        this.renderChart();
      }
    }

    let classes = cn(styles.userPhoto, {
      [styles.moveDown]: _.isEmpty(this.props.talentRates)
    });

    return (
      <div>
        <div className="radarChart">
          {
            this.props.summary
            ?
            <div className={styles.userPhoto} style={userPhotoStyle}></div>
            :
            <div className={classes}>
              <ScoreRadial
                colorStart={'#0060ff'}
                colorEnd={'#0060ff'}
                contentType={'image'}
                content={this.props.image}
                maxValue={this.props.limit}
                value={this.props.talentRates.length}
                strokeWidth={5}
                strokeDistance={0}
                progressStrokeWidth={5} />
            </div>
          }
        </div>
      </div>
    );
  }
}
