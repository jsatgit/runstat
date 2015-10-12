'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

var RunstatActions = require('../actions/RunstatActions');
var LabelNames = require('./LabelNames');

var Search = React.createClass({
  onChange: function(event) {
    RunstatActions.updateText(event.target.value, this.props.stat);
  },

  render: function() {
    return (
      <div className={'col-xs-' + this.props.col}>
        <label>{LabelNames[this.props.stat]}</label>
        <input type='text' className='form-control' onChange={this.onChange} />
      </div>
    );
  }
});

module.exports = Search;
