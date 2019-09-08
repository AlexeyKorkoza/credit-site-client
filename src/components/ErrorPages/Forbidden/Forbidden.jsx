import React from 'react';

import {
    ErrorContainer,
    Header,
    LinkContainer,
    ProfileLink,
    ScreenReaderText,
    Wrapper,
} from '../styles';

const Forbidden = () => {
    return (
      <Wrapper>
        <Header>Forbidden Page</Header>
        <ErrorContainer>
          <span>4</span>
          <span>
            <ScreenReaderText>0</ScreenReaderText>
          </span>
          <span>3</span>
        </ErrorContainer>
        <LinkContainer>
          <ProfileLink to="/profile">Go to Profile Page</ProfileLink>
        </LinkContainer>
      </Wrapper>
    )
};

export default Forbidden;
