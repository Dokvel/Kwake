import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Loader from '../Loader/Loader';
import ScoreRadial from '../ScoreRadial/ScoreRadial';

import { FluidD3 } from '../../util/charts/RadarChart';
import { ratesToDataArray } from '../../util/feedbackHelpers';

import styles from './RadarChart.scss';
import talents from '../../../data/talents';
import personalityTypes from '../../../data/personalityTypes';

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined, score: undefined, userPhotoLoadStatus: false };
  }

  componentWillMount() {
    if (!this.props.special) {
      if (this.props.score) {
        let data = ratesToDataArray(this.props.data);
        let score = ratesToDataArray(this.props.score);
        this.setState({ data: data, score: score });
      } else {
        let data = ratesToDataArray(this.props.data);
        this.setState({ data: data });
      }
    } else {
      this.specialRandomize(this.props.special);
      this.loadInterval = setInterval(() => this.specialRandomize(this.props.special), 5000);
    }

    let image = document.createElement('img');
    image.src = this.props.image;
    image.onload = () => {
      this.setState({ userPhotoLoadStatus: true });
    };
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
  }

  componentDidMount() {
    let el = document.getElementById('svg');
    this.d3obj = new Array();

    let parent = this;
    this.state.data.forEach(function(val, index) {
      let active = index === parent.state.data.length - 1;
      parent.d3obj.push(new FluidD3(el, parent.props, {data: val, type: styles.haze}));
    });

    let scoreType = this.state.score !== undefined ? styles.active : styles.hidden;
    this.scoreSchart = new FluidD3(el, parent.props, {data: this.state.score, type: scoreType});
  }

  componentDidUpdate() {
    let parent = this;
    this.state.data.forEach(function(data, index) {
      parent.d3obj[index].update({data: data, type: styles.haze});
    });

    if (this.state.score !== undefined) {
      this.scoreSchart.update({data: this.state.score, type: styles.active});
    }
  }

  specialRandomize(special) {
    if (special === 'randomize') {
      let randomData = [[]];
      for (var i = 0; i < 5; i++) {
        randomData[0].push(_.random(0, 100));
      }
      let randomScore = [];
      for (var i = 0; i < 5; i++) {
        randomScore.push(_.random(0, 100));
      }
      this.setState({ data: randomData, score: randomScore });
    } else if (special === 'empty') {
      let randomData = [[]];
      for (var i = 0; i < 5; i++) {
        randomData[0].push(_.random(0, 75));
      }
      this.setState({ data: randomData });
    }
  }

  renderLegends() {
    let talentsObj = _.keyBy(talents, 'key');
    let legendPositions = [[200,30], [380,150], [300,350], [100,350], [20,150]];
    let legends = [];
    for (var i = 0; i < this.props.talents.length; i++) {
      legends.push({position: legendPositions[i], title: talentsObj[this.props.talents[i]].abbreviation});
    }
    return (
      <g className={styles.legend}>
        {
          legends.map((legend) => {
            return (
              <text key={legend.title} x={legend.position[0]} y={legend.position[1]} textAnchor="middle">{legend.title}</text>
            );
          })
        }
      </g>
    );
  }

  renderGuides() {
    let position = [];
    position.push(_.random(150, 250));
    position.push(_.random(20, 100));

    return (
      <svg className={styles['guide-box']} viewBox="0 0 400 400">
        <line className={styles['guide-line']} x1={position[0]} y1={position[1]} x2="200" y2="200" />
        <text className={styles['guide-text']} x={position[0]} y={position[1]} textAnchor="middle">{personalityTypes[_.random(0, 13)].name}</text>
      </svg>
    );
  }

  renderUserPhoto() {
    let userPhotoStyle = {
      backgroundImage: 'url(' + this.props.image + ')'
    };

    if (this.props.score) {
      return (
        <div id="userPhoto" className={styles.userPhoto} style={userPhotoStyle}></div>
      );
    } else {
      return (
        <div className={styles.userPhoto}>
          <ScoreRadial
            colorStart={'#0060ff'}
            colorEnd={'#0060ff'}
            contentType={'image'}
            content={this.props.image}
            maxValue={this.props.limit}
            value={this.props.data.length}
            strokeWidth={5}
            strokeDistance={0}
            progressStrokeWidth={5} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <svg id="svg" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="fgradient" x1="0" x2="1" y1="1" y2="0">
              <stop offset="0%" stopColor="#ffac52" />
              <stop offset="100%" stopColor="#ff3c57" />
            </linearGradient>
          </defs>
          {this.props.talents && !this.props.special ? this.renderLegends() : undefined}
        </svg>
        {this.props.special === 'randomize' ? this.renderGuides() : undefined}
        {
          (this.state.userPhotoLoadStatus || this.props.image === undefined)
          ?
          this.renderUserPhoto()
          :
          <div className={styles.loader}><Loader /></div>
        }
      </div>
    );
  }
}

RadarChart.propTypes = {
  data: React.PropTypes.array,
  image: React.PropTypes.string,
  limit: React.PropTypes.number,
  score: React.PropTypes.object,
  special: React.PropTypes.string,
  talents: React.PropTypes.array
};

RadarChart.defaultProps = {
  data: [],
  limit: 0
};

export default RadarChart;
