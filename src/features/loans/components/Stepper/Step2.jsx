import React from 'react';

import LoansTable from '../Table';
import { Button, Card, DatePicker, Error, H1, Input, ReactSelect } from '../../../../shared';
import TERRITORIES from '../../../../constants';
import { useSecondStep } from '../../hooks';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const outputProperties = ['dateMaturity'];

const Step2 = () => {
  const {
    dates,
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
    formProps,
    loans,
    selectedTerritory,
    role,
  } = useSecondStep();

  const { errors, handleSubmit, register } = formProps;

  return (
    <div>
      <H1 color="#3f4357">All the loans of the user</H1>
      <LoansTable loans={loans} outputProperties={outputProperties} role={role} />
      <Card.List>
        <Card.List.Item>
          <Card.Form>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
              <Input name="amount" placeholder="Amount ..." register={register} disabled />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
              <ReactSelect
                defaultValue={selectedTerritory}
                options={TERRITORIES}
                placeholder="Select Territory ..."
                isDisabled
                styles={customReactSelectStyles}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="dateIssue">Date Issue</Card.Form.Label>
              <DatePicker
                selected={dates.dateIssue}
                minDate={new Date()}
                dateFormat="dd.MM.yyyy"
                onChange={changeDateIssue}
              />
              {errors.dateIssue?.message && <Error>{errors.dateIssue.message}</Error>}
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="dateMaturity">Date Maturity</Card.Form.Label>
              <DatePicker
                selected={dates.dateMaturity}
                minDate={new Date()}
                dateFormat="dd.MM.yyyy"
                onChange={changeDateMaturity}
              />
              {errors.dateMaturity?.message && <Error>{errors.dateMaturity.message}</Error>}
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="totalRepaymentAmount">
                Total Repayment Amount
              </Card.Form.Label>
              <Input
                name="totalRepaymentAmount"
                placeholder="Total Repayment Amount..."
                register={register}
                disabled
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Button onClick={handleSubmit(handleCreatingLoan)}>Create loan</Button>
            </Card.Form.Item>
          </Card.Form>
        </Card.List.Item>
      </Card.List>
    </div>
  );
};

export default Step2;
