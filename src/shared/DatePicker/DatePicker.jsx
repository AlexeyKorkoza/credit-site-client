import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

const Wrapper = styled.div`
  .react-datepicker__input-container input {
    outline: none;
    border-radius: 5px;
    padding: 10px;
    border: none;
  }
`;

const CustomDatePicker = props => (
  <Wrapper>
    <DatePicker {...props} />
  </Wrapper>
);

export default CustomDatePicker;
