import React, { Component } from 'react';
import { signOut } from '../../../../util/google-api'
import styles from './GoogleButton.css';
import cn from 'classnames'
import { signIn, notAuthenticated } from '../../AppActions';

export default class GoogleButton extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.renderGoogleLoginButton.bind(this));
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

  clickSignOut() {
    signOut(() => {
      console.log('User signed out.');
      this.props.dispatch(notAuthenticated())
    })
  }

  render() {
    let classes = cn({ [styles.gb_authenticated]: this.props.currentUser })
    return (
      <div>
        {this.props.currentUser &&
        <div>
          Logged in as {this.props.currentUser.givenName} {this.props.currentUser.familyName}
          ({this.props.currentUser.email})
          <a href="#" onClick={this.clickSignOut.bind(this)}>Sign out</a>
        </div>}
        <div className={classes} id="my-signin2"></div>
      </div>
    );
  }
}
