import React from 'react';
import { useHistory } from 'react-router';

import { Button, Card, Input, ReactSelect } from '../../../../shared';
import { useFirstStep } from '../../hooks';
import TERRITORIES from '../../../../constants';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 128,
  }),
};

const Step1 = () => {
  const history = useHistory();
  const [
    handleCreatingClientCard,
    formProps,
    selectedTerritory,
    modifySelectedTerritory,
  ] = useFirstStep();
  const { errors, handleSubmit, register } = formProps;

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="fullName">Full Name</Card.Form.Label>
            <Input name="fullName" placeholder="Full Name..." register={register} />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
            <ReactSelect
              value={selectedTerritory}
              onChange={modifySelectedTerritory}
              options={TERRITORIES}
              placeholder="Select Territory ..."
              styles={customReactSelectStyles}
            />
          </Card.Form.Item>
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
            <Card.Form.Label htmlFor="surchargeFactor">Surcharge Factor</Card.Form.Label>
            <Input
              type="number"
              name="surchargeFactor"
              placeholder="Surcharge Factor..."
              register={register}
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={() => history.goBack()}>Back</Button>
            <Button onClick={handleSubmit(handleCreatingClientCard)}>Issue a loan</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
    </Card.List>
  );
};

export default Step1;
