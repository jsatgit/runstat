'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

var Fileinput = require('./FileInput');
var Results = require('./Results');
var Search = require('./Search');
var Graph = require('./Graph');
var RunstatConstants = require('../constants/RunstatConstants');
var Filter = require('./Filter');

require('../stores/RunstatStore');

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
