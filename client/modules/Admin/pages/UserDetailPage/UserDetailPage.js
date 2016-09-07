import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

// Import Style
import styles from './UserDetailPage.scss';

// Import Actions
import { fetchUsers, fetchTokens } from '../../AdminActions';

// Import Selectors
import { getUser, getUserTokens, getUsers } from '../../AdminReducer';

export function UserDetailPage(props) {
  return (
    <div className={styles.container}>
      <Helmet title={`${props.user.givenName} ${props.user.familyName}`}/>
      <div>{props.user.givenName} {props.user.familyName}</div>
      <table className={styles.tokens}>
        <thead>
        <tr>
          <th>Type</th>
          <th>Token</th>
          <th>Responder Email</th>
          <th>Responder is New</th>
          <th>Responder is Created</th>
          <th>CreatedAt</th>
          <th>OpenedAt</th>
          <th>UsedAt</th>
          <th>Evaluate status</th>
        </tr>
        </thead>
        <tbody>
        {
          props.tokens.map(token => {
              let responder = props.users.filter(user => user.email === token.responderEmail)[0];
              return (
                <tr>
                  <td>{token.type}</td>
                  <td>{token.token}</td>
                  <td>{token.responderEmail}</td>
                  <td>{!token.responder ? 'New' : 'Exist'}</td>
                  <td>{responder ? responder.created_at : 'Not Exist'}</td>
                  <td>{token.created_at}</td>
                  <td>{token.openedAt}</td>
                  <td>{token.dateUsed}</td>
                  <td>{token.dateUsed ? 'Evaluate pass' : 'Evaluate not pass'}</td>
                </tr>
              );
            }
          )
        }
        </tbody>

      </table>
      <Link to='/admin/users/'>
        Back to users
      </Link>
    </div>
  );
}

UserDetailPage.need = [
  () => {
    return fetchUsers();
  },
  () => {
    return fetchTokens();
  }
];
// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    user: getUser(state, props.params.cuid),
    users: getUsers(state),
    tokens: getUserTokens(state, props.params.cuid)
  };
}

export default connect(mapStateToProps)(UserDetailPage);
