import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input.attrs(({ type, name }) => ({
    type: type || 'text',
    name: name || 'text',
}))`
    outline: none;
    border-radius: 5px;
    padding: 10px;
    border: none;
    `;

const Input = props => {
    return (
      <StyledInput {...props} />
    );
};

export default Input;
