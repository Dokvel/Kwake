import React, { Component } from 'react';
import { googleSignIn } from '../../modules/App/AppActions';
import googleCreds from '../../../data/google_creds.json';
import Button from '../Button/Button';

import { getAuthenticationToken } from '../../util/apiCaller';

export default class GoogleButton extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.initGoogleAuth2.bind(this));
    if (window.gapi) {
      this.initGoogleAuth2()
    }
  }

  initGoogleAuth2() {
    window.gapi.load('auth2', () => {
      window.auth2 = gapi.auth2.init({
        client_id: googleCreds.client_id,
        scope: 'profile email https://www.googleapis.com/auth/calendar.readonly'
      });
    });
  }

  onGoogleSignIn() {
    window.auth2.grantOfflineAccess({ 'redirect_uri': 'postmessage' }).then((authResult)=> {
      if (authResult['code']) {
        this.props.dispatch(googleSignIn(authResult['code']))
      } else {
        // There was an error.
      }
    });
  }

  render() {
    return (
      <div>
        <Button color={Button.COLOR_RED}
                onClick={this.onGoogleSignIn.bind(this)}
                rightIcon="bi_interface-arrow-right"
                leftIcon=" bi_logo-picasa">
          Sign in with Google
        </Button>
      </div>
    );
  }
}
