import styled from 'styled-components';

const h1 = styled.h1`
    font-size: ${props => props.size ? props.size : '1.5em'};
    text-align: center;
    color: ${props => props.color ? props.color : '#ffffff'};
    margin: 0;
    `;

export default h1;
