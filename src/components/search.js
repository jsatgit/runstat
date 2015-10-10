'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');

var RunstatActions = require('../actions/runstatActions');
var RunstatStore = require('../stores/runstatStore');
var RunstatConstants = require('../constants/runstatConstants');

var Search = React.createClass({
  getInitialState: function() {
    return {
      output: undefined
    };
  },

  onChange: function(event) {
    RunstatActions.updateText(event.target.value);
  },

  onStoreChange: function() {
    this.setState({output: RunstatStore.getSearchText()});
  },

  componentDidMount: function() {
    RunstatStore.on(RunstatConstants.SEARCH_CHANGE_EVENT, this.onStoreChange);
  },

  componentWillUnmount: function() {
    RunstatStore.removeListener(RunstatConstants.SEARCH_CHANGE_EVENT, this.onStoreChange);
  },

  render: function() {
    return (
      <div>
        <input type='text' onChange={this.onChange} />
        <div ref='output'>{this.state.output}</div>
      </div>
    );
  }
});

module.exports = Search;
