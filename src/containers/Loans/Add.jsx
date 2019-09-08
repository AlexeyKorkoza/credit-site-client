import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Add as Steps } from '../../components/Loans';
import { calculation, localDb, notification } from '../../services';
import { client_card, clients, loans } from '../../api';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

const {
    Step1,
    Step2,
} = Steps;
const components = {
    1: Step1,
    2: Step2,
};

class Add extends Component {
    notificationDOMRef = React.createRef();
    timer = null;
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        email: '',
        fullName: '',
        phone: '',
        selectedTerritory: {},
        passportData: '',
        surchargeFactor: 0,

        clientId: null,
        clientName: '',

        currentStep: 1,

        amount: 0,
        dateIssue: null,
        dateMaturity: null,
        totalRepaymentAmount: 0,
        territories: TERRITORIES,

        loans: [],
        role: '',
        focusedDateMaturity: null,
        focusedDateIssue: null,
        failureNotificationType: 'FailureCreatingLoan',
        successfulNotificationType: 'SuccessfulCreatingLoan',
    };

    static propTypes = {
        history: ReactRouterPropTypes.history.isRequired,
        location: ReactRouterPropTypes.location.isRequired,
    };

    componentWillMount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        const {
            location: {
                state,
            },
        } = this.props;

        const { role } = localDb.getDataAuthUser();
        const newStateData = {
            role,
        };

        if (state) {
            const { clientId } = state;
            newStateData.clientId = clientId;

            clients.getClient(clientId)
                .then(result => {
                    const { territories } = this.state;
                    const { client } = result;
                    const selectedTerritory = territories.find(e => +e.value === +client.territory);
                    const { name: clientName } = client;

                    this.setState({
                        ...newStateData,
                        ...client,
                        clientName,
                        selectedTerritory,
                    });
                });
        }

        this.setState({ ...newStateData });
    }

    onBack = () => {
        const { history } = this.props;
        history.goBack();
    };

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onCreateClientCard = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            email,
            fullName,
            phone,
            selectedTerritory,
            passportData,
            clientId,
            surchargeFactor,
            territories,
        } = this.state;

        if (surchargeFactor === 0) {
            return;
        }

        const territory = territories.find(e => +e.value === +selectedTerritory.value).value;

        const body = {
            email,
            fullName,
            phone,
            territory,
            passportData,
            clientId,
            surchargeFactor,
        };

        client_card.createClientCard(body)
            .then(() => clients.getClientLoans(clientId))
            .then(result => {
                const { loans } = result;

                this.setState({
                    amount: surchargeFactor,
                    currentStep: 2,
                    loans,
                });
            });
    };

    onCreateLoan = event => {
        event.preventDefault();

        const {
            amount,
            selectedTerritory,
            dateIssue,
            dateMaturity,
            clientId,
            territories,
            totalRepaymentAmount,
            failureNotificationType,
            successfulNotificationType,
        } = this.state;

        const territory = territories.find(e => +e.value === +selectedTerritory.value);

        const body = {
            amount,
            coefficient: +territory.value,
            clientId,
            dateIssue,
            dateMaturity,
            totalRepaymentAmount,
        };

        return loans.saveLoan(body)
            .then(() => {
                const message = 'Loan was created successfully';
                const builtNotification = notification.buildNotification(message, successfulNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }

                this.timer = setTimeout(() => {
                    const { history } = this.props;
                    history.push('/clients');
                }, 3000);
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, failureNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
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
        const { currentStep } = this.state;
        const CurrentComponent = components[currentStep];

        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <CurrentComponent
              data={this.state}
              onBack={this.onBack}
              onChangeDateIssue={this.onChangeDateIssue}
              onChangeDateMaturity={this.onChangeDateMaturity}
              onCreateClientCard={this.onCreateClientCard}
              onCreateLoan={this.onCreateLoan}
              onChangeInput={this.onChangeInput}
              onChangeTerritory={this.onChangeTerritory}
              onFocusedDateIssue={this.onFocusedDateIssue}
              onFocusedDateMaturity={this.onFocusedDateMaturity}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default withRouter(Add);
