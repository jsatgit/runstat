'use strict';

var React = require('react/addons');
var Fileinput = require('./FileInput');
var $ = require('jquery');

var RunstatSplash = React.createClass({
  componentWillMount: function() {
    $(document.body).addClass('splash');
  },

  render: function() {
    return (
      <div className="container container-table">
        <div className='row vcentre-row'>
          <Fileinput col={1} offset={5} />
        </div>
      </div>
    );
  }
});

module.exports = RunstatSplash;
