var _ = require('lodash');
var Promise = require('bluebird');

var RunstatStore = require('../stores/runstatStore');
var RunstatActions = require('../actions/runstatActions');
var RunstatConstants = require('../constants/runstatConstants');

function getPattern(searchText) {
  return new RegExp('.*' + searchText.replace(/[^0-9:]/g, '').split('').join('.*') + '.*');
}

function applyFilter(searchTexts, graphData) {
  return new Promise(function(resolve) {
    var stats = [
      RunstatConstants.TIME,
      RunstatConstants.KM10,
      RunstatConstants.KM21,
      RunstatConstants.KM30,
      RunstatConstants.KM40
    ];
    var patterns = {};
    _.each(stats, function(stat) {
      patterns[stat] = getPattern(searchTexts[stat]);
    });
    var filteredData = _.filter(graphData, function(runner) {
      return _.every(stats, function(stat) {
        return patterns[stat].test(runner[stat]);
      });
    });
    resolve(filteredData);
  });
}

var Filter = {
  onSearchChange: function() {
    var searchTexts = RunstatStore.getSearchTexts();
    var graphData = RunstatStore.getGraphData();
    applyFilter(searchTexts, graphData).then(function(filteredData) {
      RunstatActions.updateFilteredData(filteredData);
    });
  },

  init: function() {
    RunstatStore.on(RunstatConstants.SEARCH_CHANGE_EVENT, this.onSearchChange);
  },

  destroy: function() {
    RunstatStore.removeListener(RunstatConstants.SEARCH_CHANGE_EVENT, this.onSearchChange);
  }
};

module.exports = Filter;
