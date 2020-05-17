import React from 'react';

import { Button, Card, Error, Input, ReactSelect } from '../../../shared';
import { Login, Passwords } from '../../profile';
import TERRITORIES from '../../../constants';
import { useManagersEditor } from '../hooks';
import BlockManager from './BlockManager';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const Editor = () => {
  const [
    action,
    selectedTerritory,
    saveManager,
    useFormProps,
    handleSelectedTerritory,
  ] = useManagersEditor();
  const { getValues, errors, handleSubmit, register } = useFormProps;
  const { isBlocked } = getValues();
  console.log(getValues());

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="fullName">Full name</Card.Form.Label>
            <Input name="fullName" placeholder="Full name..." register={register} />
            {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
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
            <Input type="phone" name="phone" placeholder="Phone..." register={register} />
            {errors?.phone?.message && <Error>{errors.phone.message}</Error>}
          </Card.Form.Item>
          <Login name="login" register={register} />
          {action === 'add' && (
            <>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="password">Password</Card.Form.Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password ..."
                  register={register}
                />
              </Card.Form.Item>
              {errors?.password?.message && <Error>{errors.password.message}</Error>}
            </>
          )}
          <Card.Form.Item>
            <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
            <Input type="email" name="email" register={register} placeholder="Email..." />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveManager)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
      {action === 'edit' && <Passwords />}
      {action === 'edit' && (
        <Card.List.Item>
          <BlockManager name="isBlocked" register={register} isBlocked={isBlocked} />
        </Card.List.Item>
      )}
    </Card.List>
  );
};

export default Editor;
