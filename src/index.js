import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login/Login';
import Dashboard from './backend/Dashboard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/admin/dashboard' component={Dashboard} exact />
        <Route path='/admin/testimonial' component={Dashboard} exact />
        <Route path='/admin/slider' component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
