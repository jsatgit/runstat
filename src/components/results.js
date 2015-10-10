'use strict';

var React = require('react/addons');
var Promise = require('bluebird');

var RunstatConstants = require('../constants/runstatConstants');
var RunstatStore = require('../stores/runstatStore');

var Results = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },

  applyFilter: function(searchText, graphData) {
    return new Promise(function(resolve) {
      var pattern = new RegExp('.*' + searchText.replace(/[^0-9]/g, '').split('').join('.*') + '.*');
      var filteredData = _.filter(graphData, function(times) {
        return pattern.test(times);
      });
      resolve(filteredData);
    });
  },

  onSearchChange: function() {
    var self = this;
    var searchText = RunstatStore.getSearchText();
    var graphData = RunstatStore.getGraphData();
    this.applyFilter(searchText, graphData).then(function(filteredData) {
      self.setState({list: filteredData});
    });
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
