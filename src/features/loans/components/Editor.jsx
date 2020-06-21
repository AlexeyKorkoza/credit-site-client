import React from 'react';

import { Button, Card, DatePicker, Input, ReactSelect } from '../../../shared';
import { useEditor } from '../hooks';
import TERRITORIES from '../../../constants';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

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
  const { handleSubmit, register } = formProps;

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
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="coefficient">Coefficient</Card.Form.Label>
            <Input name="coefficient" placeholder="Coefficient..." register={register} />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="coefficient">Date Issue</Card.Form.Label>
            <DatePicker
              locale="en-GB"
              selected={dates.dateIssue}
              minDate={new Date()}
              dateFormat="dd.MM.yyyy"
              onChange={changeDateIssue}
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="coefficient">Date Maturity</Card.Form.Label>
            <DatePicker
              locale="en-GB"
              selected={dates.dateMaturity}
              minDate={new Date()}
              dateFormat="dd.MM.yyyy"
              onChange={changeDateMaturity}
            />
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
