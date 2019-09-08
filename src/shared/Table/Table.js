import styled from 'styled-components';

import device from '../devices';

const Table = styled.div`
  margin: 50px auto;
  width: 90%;
  background: #27293d;
  
  @media ${device.tablet} {
    margin: 50px 0;
  }
`;

Table.List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

Table.Header = styled(Table.List)`
  flex-direction: row;
  border-bottom: 1px solid #2f3144;
  
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

Table.List.Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid #2f3144;
  
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

Table.List.Row.Column = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  color: #a4a4ac;
  text-align: center;
  
  @media ${device.tablet} {
    margin: 0;
  }
`;

Table.List.Row.LastColumn = styled(Table.List.Row.Column)`
  display: flex;
  flex-direction: ${props => props.isRow ? 'row' : 'column'};
  
  @media ${device.tablet} {
     margin: 0;
  }
`;

export default Table;
