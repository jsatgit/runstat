var AppDispatcher = require('../dispatcher/AppDispatcher');
var RunstatConstants = require('../constants/runstatConstants');

var RunstatActions = {
  updateText: function(text) {
    AppDispatcher.dispatch({
      actionType: RunstatConstants.SEARCH_UPDATE,
      text: text
    });
  },

  updateGraphData: function(graphData) {
    AppDispatcher.dispatch({
      actionType: RunstatConstants.GRAPH_DATA_UPDATE,
      graphData: graphData
    });
  }
};

module.exports = RunstatActions;
