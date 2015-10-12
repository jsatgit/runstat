var AppDispatcher = require('../dispatcher/AppDispatcher');
var RunstatConstants = require('../constants/RunstatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _searchTexts = {};

_searchTexts[RunstatConstants.KM10] = '';
_searchTexts[RunstatConstants.KM21] = '';
_searchTexts[RunstatConstants.KM30] = '';
_searchTexts[RunstatConstants.KM40] = '';
_searchTexts[RunstatConstants.TIME] = '';

var _graphData = [];

var _filteredData = [];

function updateSearchText(searchText, stat) {
  _searchTexts[stat] = searchText;
}

function updateGraphData(graphData) {
  _graphData = graphData;
}

function updateFilteredData(filteredData) {
  _filteredData = filteredData;
}

var RunstatStore = assign({}, EventEmitter.prototype, {
  getSearchTexts: function() {
    return _searchTexts;
  },

  getGraphData: function() {
    return _graphData;
  },

  getFilteredData: function() {
    return _filteredData;
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case RunstatConstants.SEARCH_UPDATE:
      updateSearchText(action.text, action.stat);
      RunstatStore.emit(RunstatConstants.SEARCH_CHANGE_EVENT);
      break;
    case RunstatConstants.GRAPH_DATA_UPDATE:
      updateGraphData(action.graphData);
      RunstatStore.emit(RunstatConstants.GRAPH_CHANGE_EVENT);
      break;
    case RunstatConstants.FILTER_UPDATE:
      updateFilteredData(action.filteredData);
      RunstatStore.emit(RunstatConstants.FILTER_CHANGE_EVENT);
      break;
    default:
  }
});

module.exports = RunstatStore;
