import 'react-dates/initialize';
import React from 'react';
import { render } from 'react-dom';
import 'react-dates/lib/css/_datepicker.css';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

const Root = () => (
  <Router>
    <App />
  </Router>
);

render(<Root />, document.getElementById('root'));
