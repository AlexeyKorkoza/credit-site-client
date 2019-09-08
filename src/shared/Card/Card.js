import styled from 'styled-components';

const Card = {};

Card.List = styled.div`
  display: flex;
  flex-direction: column;
`;

Card.List.Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #3F4357;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 1px 20px 0 rgba(0,0,0,.1);
    border: none;
    border-radius: .2857rem;
`;

Card.Form = styled.form`
  width: 100%;   
`;

Card.Form.Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px 0;
`;

Card.Form.Label = styled.label`
  color: grey;
  margin-right: 10px;
`;

export default Card;
