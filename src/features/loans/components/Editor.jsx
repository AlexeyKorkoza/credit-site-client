import React from 'react';

import { Button, Card, Input, ReactSelect, SingleDatePicker } from '../../../shared';
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
  const [
    ,
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    saveLoanData,
    selectedTerritory,
    formProps,
  ] = useEditor();
  const [handleSubmit, register, watch] = formProps;

  const dateIssue = watch('dateIssue');
  const dateMaturity = watch('dateMaturity');

  return (
    <Card.List>
      <Card.List.Item>
        <Card.Form>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
            <Input name="amount" placeholder="Amount ..." register={register} />
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
            <SingleDatePicker
              date={dateIssue}
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
              date={dateMaturity}
              id="date_maturity_id"
              onDateChange={changeDateMaturity}
              focused={focusedDateMaturity}
              firstDayOfWeek={1}
              onFocusChange={modifyFocusDateMaturity}
            />
          </Card.Form.Item>
          <Card.Form.Item>
            <Card.Form.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Form.Label>
            <Input
              name="totalRepaymentAmount"
              placeholder="Total Repayment Amount..."
              register={register}
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
