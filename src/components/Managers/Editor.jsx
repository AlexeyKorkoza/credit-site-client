import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Input,
    ReactSelect,
} from '../../shared';
import { Login, Passwords } from '../Profile';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 129,
    }),
};

const Editor = props => {
    const {
        onSave,
        onBlockManager,
        onChangeInput,
        onChangePassword,
        onChangeTerritory,
        data: {
            action,
            login,
            fullName,
            phone,
            email,
            isBlocked,
            password,
            oldPassword,
            newPassword,
            confirmNewPassword,
            territories,
            selectedTerritory,
            isEmptyPasswordsFields,
            isEqualNewPasswords,
        },
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
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
            {validator.message('fullName', fullName, 'required')}
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
            {validator.message('territory', selectedTerritory, 'required')}
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
            {validator.message('phone', phone, 'required')}
            <Login
              login={login}
              onChangeInput={onChangeInput}
              validatorProfile={validator}
            />
            {action === 'add' && (
              <Card.Form.Item>
                <Card.Form.Label htmlFor="password">Password</Card.Form.Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password ..."
                  value={password}
                  onChange={onChangeInput}
                  required
                />
              </Card.Form.Item>
            )}
            {action === 'add' && validator.message('password', password, 'required|min:8')}
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
            {validator.message('email', email, 'required|email')}
            <Card.Form.Item>
              <Button onClick={onSave}>Save</Button>
            </Card.Form.Item>
          </Card.Form>
        </Card.List.Item>
        {action === 'edit' && (
          <Passwords
            onChangeInput={onChangeInput}
            onChangePassword={onChangePassword}
            oldPassword={oldPassword}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            isEmptyPasswordsFields={isEmptyPasswordsFields}
            isEqualNewPasswords={isEqualNewPasswords}
          />
        )}
        <Card.List.Item>
          <Card.Form noValidate>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="isBlocked">Is Blocked</Card.Form.Label>
              <Input
                type='checkbox'
                name='isBlocked'
                onChange={onChangeInput}
                checked={isBlocked}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Button onClick={onBlockManager}>Block</Button>
            </Card.Form.Item>
          </Card.Form>
        </Card.List.Item>
      </Card.List>
    );
};

Editor.defaultProps = {
    onSave: PropTypes.func,
    onBlockManager: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        action: '',
        login: '',
        fullName: '',
        phone: '',
        email: '',
        isBlocked: null,
        password: '',
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
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    onSave: PropTypes.func,
    onBlockManager: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    data: PropTypes.shape({
        action: PropTypes.string,
        login: PropTypes.string,
        fullName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        isBlocked: PropTypes.bool,
        password: PropTypes.string,
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
    validator: PropTypes.shape(),
};

export default Editor;
