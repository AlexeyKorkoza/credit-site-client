import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #212941;
  margin: 0 auto;
  padding: 20px;
  width: 40%;
  height: 300px;
  border-radius: 5px;
`;

Form.Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default Form;
