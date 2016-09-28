import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Import Styles
import styles from './AdminLoginPage.scss';

import { callAdminApi } from '../../../../util/apiCaller';

export class AdminLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: {} };
  }

  onFormUpdate = (e) => {
    this.setState({ credentials: { ...this.state.credentials, [e.target.name]: e.target.value } });
  };

  onSend = (e)=> {
    e.preventDefault();
    callAdminApi('login', 'post', { ...this.state.credentials })
      .then(res => {
        browserHistory.push('/admin/users');
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <div className={styles.container}>
        {process.env.NODE_ENV}
        <form className={styles.form} onSubmit={this.onSend}>
          <span>Username</span>
          <input value={this.state.credentials.username} type="text" name="username"
                 ref="username"
                 onChange={this.onFormUpdate}/>
          <span>Password</span>
          <input value={this.state.credentials.password} type="password" name="password" ref="password"
                 onChange={this.onFormUpdate}/>
          <input type="submit" value="Login"/>
        </form>

      </div>
    );
  }
}

AdminLoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(AdminLoginPage);
