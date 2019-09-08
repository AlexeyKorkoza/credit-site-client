import React from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Passwords from './Passwords';
import {
    Button,
    Card,
    Input,
    ReactSelect,
} from '../../shared';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 129,
    }),
};

const Manager = props => {
    const {
        onSave,
        onChangeInput,
        onChangePassword,
        onChangeTerritory,
        data: {
            login,
            fullName,
            phone,
            email,
            oldPassword,
            newPassword,
            confirmNewPassword,
            territories,
            selectedTerritory,
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
            <Card.Form.Item>
              <Card.Form.Label htmlFor="fullName">Full name</Card.Form.Label>
              <Input
                name='fullName'
                placeholder='Full name...'
                onChange={onChangeInput}
                value={fullName}
                required
              />
            </Card.Form.Item>
            {validatorProfile.message('fullName', fullName, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
              <ReactSelect
                value={selectedTerritory}
                onChange={onChangeTerritory}
                options={territories}
                placeholder="Select Territory ..."
                styles={customReactSelectStyles}
              />
            </Card.Form.Item>
            {validatorProfile.message('territory', selectedTerritory, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
              <Input
                type="phone"
                name='phone'
                placeholder='Phone...'
                onChange={onChangeInput}
                value={phone}
                required
              />
            </Card.Form.Item>
            {validatorProfile.message('phone', phone, 'required')}
            <Login
              login={login}
              onChangeInput={onChangeInput}
              validatorProfile={validatorProfile}
            />
            <Card.Form.Item>
              <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                placeholder='Email...'
                required
              />
            </Card.Form.Item>
            {validatorProfile.message('email', email, 'required')}
            <Card.Form.Item>
              <Button onClick={onSave}>Save</Button>
            </Card.Form.Item>
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

Manager.defaultProps = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        login: '',
        fullName: '',
        phone: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
};

Manager.propTypes = {
    onSave: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        login: PropTypes.string,
        fullName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        oldPassword: PropTypes.string,
        newPassword: PropTypes.string,
        confirmNewPassword: PropTypes.string,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        isEmptyPasswordsFields: PropTypes.bool,
        isEqualNewPasswords: PropTypes.bool,
    }),
    validatorProfile: PropTypes.shape(),
};

export default Manager;
