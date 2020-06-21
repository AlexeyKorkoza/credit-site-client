import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input.attrs(({ type, name }) => ({
  type: type || 'text',
  name: name || 'text',
}))`
  outline: none;
  border-radius: 5px;
  padding: 10px;
  border: none;

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Input = ({ defaultValue = '', disabled = false, register, type, name, placeholder = '' }) => (
  <StyledInput
    defaultValue={defaultValue}
    disabled={disabled}
    name={name}
    placeholder={placeholder}
    type={type}
    ref={register}
  />
);

Input.defaultProps = {
  defaultValue: '',
  disabled: false,
  type: '',
  name: '',
  placeholder: '',
  register: PropTypes.any,
  value: '',
};

Input.propTypes = {
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  value: PropTypes.string,
};

export default Input;
