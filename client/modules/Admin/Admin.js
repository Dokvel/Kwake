import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import {} from '../../util/apiCaller';

// Import Actions
import {} from './AdminActions';
import callApi from '../../util/apiCaller';

// Import Selectors
import {} from './AdminReducer';

export class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return this.props.children;
  }
}

AdminApp.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

AdminApp.contextTypes = {
  router: React.PropTypes.object,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(AdminApp);
