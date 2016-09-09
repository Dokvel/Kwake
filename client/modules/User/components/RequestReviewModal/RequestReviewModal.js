import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  _ from 'lodash';
import { validateEmail } from '../../../../../utils/textHelpers';

import { getCurrentUser } from '../../../App/AppReducer';

import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import EncounterItem from '../../components/EncounterItem/EncounterItem';

import callApi, { isLoggedIn } from '../../../../util/apiCaller';

import styles from './RequestReviewModal.scss';
import cn from 'classnames';

import CustomScrollbar from '../../../../components/CustomScrollbar/CustomScrollbar';

class RequestReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      customEmails: '',
      encounters: [],
      search: ''
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
      let tokensEmails = res.tokens.map(token=>token.email)
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

  selectAll = ()=> {
    let selected = this.state.encounters.map(encounter => encounter.email);
    this.setState({ selected });
  };

  filterEncounter = () => {
    let search = this.state.search.trim();
    return search === '' ? this.state.encounters : _.toArray(_.pickBy(this.state.encounters, encounter => `${encounter.displayName}`.indexOf(search) > -1 || `${encounter.email}`.indexOf(search) > -1));
  }

  render() {
    let encounters = this.filterEncounter();
    return (
      <Modal handleClose={this.props.handleClose}>
        <div className={styles.title}>REQUEST A REVIEW</div>
        <div className={styles['list-title']}>
          Your recent encounters <span className={styles['select-all']} onClick={this.selectAll}>select all</span>
        </div>
        <div className={styles['encounters-container']}>
          <div className={styles.encounters}>
            <CustomScrollbar autoHeight={true} autoHeightMax={230}>
              {
                encounters.map(encounter => (
                    <EncounterItem key={encounter.email} {...encounter}
                                   onClick={this.onSelect.bind(this, encounter.email)}
                                   selected={this.state.selected.indexOf(encounter.email) > -1}/>
                  )
                )
              }
            </CustomScrollbar>
          </div>
        </div>
        <div className={styles['actions']}>
          <div className={styles.customEmailsForm}>
            <input type="text" value={this.state.customEmails} placeholder="Not in the list? Enter emails here..."
                   className={cn(styles['field'], styles['emails-field'])}
                   onChange={(e)=>this.setState({ customEmails: e.target.value })}/>
          </div>
          <div className={styles['button-wrapper']}>
            <Button onClick={this.onSubmit} rightIcon="icon-37-arrow" disabled={!this.isValid()}>
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
