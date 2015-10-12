'use strict';

var React = require('react/addons');

var Fileinput = require('./FileInput');

var RunstatSplash = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <Fileinput col={1} offset={5} />
      </div>
    );
  }
});

module.exports = RunstatSplash;
