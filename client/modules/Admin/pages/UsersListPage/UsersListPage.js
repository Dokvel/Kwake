import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Import Components
import UserListItem from '../../components/UserListItem/UserListItem';
// Import Actions
import { fetchUsers, fetchTokens } from '../../AdminActions';
import { Link } from 'react-router';

// Import Selectors
import { getUsers } from '../../AdminReducer';

// Import Styles
import styles from './UsersListPage.scss';

class UsersListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchTokens());
  }

  filter = (users, name = '') => {
    name = name.trim();
    return name === '' ? users : _.toArray(_.pickBy(users, value => `${value.givenName} ${value.familyName}`.indexOf(name) > -1));
  };

  onSearch = (e)=> {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    let filteredUsers = this.filter(this.props.users, this.state.searchQuery);

    return (
      <div className={styles.users}>
        <input type="text" ref="search" value={this.state.searchQuery} onChange={this.onSearch}
               className={styles.search}/>
        {
          filteredUsers.map(user => (
            <div className={styles.user} key={user.cuid}>
              <Link to={`/admin/users/${user.cuid}`}>
                <UserListItem user={user} key={user.cuid}/>
              </Link>
            </div>
          ))
        }
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UsersListPage.need = [
  () => {
    return fetchUsers();
  },
  () => {
    return fetchTokens();
  }
];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
  };
}

UsersListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UsersListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UsersListPage);
