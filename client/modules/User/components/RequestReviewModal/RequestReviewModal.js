import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  _ from 'lodash';
import { validateEmail } from '../../../../util/textHelpers';

import { getCurrentUser } from '../../../App/AppReducer';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import EncounterItem from '../../components/EncounterItem/EncounterItem';

import callApi, { isLoggedIn } from '../../../../util/apiCaller';

import styles from './RequestReviewModal.scss';

class RequestReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      customEmails: '',
      encounters: []
    }
  }

  componentWillMount() {
    if (isLoggedIn() && this.props.currentUser) {
      callApi(`users/${this.props.currentUser.cuid}/encounters`).then(res => {
        this.setState({ encounters: res.encounters });
      });
    }
  }

  getCustomEmails = ()=> {

    if (this.state.customEmails.trim() === '') {
      return [];
    }
    return _.compact(this.state.customEmails.split(',').map(email => {
      email = email.trim();
      return validateEmail(email) ? email : '';
    }));
  };

  onSubmit = ()=> {
    let customEmails = this.getCustomEmails();
    let emails = [
      ...this.state.selected,
      ...customEmails
    ];
    callApi('evaluate/request', 'post', { emails }).then(res => {
      var full = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
      res.tokens.map(token => console.log(full + '/evaluate/' + token.token));
      let tokensEmails = res.tokens.map(token=>token.responderEmail)
      this.setState({
        selected: [],
        customEmails: '',
        encounters: _.filter(this.state.encounters, encounter => tokensEmails.indexOf(encounter.email) === -1)
      })
    })
  };

  onSelect = (email)=> {
    let selected = [...this.state.selected]
    let index = selected.indexOf(email)
    if (index > -1) {
      selected.splice(index, 1);
    } else if (selected.length < 5) {
      selected.push(email)
    }
    this.setState({ selected });
  };

  isValid = ()=> {
    return this.getCustomEmails().length > 0 || this.state.selected.length > 0
  };

  render() {
    return (
      <Modal handleClose={this.props.handleClose}>
        <div className={styles.title}>REQUEST A REVIEW</div>
        <div className={styles['list-title']}>Your recent encounters:</div>
        <div className={styles['encounters-container']}>
          <div className={styles.encounters}>
            {
              this.state.encounters.map(encounter => (
                  <EncounterItem key={encounter.email} {...encounter} onClick={this.onSelect.bind(this, encounter.email)}
                                 selected={this.state.selected.indexOf(encounter.email) > -1}/>
                )
              )
            }
          </div>
        </div>
        <div className={styles['actions']}>
          <div className={styles.customEmailsForm}>
            <input type="text" value={this.state.customEmails} placeholder="Not in the list? Enter emails here..."
                   className={styles['custom-emails-field']}
                   onChange={(e)=>this.setState({ customEmails: e.target.value })}/>
          </div>
          <div className={styles['button-wrapper']}>
            <Button onClick={this.onSubmit} rightIcon="bi_interface-arrow-right" disabled={!this.isValid()}>
              <span>SEND REQUEST TO <b>{this.state.selected.length + this.getCustomEmails().length}</b> PEOPLE</span>
            </Button></div>
        </div>
      </Modal>
    );
  }
}

RequestReviewModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  let currentUser = getCurrentUser(store);
  return {
    currentUser
  };
}

export default connect(mapStateToProps)(RequestReviewModal);
