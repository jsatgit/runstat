'use strict';

var React = require('react/addons');
var RunstatConstants = require('../constants/runstatConstants');
var RunstatStore = require('../stores/runstatStore');

var Results = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },


  onSearchChange: function() {
     //var results = this.refs.results.getDOMNode();
     var searchText = RunstatStore.getSearchText();
     var graphData = RunstatStore.getGraphData();
     var pattern = new RegExp('.*' + searchText.replace(/[^0-9]/g, '').split('').join('.*') + '.*');
     var filtered = _.filter(graphData, function(times) {
       return pattern.test(times);
     });
     this.setState({list: filtered});
  },

  componentDidMount: function() {
    RunstatStore.on(RunstatConstants.SEARCH_CHANGE_EVENT, this.onSearchChange);
  },

  componentWillUnmount: function() {
    RunstatStore.removeListener(RunstatConstants.SEARCH_CHANGE_EVENT, this.onSearchChange);
  },

  render: function() {
    return (
      <ul ref='results'>
        {_.map(this.state.list, function(time, index) {
          return (
            <li key={index}>{time}</li>
          );
        })}
      </ul>
    );
  }
});

module.exports = Results;
