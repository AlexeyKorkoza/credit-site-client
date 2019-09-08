import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    Input,
    ReactSelect,
} from '../../shared';

const customReactSelectStyles = {
    valueContainer: () => ({
        padding: 3,
        paddingLeft: 7,
        width: 128,
    }),
};

const Editor = props => {
    const {
        data: {
            action,
            email,
            isRemoved,
            name,
            passportData,
            phone,
            role,
            selectedTerritory,
            territories,
        },
        onChangeInput,
        onChangeTerritory,
        onDeleteClient,
        onMarkClientForDeletion,
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
              <Card.Form.Label htmlFor="name">Name</Card.Form.Label>
              <Input
                name='name'
                placeholder='Name...'
                onChange={onChangeInput}
                value={name}
                required
              />
            </Card.Form.Item>
            {validator.message('name', name, 'required')}
            {
                        ((role === 'admin' && action === 'edit') || (role === 'manager' && action === 'add')) &&
                        (
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
                        )}
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
            {validator.message('email', email, 'required|email')}
            <Card.Form.Item>
              <Card.Form.Label htmlFor="passportData">Passport Data</Card.Form.Label>
              <Input
                name="passportData"
                value={passportData}
                onChange={onChangeInput}
                placeholder='Passport Data...'
                required
              />
              {validator.message('passportData', passportData, 'required')}
            </Card.Form.Item>
            <Card.Form.Item>
              <Button onClick={onSave}>Save</Button>
            </Card.Form.Item>
          </Card.Form>
          {role === 'manager' && action === 'edit' && (
            <Card.Form noValidate>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="isRemoved">Mark the client for deletion</Card.Form.Label>
                <Input
                  type='checkbox'
                  name='isRemoved'
                  onChange={onChangeInput}
                  checked={isRemoved}
                />
              </Card.Form.Item>
              <Card.Form.Item>
                <Button onClick={onMarkClientForDeletion}>Mark</Button>
              </Card.Form.Item>
            </Card.Form>
                )}
          {role === 'admin' && isRemoved && (
            <Card.Form noValidate>
              <Card.Form.Item>
                <Card.Form.Label htmlFor="isRemoved">Client for deletion</Card.Form.Label>
                <Button onClick={onDeleteClient}>Delete</Button>
              </Card.Form.Item>
            </Card.Form>
                )}
        </Card.List.Item>
      </Card.List>
    );
};

Editor.defaultProps = {
    data: PropTypes.shape({
        action: '',
        name: '',
        email: '',
        isRemoved: null,
        phone: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onDeleteClient: PropTypes.func,
    onMarkClientForDeletion: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

Editor.propTypes = {
    data: PropTypes.shape({
        action: '',
        name: '',
        email: '',
        isRemoved: null,
        phone: '',
        territories: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.string,
            }),
        ),
        selectedTerritory: PropTypes.shape(
            {
                label: PropTypes.string,
                value: PropTypes.string,
            }
        ),
    }),
    onChangeInput: PropTypes.func,
    onChangeTerritory: PropTypes.func,
    onDeleteClient: PropTypes.func,
    onMarkClientForDeletion: PropTypes.func,
    onSave: PropTypes.func,
    validator: PropTypes.shape(),
};

export default Editor;
