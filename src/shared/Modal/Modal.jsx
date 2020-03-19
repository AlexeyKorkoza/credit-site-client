import React from 'react';
import PropTypes from 'prop-types';

import Modal from './styles';

const component = (props) => {
  const { children, isActiveModal } = props;

  return (
    <Modal isActiveModal={isActiveModal}>
      <Modal.Container>
        {children}
      </Modal.Container>
    </Modal>
  );
};

component.defaultProps = {
  children: null,
  isActiveModal: false,
};

component.propTypes = {
  children: PropTypes.node,
  isActiveModal: PropTypes.bool,
};

export default component;
