import React from 'react';

import { Button, Card, DatePicker, Error, Input, ReactSelect } from '../../../shared';
import { useEditor } from '../hooks';
import TERRITORIES from '../../../constants';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const DATE_FORMAT = 'dd.MM.yyyy';

const Editor = () => {
  const {
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    dates,
    formProps,
    saveLoanData,
    selectedTerritory,
    updateTotalRepaymentAmount,
  } = useEditor();
  const { errors, handleSubmit, register } = formProps;

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
            <Input
              name="amount"
              onChange={updateTotalRepaymentAmount}
              placeholder="Amount ..."
              register={register}
            />
            {errors.amount?.message && <Error>{errors.amount.message}</Error>}
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
            <Card.Form.Label htmlFor="coefficient">Coefficient</Card.Form.Label>
            <Input name="coefficient" placeholder="Coefficient..." register={register} />
            {errors.coefficient?.message && <Error>{errors.coefficient.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="coefficient">Date Issue</Card.Form.Label>
            <DatePicker
              selected={dates.dateIssue}
              minDate={new Date()}
              dateFormat={DATE_FORMAT}
              onChange={changeDateIssue}
            />
            {errors.dateIssue?.message && <Error>{errors.dateIssue.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="coefficient">Date Maturity</Card.Form.Label>
            <DatePicker
              selected={dates.dateMaturity}
              minDate={new Date()}
              dateFormat={DATE_FORMAT}
              onChange={changeDateMaturity}
            />
            {errors.dateMaturity?.message && <Error>{errors.dateMaturity.message}</Error>}
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Form.Label>
            <Input
              name="totalRepaymentAmount"
              placeholder="Total Repayment Amount..."
              register={register}
              disabled
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Button onClick={handleSubmit(saveLoanData)}>Save</Button>
          </Card.Form.Item>
        </Card.Form>
      </Card.List.Item>
    </Card.List>
  );
};

export default Editor;
