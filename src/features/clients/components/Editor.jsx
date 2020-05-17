import React from 'react';

import { Button, Card, Error, Input, ReactSelect } from '../../../shared';
import { useClientEditor } from '../hooks';
import TERRITORIES from '../../../constants';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 128,
  }),
};

const Editor = () => {
  const [
    action,
    role,
    selectedTerritory,
    changeSelectedTerritory,
    deleteClient,
    markClientForDeletion,
    saveClient,
    formProps,
  ] = useClientEditor();
  const { getValues, handleSubmit, errors, register, watch } = formProps;
  const isRemoved = watch('isRemoved');

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="name">Name</Card.Form.Label>
            <Input name="name" placeholder="Name..." register={register} />
            {errors?.name?.message && <Error>{errors.name.message}</Error>}
          </Card.Form.Item>
          {((role === 'admin' && action === 'edit') ||
            (role === 'manager' && action === 'add')) && (
            <Card.Form.Item>
              <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
              <ReactSelect
                value={selectedTerritory}
                onChange={changeSelectedTerritory}
                options={TERRITORIES}
                placeholder="Select Territory ..."
                styles={customReactSelectStyles}
              />
            </Card.Form.Item>
          )}
          <Card.Form.Item>
            <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
            <Input type="phone" name="phone" placeholder="Phone..." register={register} />
            {errors?.phone?.message && <Error>{errors.phone.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input type="email" name="email" placeholder="Email..." register={register} />
            {errors?.email?.message && <Error>{errors.email.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="passportData">Passport Data</Card.Form.Label>
            <Input name="passportData" placeholder="Passport Data..." register={register} />
            {errors?.passportData?.message && <Error>{errors.passportData.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveClient)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
        {role === 'manager' && action === 'edit' && (
          <Card.Form.Item>
            <Card.Form>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="isRemoved">Mark the client for deletion</Card.Form.Label>
                <Input type="checkbox" name="isRemoved" checked={isRemoved} register={register} />
              </Card.Form.Item>
              <Card.Form.Item>
                <Button onClick={handleSubmit(markClientForDeletion)}>Mark</Button>
              </Card.Form.Item>
            </Card.Form>
          </Card.Form.Item>
        )}
        {role === 'admin' && isRemoved && (
          <Card.Form.Item>
            <Card.Form>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="isRemoved">Client for deletion</Card.Form.Label>
                <Input type="hidden" name="isRemoved" register={register} />
                <Button onClick={handleSubmit(deleteClient)}>Delete</Button>
              </Card.Form.Item>
            </Card.Form>
          </Card.Form.Item>
        )}
      </Card.List.Item>
    </Card.List>
  );
};

export default Editor;
