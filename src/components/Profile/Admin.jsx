import React from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Passwords from './Passwords';
import {
    Button,
    Card,
} from '../../shared';

const Admin = props => {
    const {
        onSave,
        onChangeInput,
        onChangePassword,
        data: {
            login,
            oldPassword,
            newPassword,
            confirmNewPassword,
            isEmptyPasswordsFields,
            isEqualNewPasswords,
        },
        validatorProfile,
    } = props;

    if (!validatorProfile.allValid()) {
        validatorProfile.showMessages();
    }

    return (
      <Card.List>
        <Card.List.Item>
          <Card.Form noValidate>
            <Card.List>
              <Login
                login={login}
                onChangeInput={onChangeInput}
                validatorProfile={validatorProfile}
              />
              <Card.Form.Item>
                <Button onClick={onSave}>Save</Button>
              </Card.Form.Item>
            </Card.List>
          </Card.Form>
        </Card.List.Item>
        <Passwords
          onChangeInput={onChangeInput}
          onChangePassword={onChangePassword}
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          isEmptyPasswordsFields={isEmptyPasswordsFields}
          isEqualNewPasswords={isEqualNewPasswords}
        />
      </Card.List>
    );
};

Admin.defaultProps = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    data: PropTypes.shape({
        login: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
};

Admin.propTypes = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    data: PropTypes.shape({
        login: PropTypes.string,
        oldPassword: PropTypes.string,
        newPassword: PropTypes.string,
        confirmNewPassword: PropTypes.string,
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
};

export default Admin;
