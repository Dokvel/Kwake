import React, { Component } from 'react';

// Import Style
import styles from './ScoreRadial.scss';

// Usage
//
// props:
//
// image - set for background image (color props don't needed)
// colorStart - linearGradient start color
// colorEnd - linearGradient end color
// maxValue - max value for progress bar
// value - actual value for progress bar
//
// set size via css width/height in parent component

export default class ScoreRadial extends Component {
  componentDidMount() {
    let angle = (this.props.value * 359.99) / this.props.maxValue;
    document.getElementById("progress").setAttribute("d", this.describeArc(40, 40, 37.5, 0, angle));
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
          <pattern id="img" width="80" height="80" patternUnits="userSpaceOnUse">
            <image xlinkHref={this.props.image} width="70" height="70" x="5" y="5" />
          </pattern>
        </defs>
        { this.props.image
          ?
          <circle cx="40" cy="40" r="37.5" fill="url(#img)" stroke="#434448" strokeWidth="5" />
          :
          <g>
            <circle cx="40" cy="40" r="39" fill="none" stroke="#434448" strokeWidth="2" />
            <text id={styles.value} x="40" y="48" textAnchor="middle">{this.props.value}</text>
          </g>
        }
        <path id="progress" fill="none" stroke={ this.props.image ? "#0060ff" : "url(#lgrad)" } strokeWidth="5" />
      </svg>
    );
  }
}
