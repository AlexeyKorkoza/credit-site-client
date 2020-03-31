import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button, Card, Input, ReactSelect,
} from '../../../shared';
import { Login, Passwords } from '../../profile/components';
import TERRITORIES from '../../../constants';
import { useManagersEditor } from '../hooks';
import BlockManager from './BlockManager';
import { managerSchema } from '../validation';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const Editor = () => {
  const [managerData, selectedTerritory, updateSelectedTerritory, , saveManager] = useManagersEditor();
  const [handleSubmit, setValue, register, unregister, watch] = useForm({
    defaultValues: {
      ...managerData,
    },
    validationSchema: managerSchema,
  });

  useEffect(() => {
    register({ name: 'selectedTerritory' });

    return () => {
      unregister('selectedTerritory');
    };
  }, [register]);

  const handleSelectedTerritory = (territory) => {
    setValue('selectedTerritory', territory);
    updateSelectedTerritory(territory);
  };

  const action = watch('action');
  const isBlocked = watch('isBlocked');

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="fullName">Full name</Card.Form.Label>
            <Input
              name="fullName"
              placeholder="Full name..."
              register={register}
            />
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
            <Input
              type="phone"
              name="phone"
              placeholder="Phone..."
              register={register}
            />
          </Card.Form.Item>
          <Login name="login" register={register} />
          {action === 'add' && (
            <Card.Form.Item>
              <Card.Form.Label htmlFor="password">Password</Card.Form.Label>
              <Input
                type="password"
                name="password"
                placeholder="Password ..."
                register={register}
              />
            </Card.Form.Item>
          )}
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input
              type="email"
              name="email"
              register={register}
              placeholder="Email..."
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveManager)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
      {action === 'edit' && (
        <Passwords />
      )}
      <Card.List.Item>
        <BlockManager isBlocked={isBlocked} />
      </Card.List.Item>
    </Card.List>
  );
};

export default Editor;
