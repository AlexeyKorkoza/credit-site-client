import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import LoansTable from '../Table';
import { Button, Card, H1, Input, ReactSelect, SingleDatePicker } from '../../../../shared';
import { useSecondStep } from '../../hooks';
import TERRITORIES from '../../../../constants';
import { loanSecondStepSchema } from '../../validation';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const outputProperties = ['dateMaturity'];

const Step2 = () => {
  const [
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
  ] = useSecondStep();
  const { errors, handleSubmit, register, unregister, setValue, watch } = useForm({
    // defaultValues: loanData,
    validationSchema: loanSecondStepSchema,
  });

  useEffect(() => {
    register({ name: 'dateIssue' });
    register({ name: 'dateMaturity' });

    return () => {
      unregister('dateIssue');
      unregister('dateMaturity');
    };
  }, [register, unregister]);

  return (
    <div>
      <H1 color="#3f4357">
        {/* {clientName} */}
        loans
      </H1>
      {/* <LoansTable loans={loans} outputProperties={outputProperties} role={role} /> */}
      <Card.List>
        <Card.List.Item>
          <Card.Form noValidate>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
              <Input name="amount" placeholder="Amount ..." register={register} disabled />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
              <ReactSelect
                // value={selectedTerritory}
                options={TERRITORIES}
                placeholder="Select Territory ..."
                isDisabled
                styles={customReactSelectStyles}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="coefficient">Date Issue</Card.Form.Label>
              <SingleDatePicker
                // date={dateIssue}
                id="date_issue_id"
                onDateChange={changeDateIssue}
                focused={focusedDateIssue}
                firstDayOfWeek={1}
                onFocusChange={modifyFocusDateIssue}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="coefficient">Date Maturity</Card.Form.Label>
              <SingleDatePicker
                // date={dateMaturity}
                id="date_maturity_id"
                onDateChange={changeDateMaturity}
                focused={focusedDateMaturity}
                firstDayOfWeek={1}
                onFocusChange={modifyFocusDateMaturity}
              />
            </Card.Form.Item>
            <Card.Form.Item>
              <Card.Form.Label htmlFor="totalRepaymentAmount">
                Total Repayment Amount
              </Card.Form.Label>
              <Input
                type="number"
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
