'use strict';

var React = require('react/addons');
var d3 = require('d3');

// CSS
require('normalize.css');
require('../styles/main.css');

var RunstatStore = require('../stores/runstatStore');
var RunstatConstants = require('../constants/runstatConstants');

var Graph = React.createClass({
  getInitialState: function() {
    return {
      graphData: undefined
    };
  },

  componentDidMount: function() {
    RunstatStore.on(RunstatConstants.GRAPH_CHANGE_EVENT, this.onStoreChange);
  },

  componentWillUnmount: function() {
    RunstatStore.removeListener(RunstatConstants.GRAPH_CHANGE_EVENT, this.onStoreChange);
  },

  onStoreChange: function() {
    this.setState({graphData: RunstatStore.getGraphData()});
  },

  componentDidUpdate: function() {
    var margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = 1100 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var parseTime = d3.time.format('%H:%M:%S').parse;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.time.scale()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var line = d3.svg.line()
        .x(function(d) { return x(d.place); })
        .y(function(d) { return y(d.time); });

    var graph = this.refs.graph.getDOMNode();
    var svg = d3.select(graph).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var data = _.map(this.state.graphData, function(time, place) {
      return {
        place: place,
        time: parseTime(time)
      };
    });

    x.domain(d3.extent(data, function(d) { return d.place; }));
    y.domain(d3.extent(data, function(d) { return d.time; }));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);
  },

  render: function() {
    return (
      <div ref='graph'></div>
    );
  }
});

module.exports = Graph;
