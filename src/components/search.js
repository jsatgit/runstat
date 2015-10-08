'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

var Search = React.createClass({
  onChange: function(event) {
    console.log(event.target.value);
  },

  render: function() {
    return (
      <div>
        <input type='text' onChange={this.onChange} />
        <div ref='output'></div>
      </div>
    );
  }
});

module.exports = Search;
