'use strict';

var React = require('react/addons');
var d3 = require('d3');
var moment = require('moment');
require('moment-duration-format');
var _ = require('lodash');

// CSS
require('normalize.css');
require('../styles/main.css');

var RunstatStore = require('../stores/RunstatStore');
var RunstatConstants = require('../constants/RunstatConstants');

var Graph = React.createClass({
  getInitialState: function() {
    return {
      averages: undefined
    };
  },

  componentDidMount: function() {
    RunstatStore.on(RunstatConstants.FILTER_CHANGE_EVENT, this.onFilterChange);
  },

  componentWillUnmount: function() {
    RunstatStore.removeListener(RunstatConstants.FILTER_CHANGE_EVENT, this.onFilterChange);
  },

  getXVals: function() {
    var map = {};
    map[RunstatConstants.KM10_S] = 10;
    map[RunstatConstants.KM21_S] = 21;
    map[RunstatConstants.KM30_S] = 30;
    map[RunstatConstants.KM40_S] = 40;
    map[RunstatConstants.TIME_S] = 42;
    return map;
  },

  onFilterChange: function() {
    var keys = [
      RunstatConstants.KM10_S,
      RunstatConstants.KM21_S,
      RunstatConstants.KM30_S,
      RunstatConstants.KM40_S,
      RunstatConstants.TIME_S
    ];
    var initialSum = {};
    _.each(keys, function(keyName) {
      initialSum[keyName] = 0;
    });
    var filteredData = RunstatStore.getFilteredData();
    var sum = _.reduce(filteredData, function(acc, runner) {
      return _.mapValues(acc, function(time, key) {
        return time + runner[key];
      });
    }, initialSum);

    var averages = _.mapValues(sum, function(time) {
      return Math.round(time / filteredData.length);
    });
    this.setState({averages: averages});
  },

  componentDidUpdate: function() {
    var margin = {top: 20, right: 20, bottom: 25, left: 60},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat(function(d) {
          return moment.duration(d, 'seconds').format('h:mm:ss');
        })
        .orient('left');

    var line = d3.svg.line()
        .x(function(d) { return x(d.xVal); })
        .y(function(d) { return y(d.yVal); });

    d3.select('svg').remove();

    var graph = this.refs.graph.getDOMNode();
    var svg = d3.select(graph).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xVals = this.getXVals();
    var data = _.map(this.state.averages, function(value, key) {
      return {
        xVal: xVals[key],
        yVal: value
      };
    });
    data.unshift({xVal: 0, yVal: 0});


    x.domain(d3.extent(data, function(d) { return d.xVal; }));
    y.domain(d3.extent(data, function(d) { return d.yVal; }));

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
      <div className={'col-xs-' + this.props.col}>
        <div ref='graph'></div>
      </div>
    );
  }
});

module.exports = Graph;
