import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import { Button, Card, Input, ReactSelect, SingleDatePicker } from '../../../shared';
import { useEditor } from '../hooks';
import TERRITORIES from '../../../constants';
import { loanEditorSchema } from '../validation';

const customReactSelectStyles = {
  valueContainer: () => ({
    padding: 3,
    paddingLeft: 7,
    width: 129,
  }),
};

const Editor = () => {
  const [
    loanData,
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    saveLoanData,
    selectedTerritory,
  ] = useEditor();
  const [handleSubmit, setValue, register, unregister, watch] = useForm({
    defaultValues: {
      ...loanData,
    },
    validationSchema: loanEditorSchema,
  });

  useEffect(() => {
    register({ name: 'selectedTerritory' });

    return () => {
      unregister('selectedTerritory');
    };
  }, [register, unregister]);

  const handleSelectedTerritory = territory => {
    setValue(territory);
    changeSelectedTerritory(territory);
  };

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
              onChange={handleSelectedTerritory}
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
              date={dateIssue ? moment(dateIssue) : null}
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
              date={dateMaturity ? moment(dateMaturity) : null}
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
