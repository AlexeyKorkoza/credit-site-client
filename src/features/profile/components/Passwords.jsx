import React from 'react';

import { Button, Card, Error, Input } from '../../../shared';
import { usePasswords } from '../hooks';

const Passwords = () => {
  const [changePassword, useFormProps] = usePasswords();
  const { errors, handleSubmit, register } = useFormProps;

  return (
    <Card.List.Item>
      <Card.Form>
        <Card.List>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="oldPassword">Old Password</Card.Form.Label>
            <Input type="password" name="oldPassword" register={register} />
            {errors?.oldPassword?.message && <Error>{errors.oldPassword.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="newPassword">New Password</Card.Form.Label>
            <Input type="password" name="newPassword" register={register} />
            {errors?.newPassword?.message && <Error>{errors.newPassword.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="confirmNewPassword">Confirm New Password</Card.Form.Label>
            <Input type="password" name="confirmNewPassword" register={register} />
            {errors?.confirmNewPassword?.message && (
              <Error>{errors.confirmNewPassword.message}</Error>
            )}
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(changePassword)}>Change Password</Button>
          </Card.Form.Item>
        </Card.List>
      </Card.Form>
    </Card.List.Item>
  );
};

export default Passwords;
