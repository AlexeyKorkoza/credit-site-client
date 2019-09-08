import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)``;

const List = styled.div`
  position: relative;
  width: 90%;
  margin: 0 50px;
`;

List.Link = styled(LinkStyled)`
    padding: 0.5em 0;
    margin: 7px 0;
    text-align: center;
    font-size: 14pt;
    border-radius: 5px;
    color: #fff;
    background: #9c27b0;
    cursor: pointer;
    border: none;
    width: 100%;
    text-decoration: none;
    
    :hover {
       outline: none;
       border: none;
    }
    
    :focus {
       outline: none;
       border: none;
    }
`;

List.Link.Add = styled(List.Link)`
   display: flex;
   justify-content: space-around;
   width: 50px;
   background: #27293d;
   margin: 10px 0 0;
`;

export default List;
