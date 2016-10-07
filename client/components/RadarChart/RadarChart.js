import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Loader from '../Loader/Loader';
import ScoreRadial from '../ScoreRadial/ScoreRadial';

import { FluidD3 } from '../../util/charts/RadarChart';
import { ratesToDataArray } from '../../util/feedbackHelpers';

import styles from './RadarChart.scss';
import talents from '../../../data/talents';
import personalityTypes from '../../../data/personalityTypes';
import cn from 'classnames';

const chartFill = `#B2C4FF`;
const scoreChartFill = `url(#fgradient)`;

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.firstFakeAvatarShowed = false;
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
      this.specialRandomize(this.props.special, this.state.fakeAvatarId);
      this.loadInterval = setInterval(() => {
        if (this.refs.randomizeAvatar && this.refs.personalityType && this.refs.personalityLine) {
          this.refs.randomizeAvatar.classList.remove(styles['animate-show']);
          this.refs.randomizeAvatar.classList.remove(styles['animate-hide']);
          this.refs.personalityType.style.transition = 'opacity 0.5s';
          this.refs.personalityType.style.opacity = `0`;
          this.refs.personalityLine.style.transition = `stroke-dashoffset 0.4s ease-out-in  0.5s`;
          this.refs.personalityLine.style.strokeDashoffset = `100%`;
          this.refs.randomizeAvatar.classList.add(styles['animate-hide']);
        }
        setTimeout(()=> {
          return this.specialRandomize(this.props.special, this.state.fakeAvatarId);
        }, 500)
      }, 6000);
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
    let el = document.getElementById(styles.chart);
    this.d3obj = [];

    this.state.data.forEach((chartData, index)=> {
      this.d3obj.push(new FluidD3(el, this.props.linear, {
        data: chartData,
        className: styles.haze,
        fillGradient: chartFill
      }));
    });

    this.scoreSchart = new FluidD3(el, this.props.linear, {
      data: this.state.score,
      className: this.state.score !== undefined ? styles.active : styles.hidden,
      fillGradient: scoreChartFill
    });

    if (this.refs.personalityType) {
      this.refs.personalityLine.setAttribute('x2', this.refs.personalityType.getBBox().width + 5);
      this.refs.personalityLine.style.strokeDashoffset = `0`;
      this.refs.personalityType.style.opacity = `1`;
    }
  }

  componentDidUpdate() {
    this.state.data.forEach((data, index) => {
      this.d3obj[index].update({ data: data, className: styles.haze, fillGradient: chartFill });
    });

    if (this.state.score !== undefined)
      this.scoreSchart.update({ data: this.state.score, fillGradient: scoreChartFill });

    if (this.isRandomize()) {
      let textWidth = this.refs.personalityType.getBBox().width;
      var line = this.refs.personalityLine;
      line.setAttribute('x2', textWidth + 5);
    }
  }

  specialRandomize(special, currentFakeAvatarId = -1) {
    let randomScore;
    let randomData = [[]];
    let nextFakeAvatarId = currentFakeAvatarId;
    if (special === 'randomize') {
      randomScore = [];
      for (let i = 0; i < 5; i++) {
        randomData[0].push(_.random(0, 100));
        randomScore.push(_.random(0, 100));
      }
      if (this.refs.randomizeAvatar && this.refs.personalityType && this.refs.personalityLine) {
        if (currentFakeAvatarId > -1) {
          this.refs.randomizeAvatar.classList.remove(styles['animate-show']);
          this.refs.randomizeAvatar.classList.remove(styles['animate-hide']);
        }
        setTimeout(()=> {
          this.refs.personalityType.style.transition = 'opacity 0.5s';
          this.refs.personalityType.style.opacity = `1`;
          this.refs.personalityLine.style.transition = `stroke-dashoffset ease-in-out 0.5s `;
          this.refs.personalityLine.style.strokeDashoffset = `0`;
          this.refs.randomizeAvatar.classList.add(styles['animate-show']);
        }, 1000);
      }
      nextFakeAvatarId = currentFakeAvatarId === 4 ? 0 : currentFakeAvatarId + 1;
    } else if (special === 'empty') {
      for (let i = 0; i < 5; i++) {
        randomData[0].push(_.random(0, 75));
      }
    }
    this.setState({ data: randomData, score: randomScore, fakeAvatarId: nextFakeAvatarId });
  }

  renderLegends() {
    let talentsObj = _.keyBy(talents, 'key');
    let legendPositions = [[200, 30], [380, 150], [300, 350], [100, 350], [20, 150]];
    let legends = [];
    for (var i = 0; i < this.props.talents.length; i++) {
      legends.push({ position: legendPositions[i], title: talentsObj[this.props.talents[i]].abbreviation });
    }
    return (
      <g className={styles.legend}>
        {
          legends.map(legend => (
            <text key={legend.title} x={legend.position[0]} y={legend.position[1]}
                  textAnchor="middle">{legend.title}</text>
          ))
        }
      </g>
    );
  }

  renderUserPhoto() {
    if (this.isRandomize() && this.state.fakeAvatarId !== undefined) {
      if (!this.firstFakeAvatarShowed && this.state.fakeAvatarId === 1) this.firstFakeAvatarShowed = true;
      return (
        <div ref="randomizeAvatar"
             className={cn(styles['user-photo'], styles['randomize-photo'], { [styles['animate-reset']]: !this.firstFakeAvatarShowed })}
             style={{ backgroundImage: `url(${require(`../../../vendor/fake_avatars/avatar_${this.state.fakeAvatarId + 1}.jpg`)})` }}/>
      );
    } else if (this.props.score) {
      return (
        <div id="userPhoto" className={styles['user-photo']} style={{ backgroundImage: `url('${this.props.image}')` }}/>
      );
    } else {
      return (
        <div className={styles['user-photo']}>
          <ScoreRadial
            colorStart={'#0060ff'}
            colorEnd={'#0060ff'}
            contentType={'image'}
            content={this.props.image}
            maxValue={this.props.limit}
            value={this.props.data.length}
            strokeWidth={5}
            strokeDistance={0}
            progressStrokeWidth={5}/>
        </div>
      );
    }
  }

  isRandomize = ()=> {
    return this.props.special === 'randomize';
  };

  render() {
    return (
      <div className={styles.container}>
        {
          this.isRandomize() &&
          <svg className={styles['guide-box']} viewBox="0 0 400 400">
            <line className={styles['guide-line']} ref='personalityLine' x1="50%" y1="150" y2="47"/>
            <text className={styles['guide-text']} ref='personalityType' x="0" y="40">
              {personalityTypes[_.random(0, 13)].name}
            </text>
          </svg>
        }
        <svg id={styles.chart} viewBox="0 0 400 400">
          <defs>
            <linearGradient id="fgradient" x1="0" x2="1" y1="1" y2="0">
              <stop offset="0%" stopColor="#ffac52"/>
              <stop offset="100%" stopColor="#ff3c57"/>
            </linearGradient>
          </defs>
          {this.props.talents && !this.props.special && this.renderLegends() }
        </svg>
        {
          this.state.userPhotoLoadStatus || !this.props.image ?
            this.renderUserPhoto() : <div className={styles.loader}><Loader /></div>
        }

      </div>
    );
  }
}

RadarChart.propTypes = {
  data: PropTypes.array,
  image: PropTypes.string,
  limit: PropTypes.number,
  score: PropTypes.object,
  special: PropTypes.string,
  talents: PropTypes.array
};

RadarChart.defaultProps = {
  data: [],
  limit: 0
};

export default RadarChart;
