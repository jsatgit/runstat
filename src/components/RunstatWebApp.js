'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

var Fileinput = require('./fileinput.js');
var Search = require('./search.js');

var RunstatWebApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <Fileinput />
        <Search />
      </div>
    );
  }
});

module.exports = RunstatWebApp;
