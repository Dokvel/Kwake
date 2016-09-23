import React, { Component } from 'react';
import Helmet from 'react-helmet';
import FlashMessage from './modules/App/components/FlashMessage/FlashMessage';
import { connect } from 'react-redux';

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
        { typeof window !== 'undefined' && window.flashMessage &&
        <FlashMessage message={window.flashMessage.text} title={window.flashMessage.title}/>
        }
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { flashMessageId: store.app.flashMessageId };
}

export default connect(mapStateToProps)(Base);

