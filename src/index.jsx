import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications-component/dist/theme.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { UserProvider } from './core';

const Root = () => (
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);

render(<Root />, document.getElementById('root'));

module.hot.accept();
