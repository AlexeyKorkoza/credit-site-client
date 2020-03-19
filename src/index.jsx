import 'react-dates/initialize';
import React from 'react';
import { render } from 'react-dom';
import 'react-dates/lib/css/_datepicker.css';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
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
