import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Login from './Login';
import Passwords from './Passwords';
import { Button, Card, Input, ReactSelect } from '../../../shared';
import useProfile from '../hooks';
import TERRITORIES from '../../../constants';
import { managerValidation } from '../validations';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const Manager = () => {
  const { errors, handleSubmit, register, unregister, setValue, watch } = useForm({
    validationSchema: managerValidation,
  });
  const [, , saveData, selectedTerritory, changeSelectedTerritory] = useProfile();

  useEffect(() => {
    register({ name: 'selectedTerritory' });

    return () => {
      unregister('selectedTerritory');
    };
  });

  const handleSelectedTerritory = territory => {
    setValue('selectedTerritory', territory);
    changeSelectedTerritory(territory);
  };

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form noValidate>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="fullName">Full name</Card.Form.Label>
            <Input name="fullName" register={register} placeholder="Full name..." />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
            <ReactSelect
              value={selectedTerritory}
              onChange={handleSelectedTerritory}
              options={TERRITORIES}
              placeholder="Select Territory ..."
              styles={customReactSelectStyles}
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
            <Input register={register} type="phone" name="phone" placeholder="Phone..." />
          </Card.Form.Item>
          <Login name="login" register={register} />
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input register={register} type="email" name="email" placeholder="Email..." required />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveData)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
      <Passwords />
    </Card.List>
  );
};

export default Manager;
