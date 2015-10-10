var AppDispatcher = require('../dispatcher/AppDispatcher');
var RunstatConstants = require('../constants/runstatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _searchText = '';
var _graphData = [];

function updateSearchText(searchText) {
  _searchText = searchText;
}

function updateGraphData(graphData) {
  _graphData = graphData;
}

var RunstatStore = assign({}, EventEmitter.prototype, {
  getSearchText: function() {
    return _searchText;
  },

  getGraphData: function() {
    return _graphData;
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case RunstatConstants.SEARCH_UPDATE:
      updateSearchText(action.text);
      RunstatStore.emit(RunstatConstants.SEARCH_CHANGE_EVENT);
      break;
    case RunstatConstants.GRAPH_DATA_UPDATE:
      updateGraphData(action.graphData);
      RunstatStore.emit(RunstatConstants.GRAPH_CHANGE_EVENT);
      break;
    default:
  }
});

module.exports = RunstatStore;
