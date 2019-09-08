import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';

const Wrapper = styled.div``;

const reactSelect = props => {
    return (
      <Wrapper>
        <ReactSelect {...props} />
      </Wrapper>
    )
};

export default reactSelect;
