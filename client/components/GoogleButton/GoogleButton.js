import React, { Component } from 'react';
import { authenticated } from '../../modules/App/AppActions';
import Button from '../Button/Button';
import callApi from '../../util/apiCaller';

export default class GoogleButton extends Component {

  onGoogleSignIn() {
    if (window.auth2) {
      window.auth2.grantOfflineAccess({ 'redirect_uri': 'postmessage' }).then((authResult)=> {
        if (authResult['code']) {
          callApi('auth/google/callback', 'post', { code: authResult['code'] })
            .then(res => {
              if (res.authenticationToken) {
                localStorage.setItem('authentication_token', res.authenticationToken);
                return callApi('users/me', 'get');
              }
            }).then(userInfo => {
            this.props.dispatch(authenticated(userInfo.user));
          });
        } else {
          // There was an error.
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Button color={Button.COLOR_RED}
                onClick={this.onGoogleSignIn.bind(this)}
                rightIcon="bi_interface-arrow-right">
          Sign in with Google
        </Button>
      </div>
    );
  }
}
