import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const shadowsdancing = keyframes`
    0% {
        box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
        inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
        inset 0 -30px 0 rgba(245, 105, 145, 0.4);
}
    25% {
        box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4),
        inset 0 30px 0 rgba(209, 242, 165, 0.4),
    inset -30px 0 0 rgba(239, 250, 180, 0.4),
        inset 0 -30px 0 rgba(255, 196, 140, 0.4);
}
    50% {
        box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4),
        inset 0 30px 0 rgba(245, 105, 145, 0.4),
    inset -30px 0 0 rgba(209, 242, 165, 0.4),
        inset 0 -30px 0 rgba(239, 250, 180, 0.4);
}
    75% {
        box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4),
        inset 0 30px 0 rgba(255, 196, 140, 0.4),
    inset -30px 0 0 rgba(245, 105, 145, 0.4),
        inset 0 -30px 0 rgba(209, 242, 165, 0.4);
}
    100% {
        box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
        inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
        inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  }
`;

const colordancing = keyframes`
    0% {
        color: #D1F2A5;
}
    25% {
        color: #F56991;
}
    50% {
        color: #FFC48C;
}
    75% {
        color: #EFFAB4;
}
    100% {
        color: #D1F2A5;
}
`;

const colordancing2 = keyframes`
    0% {
        color: #FFC48C;
}
    25% {
        color: #EFFAB4;
}
    50% {
        color: #D1F2A5;
}
    75% {
        color: #F56991;
}
    100% {
        color: #FFC48C;
}
`;

export const ErrorContainer = styled.section`
    text-align: center;
    font-size: 180px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    
    > span {
      display: inline-block;
      line-height: 0.7;
      position: relative;
      color: #FFB485;
      vertical-align: middle;
    }
    
    > span:nth-of-type(1) {
      color: #D1F2A5;
      animation: ${colordancing} 4s infinite;
    }
        
    > span:nth-last-of-type(3) {
      color: #F56991;
      animation: ${colordancing2} 4s infinite;
    }
    
    > span:nth-of-type(2) {
    width: 120px;
    height: 120px;
    border-radius: 999px;
    
      &:before,
      &:after {
        border-radius: 0%;
      content:"";
    position: absolute;
    top: 0; left: 0;
    width: inherit; height: inherit;
    border-radius: 999px;
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
        inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
        inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    animation: ${shadowsdancing} 4s infinite;
      }
      
      &:before {
         -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
      }
    }
`;

export const ScreenReaderText = styled.span`
position: absolute;
    top: -9999em;
    left: -9999em;
`;

export const ProfileLink = styled(Link)`
    text-transform: uppercase;
    font-size: 13px;
    background-color: #92a4ad;
    padding: 10px 15px;
    border-radius: 0;
    color: #416475;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 50px;
    letter-spacing: 1px;
`;

export const LinkContainer = styled.div`
   text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-align: center;
  color: #ffb485;
  line-height: 1.5;
  margin: 50px 5px 5px 0;
  letter-spacing: 1px;
`;
