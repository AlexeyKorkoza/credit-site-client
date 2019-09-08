import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Input,
} from '../../shared';

const Passwords = props => {
    const {
        onChangeInput,
        onChangePassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
    } = props;

    return (
      <Card.List.Item>
        <Card.Form>
          <Card.List>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="oldPassword">Old Password</Card.Form.Label>
              <Input
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={onChangeInput}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="newPassword">New Password</Card.Form.Label>
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={onChangeInput}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="confirmNewPassword">Confirm New Password</Card.Form.Label>
              <Input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={onChangeInput}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Button onClick={onChangePassword}>Change Password</Button>
            </Card.Form.Item>
          </Card.List>
        </Card.Form>
      </Card.List.Item>
    );
};

Passwords.defaultProps = {
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

Passwords.propTypes = {
    onChangeInput: PropTypes.func,
    onChangePassword: PropTypes.func,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmNewPassword: PropTypes.string,
};

export default Passwords;
