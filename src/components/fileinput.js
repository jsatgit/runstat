'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Graph = require('./graph.js');

// CSS
require('normalize.css');
require('../styles/main.css');

var Fileinput = React.createClass({
  getInitialState: function() {
    return {
      graphData: undefined
    };
  },

  onFileReceived: function() {
    var self = this;
    var fileInput = this.refs.fileInput.getDOMNode();
    var files = fileInput.files;
    var reader = new FileReader();
    _.each(files, function(file) {
      reader.readAsText(file);
    });

    reader.onload = function() {
      var result = reader.result.split('\n');
      var finishTimes = _.map(result, function(line) {
        return _.compact(line.split(' '))[1];
      });
      self.setState({graphData: _.compact(finishTimes)});
    };
  },

  render: function() {
    return (
      <div>
        <input ref='fileInput' type='file' onChange={this.onFileReceived}/>
        <Graph data={this.state.graphData} />
      </div>
    );
  }
});

module.exports = Fileinput;
