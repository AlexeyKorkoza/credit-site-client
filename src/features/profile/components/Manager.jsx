import React from 'react';

import Login from './Login';
import Passwords from './Passwords';
import { Button, Card, Error, Input, ReactSelect } from '../../../shared';
import { useProfile } from '../hooks';
import TERRITORIES from '../../../constants';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const Manager = () => {
  const [saveData, selectedTerritory, changeSelectedTerritory, useFormProps] = useProfile();
  const { errors, handleSubmit, register } = useFormProps;

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="fullName">Full name</Card.Form.Label>
            <Input name="fullName" register={register} placeholder="Full name..." />
            {errors.fullName?.message && <Error>{errors.fullName.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
            <ReactSelect
              value={selectedTerritory}
              onChange={changeSelectedTerritory}
              options={TERRITORIES}
              placeholder="Select Territory ..."
              styles={customReactSelectStyles}
            />
            {errors.selectedTerritory?.value?.message && (
              <Error>{errors.selectedTerritory.value.message}</Error>
            )}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
            <Input register={register} type="phone" name="phone" placeholder="Phone..." />
            {errors.phone?.message && <Error>{errors.phone.message}</Error>}
          </Card.Form.Item>
          <Login name="login" register={register} />
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input register={register} type="email" name="email" placeholder="Email..." />
            {errors.email?.message && <Error>{errors.phone.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveData)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
      <Card.List.Item>
        <Passwords />
      </Card.List.Item>
    </Card.List>
  );
};

export default Manager;
