import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './ScoreRadial.scss';

class ScoreRadial extends Component {
  constructor(props) {
    super(props);
    this.state = { d: undefined };
  }

  componentDidMount() {
    this.renderProgressBar(this.props.maxValue, this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.renderProgressBar(nextProps.maxValue, nextProps.value);
  }

  renderProgressBar(maxValue, value) {
    let angle = (value * 359.99) / maxValue;
    this.setState({ d: this.describeArc(40, 40, 37.5, 0, angle) });
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    let start = this.polarToCartesian(x, y, radius, endAngle);
    let end = this.polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    let d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  render() {
    let linearGradient0Styles = {
      stopColor: this.props.colorEnd,
      stopOpacity: 1
    };

    let linearGradient100Styles = {
      stopColor: this.props.colorStart,
      stopOpacity: 1
    };

    return (
      <svg viewBox="0 0 80 80">
        <defs>
          <linearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" >
            <stop style={linearGradient0Styles} />
            <stop offset="100%" style={linearGradient100Styles} />
          </linearGradient>
          {
            this.props.contentType === 'image' && this.props.content
            ?
            <pattern id="img" width="100" height="100" patternUnits="userSpaceOnUse">
              <image xlinkHref={this.props.content} width="80" height="80" x="0" y="0" />
            </pattern>
            :
            null
          }
        </defs>
        {
          this.props.contentType === 'image' && this.props.content
          ?
          <circle cx="40" cy="40" r={37.5 + this.props.strokeDistance} fill="url(#img)" stroke="#434448" strokeWidth={this.props.strokeWidth} />
          :
          null
        }
        {
          this.props.contentType === 'text' && this.props.content
          ?
          <g>
            <circle cx="40" cy="40" r={37.5 + this.props.strokeDistance} fill="none" stroke="#434448" strokeWidth={this.props.strokeWidth} />
            <text id={styles.value} x="40" y="48" textAnchor="middle">{this.props.content}</text>
          </g>
          :
          null
        }
        <path d={this.state.d} fill="none" stroke="url(#lgrad)" strokeWidth={this.props.progressStrokeWidth} />
      </svg>
    );
  }
}

// example
//
// <ScoreRadial
//   contentType={'text'}
//   content={'3'}
//   maxValue={5}
//   value={3}
//   strokeWidth={1}
//   strokeDistance={2}
//   progressStrokeWidth={5} />

ScoreRadial.propTypes = {
  // set colorStart and colorEnd with same color for no gradient
  colorStart: PropTypes.string.isRequired, // linearGradient start color
  colorEnd: PropTypes.string.isRequired, // linearGradient end color
  contentType: PropTypes.string.isRequired, // type of components content
  maxValue: PropTypes.number.isRequired, // max value for progress bar
  value: PropTypes.number.isRequired, // actual value for progress bar
  strokeWidth: PropTypes.number.isRequired, // width of circle's stroke
  strokeDistance: PropTypes.number.isRequired, // distance of circle's stroke. Set '2' for ideal out
  progressStrokeWidth: PropTypes.number.isRequired // width of progress bar's path
};

ScoreRadial.defaultProps = {
  colorStart: 'black',
  colorEnd: 'black',
  contentType: 'text',
  content: '',
  maxValue: 5,
  value: 0,
  strokeWidth: 1,
  strokeDistance: 0,
  progressStrokeWidth: 5
};

export default ScoreRadial;
