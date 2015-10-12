'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

var Fileinput = require('./fileinput');
var Results = require('./results');
var Search = require('./search');
var Graph = require('./graph');
var RunstatConstants = require('../constants/runstatConstants');
var Filter = require('./filter');

require('../stores/runstatStore');

var RunstatWebApp = React.createClass({
  componentDidMount: function() {
    Filter.init();
  },

  componentWillUnmount: function() {
    Filter.destroy();
  },

  render: function() {
    return (
      <div className='main'>
        <div className='row'>
          <Fileinput col={2} />
          <Search col={2} stat={RunstatConstants.KM10} />
          <Search col={2} stat={RunstatConstants.KM21} />
          <Search col={2} stat={RunstatConstants.KM30} />
          <Search col={2} stat={RunstatConstants.KM40} />
          <Search col={2} stat={RunstatConstants.TIME} />
        </div>
        <div className='row'>
          <Graph col={2} width={200} height={400} />
          <Results col={2} stat={RunstatConstants.KM10} />
          <Results col={2} stat={RunstatConstants.KM21} />
          <Results col={2} stat={RunstatConstants.KM30} />
          <Results col={2} stat={RunstatConstants.KM40} />
          <Results col={2} stat={RunstatConstants.TIME} />
        </div>
      </div>
    );
  }
});

module.exports = RunstatWebApp;
