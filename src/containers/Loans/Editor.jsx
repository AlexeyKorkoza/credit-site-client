import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';

import { Editor as EditorComponent } from '../../features/loans/components';
import { loans } from '../../api';
import { calculation, notification } from '../../services';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

class Editor extends Component {

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
