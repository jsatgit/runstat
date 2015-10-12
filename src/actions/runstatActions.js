var AppDispatcher = require('../dispatcher/AppDispatcher');
var RunstatConstants = require('../constants/runstatConstants');

var RunstatActions = {
  updateText: function(text, stat) {
    AppDispatcher.dispatch({
      actionType: RunstatConstants.SEARCH_UPDATE,
      text: text,
      stat: stat
    });
  },

  updateGraphData: function(graphData) {
    AppDispatcher.dispatch({
      actionType: RunstatConstants.GRAPH_DATA_UPDATE,
      graphData: graphData
    });
  },

  updateFilteredData: function(filteredData) {
    AppDispatcher.dispatch({
      actionType: RunstatConstants.FILTER_UPDATE,
      filteredData: filteredData
    });
  }
};

module.exports = RunstatActions;
