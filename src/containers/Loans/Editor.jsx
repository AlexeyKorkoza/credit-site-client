import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';

import { Editor as EditorComponent } from '../../components/Loans';
import { loans } from '../../api';
import { calculation, notification } from '../../services';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

class Editor extends Component {
    notificationDOMRef = React.createRef();
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        action: '',
        amount: 0, // surchargeFactor
        coefficient: 0,
        dateIssue: null,
        dateMaturity: null,
        focusedDateMaturity: false,
        focusedDateIssue: false,
        totalRepaymentAmount: 0,
        territories: TERRITORIES,
        loanId: '',
        selectedTerritory: {},
        failureNotificationType: 'FailureEditingLoan',
        successfulNotificationType: 'SuccessfulEditingLoan',
    };

    static propTypes = {
        match: ReactRouterPropTypes.match.isRequired,
    };

    componentDidMount() {
        const {
            match: {
                params,
            },
        } = this.props;

        if (Object.keys(params).length > 0) {
            const { id: loanId } = params;

            loans.getLoan(loanId)
                .then(result => {
                    const {
                        dateIssue,
                        dateMaturity,
                        territory,
                        ...rest
                    } = result.loan;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === +territory);

                    this.setState({
                        action: 'edit',
                        dateIssue: moment(dateIssue),
                        dateMaturity: moment(dateMaturity),
                        loanId,
                        selectedTerritory,
                        ...rest,
                    });
                })
        } else {
            this.setState({
                action: 'add',
            });
        }
    }

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onChangeDateIssue = dateIssue => {
        const { dateMaturity } = this.state;

        const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, this.state);

        this.setState(result);
    };

    onChangeDateMaturity = dateMaturity => {
        const { dateIssue } = this.state;

        const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, this.state);

        this.setState(result);
    };

    onSave = event => {
        event.preventDefault();

        const {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
            loanId,
            selectedTerritory,
            failureNotificationType,
            successfulNotificationType,
        } = this.state;
        const { value: territory } = selectedTerritory;

        let body = {
            amount,
            coefficient,
            dateIssue,
            dateMaturity,
            territory,
            totalRepaymentAmount,
        };

        return loans.saveLoan(body, loanId)
            .then(() => {
                const message = 'Loan was edited successfully';
                const builtNotification = notification.buildNotification(message, successfulNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, failureNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onFocusedDateIssue = ({ focused }) => {
        this.setState({
            focusedDateIssue: focused,
        });
    };

    onFocusedDateMaturity = ({ focused }) => {
        this.setState({
            focusedDateMaturity: focused,
        });
    };

    render() {
        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <EditorComponent
              data={this.state}
              onChangeDateIssue={this.onChangeDateIssue}
              onChangeDateMaturity={this.onChangeDateMaturity}
              onChangeInput={this.onChangeInput}
              onChangeTerritory={this.onChangeTerritory}
              onFocusedDateIssue={this.onFocusedDateIssue}
              onFocusedDateMaturity={this.onFocusedDateMaturity}
              onSave={this.onSave}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default Editor;
