import React from 'react';
import PropTypes from 'prop-types';

import { Card, Input } from '../../shared';

const Login = props => {
    const {
        login,
        onChangeInput,
        validatorProfile,
    } = props;

    return (
      <Card.Form.Item>
        <Card.Form.Label htmlFor="login">Login</Card.Form.Label>
        <Input
          name="login"
          value={login}
          onChange={onChangeInput}
          placeholder='Login...'
          required
        />
        {validatorProfile.message('login', login, 'required')}
      </Card.Form.Item>
    )
};

Login.defaultProps = {
    login: '',
    onChangeInput: PropTypes.func,
    validatorProfile: PropTypes.shape(),
};

Login.propTypes = {
    login: PropTypes.string,
    onChangeInput: PropTypes.func,
    validatorProfile: PropTypes.shape(),
};

export default Login;
