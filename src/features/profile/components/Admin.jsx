import React from 'react';
import { useForm } from 'react-hook-form';

import Login from './Login';
import Passwords from './Passwords';
import { Button, Card } from '../../../shared';
import useProfile from '../hooks';
import { adminValidation } from '../validations';

const Admin = () => {
  const [,, , saveData] = useProfile();
  const {
    errors, handleSubmit, register, unregister, setValue, watch,
  } = useForm({
    validationSchema: adminValidation,
  });

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form noValidate>
          <Card.List>
            <Login
              register={register}
              name="login"
            />
            <Card.Form.Item>
              <Button onClick={handleSubmit(saveData)}>Save</Button>
            </Card.Form.Item>
          </Card.List>
        </Card.Form>
      </Card.List.Item>
      <Passwords />
    </Card.List>
  );
};

export default Admin;
