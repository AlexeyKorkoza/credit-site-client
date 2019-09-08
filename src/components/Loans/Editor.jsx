import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Button,
    Card,
    Input,
    ReactSelect,
    SingleDatePicker,
} from '../../shared';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 129,
    }),
};

const Editor = props => {
    const {
        data: {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            focusedDateMaturity,
            focusedDateIssue,
            totalRepaymentAmount,
            selectedTerritory,
            territories,
        },
        onChangeDateIssue,
        onChangeDateMaturity,
        onChangeInput,
        onChangeTerritory,
        onFocusedDateIssue,
        onFocusedDateMaturity,
        onSave,
        validator,
    } = props;

    if (!validator.allValid()) {
        validator.showMessages();
    }

    return (
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
                required
              />
            </Card.Form.Item>
            {validator.message('amount', amount, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="territory">Territory</Card.Form.Label>
              <ReactSelect
                value={selectedTerritory}
                onChange={onChangeTerritory}
                options={territories}
                placeholder="Select Territory ..."
                styles={customReactSelectStyles}
              />
            </Card.Form.Item>
            {validator.message('territory', selectedTerritory, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="coefficient">Coefficient</Card.Form.Label>
              <Input
                name="coefficient"
                value={coefficient}
                onChange={onChangeInput}
                placeholder='Coefficient...'
                required
              />
            </Card.Form.Item>
            {validator.message('coefficient', coefficient, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="coefficient">Date Issue</Card.Form.Label>
              <SingleDatePicker
                date={dateIssue ? moment(dateIssue) : null}
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
                date={dateMaturity ? moment(dateMaturity) : null}
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
                name='totalRepaymentAmount'
                placeholder='Total Repayment Amount...'
                onChange={onChangeInput}
                value={totalRepaymentAmount}
                required
              />
            </Card.Form.Item>
            {validator.message('totalRepaymentAmount', totalRepaymentAmount, 'required')}
            <Card.Form.Item>
              <Button onClick={onSave}>Save</Button>
            </Card.Form.Item>
          </Card.Form>
        </Card.List.Item>
      </Card.List>
    );
};

Editor.defaultProps = {
    data: PropTypes.shape({
        amount: 0,
        coefficient: 0,
        dateIssue: PropTypes.shape(),
        dateMaturity: PropTypes.shape(),
        focusedDateIssue: false,
        focusedDateMaturity: false,
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
    onChangeTerritory: PropTypes.func,
    onFocusedDateIssue: PropTypes.func,
    onFocusedDateMaturity: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    data: PropTypes.shape({
        amount: PropTypes.number,
        coefficient: PropTypes.number,
        dateIssue: PropTypes.shape(),
        dateMaturity: PropTypes.shape(),
        focusedDateIssue: PropTypes.bool,
        focusedDateMaturity: PropTypes.bool,
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        totalRepaymentAmount: PropTypes.number,
    }),
    onChangeDateMaturity: PropTypes.func,
    onChangeDateIssue: PropTypes.func,
    onChangeInput: PropTypes.func,
    onFocusedDateIssue: PropTypes.func,
    onFocusedDateMaturity: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Editor;
