import React, { PropTypes, Component } from 'react';

import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import styles from './Modal.scss';

class Modal extends Component {
  render() {
    return (
      <ModalContainer backgroundColor="#000000" onClose={this.props.handleClose}>
        <ModalDialog className={styles.dialog.toString()}>
          {this.props.children}
        </ModalDialog>
      </ModalContainer>
    );
  }
}

export default Modal;
