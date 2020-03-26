import React, { useEffect } from 'react';
import ReactSelect from 'react-select';
import { useForm } from 'react-hook-form';

import {
  Button, Input, Modal, H1,
} from '../../shared';
import Form from './styles';
import useAuthentication from './hooks';
import authenticationScheme from './validation';

const ROLES = [
  {
    label: 'admin',
    value: 'admin',
  },
  {
    label: 'manager',
    value: 'manager',
  },
];

const Authentication = () => {
  const { errors, handleSubmit, register, unregister, setValue, watch } = useForm();
  const [selectedRole, onSubmit, setSelectedRole] = useAuthentication();

  useEffect(() => {
    register({ name: 'selectedRole' });

    return () => {
      unregister('selectedRole');
    };
  });

  const handleSelectedRole = (role) => {
    setValue('selectedRole', role);
    setSelectedRole(role);
  };

  return (
    <Modal isActiveModal>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item>
          <H1>Log in credit site system</H1>
        </Form.Item>
        <Form.Item>
          <Input
            name="login"
            placeholder="Login ..."
            register={register}
          />
          {errors.login && <p>Please, enter your login</p>}
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            name="password"
            placeholder="Password ..."
            register={register}
          />
          {errors.password && <p>Please, enter your password</p>}
        </Form.Item>
        <Form.Item>
          <ReactSelect
            value={selectedRole}
            options={ROLES}
            placeholder="Select Role ..."
            onChange={handleSelectedRole}
          />
          {errors.selectedRole && <p>Please, select your role</p>}
        </Form.Item>
        <Form.Item>
          <Button>Log In</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Authentication;
