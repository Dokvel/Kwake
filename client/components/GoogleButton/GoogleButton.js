import React, { Component } from 'react';
import { authenticated } from '../../modules/App/AppActions';
import Button from '../Button/Button';
import callApi from '../../util/apiCaller';

import { browserHistory } from 'react-router';
import { getFirstUserPageLink } from '../../util/generalHelpers';

import { gaLogUserRegistered } from '../../../utils/gaHelpers';

import Loader from '../Loader/Loader';

export default class GoogleButton extends Component {
  constructor(props) {
    super(props);
    this.state = { processing: false };
  }

  onGoogleSignIn() {
    if (window.auth2) {
      window.auth2.grantOfflineAccess({ 'redirect_uri': 'postmessage' }).then((authResult)=> {
        if (authResult['code']) {
          let isNewUser = false;
          let havePassedRequest = false;
          this.setState({ processing: true });
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
            this.props.onSuccessAuth && this.props.onSuccessAuth(userInfo.user);
            if (isNewUser) {
              gaLogUserRegistered(havePassedRequest);
            }
          }).catch(err => {
            this.setState({ processing: false });
          });
        } else {
          // There was an error.
        }
      })
    }
  }

  loggedBehavior = () => {
    browserHistory.push(getFirstUserPageLink(this.props.currentUser));
  };

  _renderLoader = () => {
    return (<Button color={Button.COLOR_TRANSPARENT} disabled={true}> <Loader/> </Button>)
  };

  _renderActionButton = ()=> {
    if (this.props.currentUser) {
      return (
        <Button onClick={this.props.onContinue || this.loggedBehavior}>
          {`Continue as ${this.props.currentUser.givenName} ${this.props.currentUser.familyName}`}
        </Button>
      )
    } else {
      return (
        <Button color={Button.COLOR_RED} onClick={this.onGoogleSignIn.bind(this)} rightIcon="icon-37-arrow">
          Log in with Google
        </Button>
      )
    }
  };

  render() {
    return (
      <div>
        {!this.state.processing ? this._renderActionButton() : this._renderLoader() }
      </div>
    );
  }
}
