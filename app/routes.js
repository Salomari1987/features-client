import React from 'react';
import {Route} from 'react-router';
import App from './containers/App.js';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Register from './containers/Register.js';
import Admin from './containers/Admin.js';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/admin' component={Admin} />
  </Route>
);