import React from 'react';

import {
    ErrorContainer,
    Header,
    LinkContainer,
    ProfileLink,
    ScreenReaderText,
    Wrapper,
} from '../styles';

const NoMatch = () => {
    return (
      <Wrapper>
        <Header>No Page Found</Header>
        <ErrorContainer>
          <span>4</span>
          <span>
            <ScreenReaderText>0</ScreenReaderText>
          </span>
          <span>4</span>
        </ErrorContainer>
        <LinkContainer>
          <ProfileLink to="/profile">Go to Profile Page</ProfileLink>
        </LinkContainer>
      </Wrapper>
    )
};

export default NoMatch;
