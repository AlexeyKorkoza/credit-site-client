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
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
    formProps,
    loans,
    selectedTerritory,
    clientName,
    role,
  } = useSecondStep();

  const { errors, handleSubmit, register, watch } = formProps;
  const dateIssue = watch('dateIssue');
  const dateMaturity = watch('dateMaturity');

  return (
    <div>
      <H1 color="#3f4357">
        {clientName}
        loans
      </H1>
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
                locale="en-GB"
                selected={dateIssue}
                minDate={new Date()}
                dateFormat="dd.MM.yyyy"
                onChange={changeDateIssue}
              />
              {errors.dateIssue?.message && <Error>{errors.dateIssue.message}</Error>}
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="dateMaturity">Date Maturity</Card.Form.Label>
              <DatePicker
                locale="en-GB"
                selected={dateMaturity}
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
                type="text"
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
