import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications-component/dist/theme.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

import App from './App';
import { UserProvider } from './core';

registerLocale('en-GB', enGB);

const Root = () => (
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);

render(<Root />, document.getElementById('root'));

module.hot.accept();
