import React from 'react';

import Login from './Login';
import Passwords from './Passwords';
import { Button, Error, Card } from '../../../shared';
import useProfile from '../hooks';

const Admin = () => {
  const [,saveData, , ,useFormProps] = useProfile();
  const {
    errors, handleSubmit, register,
  } = useFormProps;

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.List>
            <Login
              register={register}
              name="login"
            />
            {errors?.login?.message && <Error>{errors.login.message}</Error>}
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
