'use strict';

var RunstatWebApp = require('./RunstatWebApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={RunstatWebApp}>
    <Route name="/" handler={RunstatWebApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
