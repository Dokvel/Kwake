import React, { Component } from 'react';
import { authenticated } from '../../modules/App/AppActions';
import Button from '../Button/Button';
import callApi from '../../util/apiCaller';

import { gaLogUserRegistered } from '../../../utils/gaHelpers';

import Loader from '../Loader/Loader';

export default class GoogleButton extends Component {
  constructor(props) {
    super(props);
    this.state = { processing: false };
  }

  onGoogleSignIn() {
    if (window.auth2) {
      this.setState({ processing: true });
      window.auth2.grantOfflineAccess({ 'redirect_uri': 'postmessage' }).then((authResult)=> {
        if (authResult['code']) {
          let isNewUser = false;
          let havePassedRequest = false;
          callApi('auth/google/callback', 'post', { code: authResult['code'] })
            .then(res => {
              if (res.authenticationToken) {
                isNewUser = res.isNewUser;
                havePassedRequest = res.havePassedRequest;
                localStorage.setItem('authentication_token', res.authenticationToken);
                return callApi('users/me', 'get');
              }
            }).then(userInfo => {
            this.props.dispatch(authenticated(userInfo.user));
            this.props.onSuccess && this.props.onSuccess(userInfo.user);
            if (isNewUser) {
              gaLogUserRegistered(havePassedRequest);
            }
          });
        } else {
          this.setState({ processing: false });
          // There was an error.
        }
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.processing ?
          <Button color={Button.COLOR_RED}
                  onClick={this.onGoogleSignIn.bind(this)}
                  rightIcon="icon-37-arrow">
            Log in with Google </Button> : <Button color={Button.COLOR_TRANSPARENT} disabled={true}> <Loader/> </Button>
        }
      </div>
    );
  }
}
