'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

//var imageURL = require('../images/yeoman.png');

var RunstatWebApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        Hello World
      </div>
    );
  }
});

module.exports = RunstatWebApp;
