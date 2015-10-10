'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

var Fileinput = require('./fileinput');
var Search = require('./search');
var Graph = require('./graph');
var Results = require('./results');

require('../stores/runstatStore');

var RunstatWebApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <Fileinput />
        <Search />
        <Results />
        <Graph />
      </div>
    );
  }
});

module.exports = RunstatWebApp;
