import React from 'react';
import PropTypes from 'prop-types';

import { Card, Input } from '../../../shared';

const Login = props => {
  const { name, register } = props;

  return (
    <Card.Form.Item>
      <Card.Form.Label htmlFor="login">Login</Card.Form.Label>
      <Input name={name} register={register} placeholder="Login..." />
    </Card.Form.Item>
  );
};

Login.defaultProps = {
  name: '',
  register: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

Login.propTypes = {
  name: PropTypes.string,
  register: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

export default Login;
