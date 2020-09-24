import styled from 'styled-components';

const Modal = styled.div`
  display: ${props => (props.isActiveModal ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #1e1e2e;
`;

Modal.Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default Modal;
