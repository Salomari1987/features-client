import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Admin from './components/Admin.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/admin' component={Admin} />
  </Route>
);