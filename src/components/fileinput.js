'use strict';

var React = require('react/addons');
var _ = require('lodash');

var RunstatActions = require('../actions/runstatActions');
var RunstatConstants = require('../constants/runstatConstants');

// CSS
require('normalize.css');
require('../styles/main.css');

var Fileinput = React.createClass({
  tokenizeLine: function(line) {
    return _.compact(line.split(' '));
  },

  onFilesLoaded: function(reader) {
    var self = this;
    var result = _.compact(reader.result.split('\n'));
    var finishTimes = _.map(result, function(line) {
      var tokenizedLine = self.tokenizeLine(line);
      var runner = {};
      runner[RunstatConstants.PLACE] = parseInt(tokenizedLine[0]);
      runner[RunstatConstants.TIME] = tokenizedLine[1];
      runner[RunstatConstants.NAME] = tokenizedLine[4];
      runner[RunstatConstants.CITY] = tokenizedLine[5];
      runner[RunstatConstants.KM10] = tokenizedLine[9];
      runner[RunstatConstants.KM21] = tokenizedLine[10];
      runner[RunstatConstants.KM30] = tokenizedLine[11];
      runner[RunstatConstants.KM35] = tokenizedLine[12];
      runner[RunstatConstants.KM40] = tokenizedLine[13];
      return runner;
    });
    RunstatActions.updateGraphData(finishTimes);
  },

  onFilesSelected: function() {
    var self = this;
    var fileInput = this.refs.fileInput.getDOMNode();
    var files = fileInput.files;
    var reader = new FileReader();
    _.each(files, function(file) {
      reader.readAsText(file);
    });
    reader.onload = function() {
      self.onFilesLoaded(reader);
    };
  },

  render: function() {
    return (
      <div className={'col-xs-' + this.props.col}>
        <span className='btn btn-primary btn-file'>
          Browse <input ref='fileInput' type='file' onChange={this.onFilesSelected}/>
        </span>
      </div>
    );
  }
});

module.exports = Fileinput;
