'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var RunstatWebApp = require('./RunstatWebApp');
var RunstatSplash = require('./RunstatSplash');

var content = document.getElementById('content');

React.render((
  <Router>
    <Route path='/' component={RunstatSplash}>
    </Route>
    <Route path='/stats' component={RunstatWebApp}>
    </Route>
  </Router>
), content);
