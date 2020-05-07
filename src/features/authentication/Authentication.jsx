import React from 'react';
import ReactSelect from 'react-select';

import { Button, Error, Input, Modal, H1 } from '../../shared';
import Form from './styles';
import useAuthentication from './hooks';
import ROLES from './constants';

const Authentication = () => {
  const [
    selectedRole,
    onSubmit,
    handleSelectedRole,
    useFormProps,
    handleSelectBlur,
  ] = useAuthentication();
  const { errors, handleSubmit, register } = useFormProps;

  return (
    <Modal isActiveModal>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Item>
          <H1>Log in credit site system</H1>
        </Form.Item>
        <Form.Item>
          <Input name="login" placeholder="Login ..." register={register} />
          {errors.login?.message && <Error>{errors.login.message}</Error>}
        </Form.Item>
        <Form.Item>
          <Input type="password" name="password" placeholder="Password ..." register={register} />
          {errors.password?.message && <Error>{errors.password.message}</Error>}
        </Form.Item>
        <Form.Item>
          <ReactSelect
            value={selectedRole}
            options={ROLES}
            placeholder="Select Role ..."
            onBlur={handleSelectBlur}
            onChange={handleSelectedRole}
            name="selectedRole"
          />
          {errors.selectedRole?.value?.message && (
            <Error>{errors.selectedRole.value.message}</Error>
          )}
        </Form.Item>
        <Form.Item>
          <Button>Log In</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Authentication;
