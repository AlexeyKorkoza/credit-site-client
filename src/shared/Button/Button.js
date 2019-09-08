import styled from 'styled-components';

const Button = styled.button`
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

export default Button;
