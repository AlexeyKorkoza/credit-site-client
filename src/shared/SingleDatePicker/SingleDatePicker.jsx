import React from 'react';
import { SingleDatePicker } from 'react-dates';
import styled from 'styled-components';

const Wrapper = styled.div`
  .DateRangePickerInput {
    border: none;
    background: none;
  }
  
  .CalendarDay {
    transition: all 100ms linear;
  }
  
  .DateInput {
    width: 175px;
  }
  
  .DateInput_input {
    width: 80%;
    padding: 5px 11px;
    border: none;
    border-radius: 5px;
  }
`;

const singleDatePicker = props => {
    return (
      <Wrapper>
        <SingleDatePicker {...props} />
      </Wrapper>
    )
};

export default singleDatePicker;
