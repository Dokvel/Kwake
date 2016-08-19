import React, { Component } from 'react';
import { signIn } from '../../modules/App/AppActions';

export default class GoogleButton extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.renderGoogleLoginButton.bind(this));
    if (window.gapi && gapi.signin2) {
      this.renderGoogleLoginButton()
    }
  }

  renderGoogleLoginButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email https://www.googleapis.com/auth/calendar.readonly',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'onsuccess': (googleUser) => {
        let profile = googleUser.getBasicProfile()
        console.log('Logged in as: ' + profile.getName());
        let user = {
          givenName: profile.getGivenName(),
          familyName: profile.getFamilyName(),
          googleId: profile.getId(),
          image: profile.getImageUrl(),
          email: profile.getEmail()
        }
        this.props.dispatch(signIn(user))
      },
      'onfailure': (error) => {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div>
        <div id="my-signin2"></div>
      </div>
    );
  }
}
