import React from 'react';
import PropTypes from 'prop-types';

import LoansTable from '../Table';
import {
    Button,
    Card,
    H1,
    Input,
    ReactSelect,
    SingleDatePicker,
} from '../../../shared';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 129,
    }),
};

const outputProperties = ['dateMaturity'];

const Step2 = props => {
    const {
        data: {
            amount,
            clientName,
            dateIssue,
            dateMaturity,
            focusedDateMaturity,
            focusedDateIssue,
            loans,
            role,
            selectedTerritory,
            territories,
            totalRepaymentAmount,
        },
        onChangeDateIssue,
        onChangeDateMaturity,
        onChangeInput,
        onCreateLoan,
        onFocusedDateIssue,
        onFocusedDateMaturity,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
      <div>
        <H1 color="#3f4357">
          {clientName}
          loans
        </H1>
        <LoansTable
          loans={loans}
          outputProperties={outputProperties}
          role={role}
        />
        <Card.List>
          <Card.List.Item>
            <Card.Form noValidate>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="amount">Amount</Card.Form.Label>
                <Input
                  name='amount'
                  placeholder='Amount ...'
                  onChange={onChangeInput}
                  value={amount}
                  disabled
                />
              </Card.Form.Item>
              {validator.message('amount', amount, 'required')}
              <Card.Form.Item>
                <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
                <ReactSelect
                  value={selectedTerritory}
                  options={territories}
                  placeholder="Select Territory ..."
                  isDisabled
                  styles={customReactSelectStyles}
                />
              </Card.Form.Item>
              {validator.message('territory', selectedTerritory, 'required')}
              <Card.Form.Item>
                <Card.Form.Label htmlFor="coefficient">Date Issue</Card.Form.Label>
                <SingleDatePicker
                  date={dateIssue}
                  id="date_issue_id"
                  onDateChange={onChangeDateIssue}
                  focused={focusedDateIssue}
                  firstDayOfWeek={1}
                  onFocusChange={onFocusedDateIssue}
                />
              </Card.Form.Item>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="coefficient">Date Maturity</Card.Form.Label>
                <SingleDatePicker
                  date={dateMaturity}
                  id="date_maturity_id"
                  onDateChange={onChangeDateMaturity}
                  focused={focusedDateMaturity}
                  firstDayOfWeek={1}
                  onFocusChange={onFocusedDateMaturity}
                />
              </Card.Form.Item>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="totalRepaymentAmount">Total Repayment Amount</Card.Form.Label>
                <Input
                  type="number"
                  name="totalRepaymentAmount"
                  value={totalRepaymentAmount}
                  onChange={onChangeInput}
                  placeholder='Total Repayment Amount...'
                  disabled
                />
              </Card.Form.Item>
              {validator.message('totalRepaymentAmount', totalRepaymentAmount, 'required')}
              <Card.Form.Item>
                <Button onClick={onCreateLoan}>Create loan</Button>
              </Card.Form.Item>
            </Card.Form>
          </Card.List.Item>
        </Card.List>
      </div>
    );
};

Step2.defaultProps = {
    data: PropTypes.shape({
        amount: 0,
        clientName: '',
        dateIssue: '',
        dateMaturity: '',
        focusedInput: '',
        loans: '',
        role: '',
        selectedTerritory: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: 0,
    }),
    onChangeDateIssue: PropTypes.func,
    onChangeDateMaturity: PropTypes.func,
    onChangeInput: PropTypes.func,
    onCreateLoan: PropTypes.func,
    onFocusedDateIssue: PropTypes.func,
    onFocusedDateMaturity: PropTypes.func,
    validator: PropTypes.shape,
};

Step2.propTypes = {
    data: PropTypes.shape({
        amount: PropTypes.string,
        clientName: PropTypes.string,
        dateIssue: PropTypes.shape(),
        dateMaturity: PropTypes.shape(),
        focusedDateIssue: PropTypes.bool,
        focusedDateMaturity: PropTypes.bool,
        loans: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number,
                coefficient: PropTypes.number,
                dateIssue: PropTypes.string,
                dateMaturity: PropTypes.string,
                totalRepaymentAmount: PropTypes.number,
                id: PropTypes.number,
            })
        ),
        role: PropTypes.string,
        selectedTerritory: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: 0,
    }),
    onChangeDateMaturity: PropTypes.func,
    onChangeDateIssue: PropTypes.func,
    onChangeInput: PropTypes.func,
    onCreateLoan: PropTypes.func,
    onFocusedDateIssue: PropTypes.func,
    onFocusedDateMaturity: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Step2;
