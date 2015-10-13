'use strict';

var React = require('react/addons');
var _ = require('lodash');
var moment = require('moment');
var History = require('react-router').History;

var RunstatActions = require('../actions/RunstatActions');
var RunstatConstants = require('../constants/RunstatConstants');

// CSS
require('normalize.css');
require('../styles/main.css');

var Fileinput = React.createClass({
  mixins: [ History ],

  tokenizeLine: function(line) {
    return _.compact(line.split(' '));
  },

  toSecs: function(timeStr) {
    return timeStr === '~' ? 0 : moment.duration(timeStr).asSeconds();
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
      runner[RunstatConstants.KM10_S] = self.toSecs(runner[RunstatConstants.KM10]);
      runner[RunstatConstants.KM21_S] = self.toSecs(runner[RunstatConstants.KM21]);
      runner[RunstatConstants.KM30_S] = self.toSecs(runner[RunstatConstants.KM30]);
      runner[RunstatConstants.KM35_S] = self.toSecs(runner[RunstatConstants.KM35]);
      runner[RunstatConstants.KM40_S] = self.toSecs(runner[RunstatConstants.KM40]);
      runner[RunstatConstants.TIME_S] = self.toSecs(runner[RunstatConstants.TIME]);
      return runner;
    });
    RunstatActions.updateGraphData(finishTimes);
  },

  onFilesSelected: function() {
    this.history.pushState(null, '/stats', null);
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
      <div className={'col-xs-' + this.props.col + ' col-md-offset-' + this.props.offset + ' vcentre'}>
        <span className='btn btn-primary btn-file'>
          Browse <input ref='fileInput' type='file' onChange={this.onFilesSelected}/>
        </span>
      </div>
    );
  }
});

module.exports = Fileinput;
