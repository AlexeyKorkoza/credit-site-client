import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Card, Input, ReactSelect } from '../../../shared';
import { UserContext } from '../../../core';
import { useClientEditor } from '../hooks';
import TERRITORIES from '../../../constants';
import DeletionClient from './deletionClient';
import { clientSchema } from '../validation';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 128,
  }),
};

const Editor = () => {
  const context = useContext(UserContext);
  const { role } = context;
  const [
    clientData,
    selectedTerritory,
    changeSelectedTerritory,
    deleteClient,
    ,
    saveClient,
  ] = useClientEditor();
  const { action, isRemoved } = clientData;
  const { handleSubmit, errors, register, setValue, unregister } = useForm({
    validationSchema: clientSchema,
  });

  const handleSelectedTerritory = territory => {
    setValue(territory);
    changeSelectedTerritory(territory);
  };

  useEffect(() => {
    register({ name: 'selectedTerritory' });

    return () => {
      unregister('selectedTerritory');
    };
  }, [register, unregister]);

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="name">Name</Card.Form.Label>
            <Input name="name" placeholder="Name..." register={register} />
          </Card.Form.Item>
          {((role === 'admin' && action === 'edit') ||
            (role === 'manager' && action === 'add')) && (
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
          )}
          <Card.Form.Item>
            <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
            <Input type="phone" name="phone" placeholder="Phone..." register={register} />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input type="email" name="email" placeholder="Email..." register={register} />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="passportData">Passport Data</Card.Form.Label>
            <Input name="passportData" placeholder="Passport Data..." register={register} />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveClient)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
        <DeletionClient action={action} isRemoved={isRemoved} />
        {role === 'admin' && isRemoved && (
          <Card.Form>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="isRemoved">Client for deletion</Card.Form.Label>
              <Button onClick={deleteClient}>Delete</Button>
            </Card.Form.Item>
          </Card.Form>
        )}
      </Card.List.Item>
    </Card.List>
  );
};

export default Editor;
