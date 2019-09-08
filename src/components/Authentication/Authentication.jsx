import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

import { Button, Input, Modal, H1 } from '../../shared';

const Authentication = props => {
    const {
        isActiveModal,
        login,
        onInputChange,
        onSelectChange,
        onSubmit,
        password,
        roles,
        selectedRole,
        validator,
    } = props;

    return (
      <Modal isActiveModal={isActiveModal}>
        <Modal.Container>
          <Modal.Content>
            <Modal.Item>
              <H1>Log in credit site system</H1>
            </Modal.Item>
            <Modal.Item>
              <Input
                name="login"
                value={login}
                placeholder="Login ..."
                onChange={onInputChange}
                required
              />
              {validator.message('login', login, 'required')}
            </Modal.Item>
            <Modal.Item>
              <Input
                type="password"
                name="password"
                placeholder="Password ..."
                value={password}
                onChange={onInputChange}
                required
              />
              {validator.message('password', password, 'required|min:8')}
            </Modal.Item>
            <Modal.Item>
              <ReactSelect
                value={selectedRole}
                onChange={onSelectChange}
                options={roles}
                placeholder="Select Role ..."
              />
              {validator.message('role', selectedRole, 'required')}
            </Modal.Item>
            <Modal.Item>
              <Button onClick={onSubmit}>Log In</Button>
            </Modal.Item>
          </Modal.Content>
        </Modal.Container>
      </Modal>
    );
};

Authentication.defaultProps = {
    login: '',
    password: '',
    selectedRole: {},
    roles: [],
    isActiveModal: false,
    onInputChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSubmit: PropTypes.func,
    validator: PropTypes.shape(),
};

Authentication.propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    selectedRole: PropTypes.shape(),
    roles: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })
    ),
    isActiveModal: PropTypes.bool,
    onInputChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSubmit: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Authentication;
