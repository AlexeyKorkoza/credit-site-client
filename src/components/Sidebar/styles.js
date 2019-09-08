import styled from 'styled-components';

const Sidebar = styled.div`
  height: 100%;
  width: 70px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: #3F4357;
`;

Sidebar.Container = styled.div`
  width: 70px;
`;

Sidebar.Navigation = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
`;

Sidebar.Navigation.Item = styled.div`
  padding: 10px;
`;

export default Sidebar;
