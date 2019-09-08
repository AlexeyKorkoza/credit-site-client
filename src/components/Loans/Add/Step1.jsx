import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Input,
    ReactSelect,
} from '../../../shared';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 128,
    }),
};

const Step1 = props => {
    const {
        data: {
            email,
            fullName,
            passportData,
            phone,
            selectedTerritory,
            surchargeFactor,
            territories,
        },
        onBack,
        onCreateClientCard,
        onChangeInput,
        onChangeTerritory,
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
              <Card.Form.Label htmlFor="fullName">Full Name</Card.Form.Label>
              <Input
                name='fullName'
                placeholder='Full Name...'
                onChange={onChangeInput}
                value={fullName}
                required
              />
            </Card.Form.Item>
            {validator.message('fullName', fullName, 'required')}
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
              <Card.Form.Label htmlFor="phone">Phone</Card.Form.Label>
              <Input
                type="phone"
                name='phone'
                placeholder='Phone...'
                onChange={onChangeInput}
                value={phone}
                required
              />
            </Card.Form.Item>
            {validator.message('phone', phone, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="email">Email</Card.Form.Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                placeholder='Email...'
                required
              />
            </Card.Form.Item>
            {validator.message('email', email, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="passportData">Passport Data</Card.Form.Label>
              <Input
                name="passportData"
                value={passportData}
                onChange={onChangeInput}
                placeholder='Passport Data...'
                required
              />
            </Card.Form.Item>
            {validator.message('passportData', passportData, 'required')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="surchargeFactor">Surcharge Factor</Card.Form.Label>
              <Input
                type="number"
                name="surchargeFactor"
                value={surchargeFactor}
                onChange={onChangeInput}
                placeholder='Surcharge Factor...'
                required
              />
            </Card.Form.Item>
            {validator.message('surchargeFactor', surchargeFactor, 'required')}
            <Card.Form.Item>
              <Button onClick={onBack}>Back</Button>
              <Button onClick={onCreateClientCard}>Issue a loan</Button>
            </Card.Form.Item>
          </Card.Form>
        </Card.List.Item>
      </Card.List>
    );
};

Step1.defaultProps = {
    data: PropTypes.shape({
        email: '',
        fullName: '',
        passportData: '',
        phone: '',
        selectedTerritory: '',
        surchargeFactor: 0,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
    }),
    onBack: PropTypes.func,
    onCreateClientCard: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    validator: PropTypes.shape(),
};

Step1.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string,
        fullName: PropTypes.string,
        passportData: PropTypes.string,
        phone: PropTypes.string,
        selectedTerritory: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        surchargeFactor: 0,
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
    }),
    onBack: PropTypes.func,
    onCreateClientCard: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Step1;
