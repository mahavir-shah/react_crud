import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login/Login';
import Dashboard from './backend/Dashboard';
import Logout from './backend/Logout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { checkLogin } from './services/CommonService';
import Register from './Login/Register';
ReactDOM.render( 
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact  />
        <Route path='/login' component={Login} exact  />
        <Route path='/register' component={Register} exact  />
        <Route path='/admin/dashboard' component={()=>checkLogin()==true ? <Dashboard/>:<Logout/>} exact />
        <Route path='/admin/testimonial' component={()=>checkLogin()==true ? <Dashboard/>:<Logout/>} exact />
        <Route path='/admin/slider' component={()=>checkLogin()==true ? <Dashboard/>:<Logout/>} exact />
        <Route path='/admin/profile' component={()=>checkLogin()==true ? <Dashboard/>:<Logout/>} exact />
        <Route path='/admin/logout' component={Logout} exact />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
