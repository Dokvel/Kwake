import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Base stylesheet
require('../stylesheets/static/layout.scss');
require('../stylesheets/static/tooltips.scss');
require('../vendor/fonts/iconfont/styles.css');

export class Base extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div className='main'>
        <Helmet
          title="ENQOUNTER"
          titleTemplate="%s - enQounter App"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
            {
              property: "og:title",
              content: `ENQOUNTER - enQounter App`
            }
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Base;
