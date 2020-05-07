import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  padding: 0.5em;
  text-align: center;
  font-size: 14pt;
  border-radius: 5px;
  color: #fff;
  background: #9c27b0;
  cursor: pointer;
  border: none;
  width: 100%;

  :hover {
    outline: none;
    border: none;
  }

  :focus {
    outline: none;
    border: none;
  }
`;

const Button = ({ children, onClick }) => <StyledButton onClick={onClick}>{children}</StyledButton>;

Button.defaultProps = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
