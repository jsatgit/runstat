'use strict';

var React = require('react/addons');

var RunstatConstants = require('../constants/RunstatConstants');
var RunstatStore = require('../stores/RunstatStore');

var Results = React.createClass({
  getInitialState: function() {
    return {
      list: []
    };
  },

  onFilterChange: function() {
    this.setState({list: RunstatStore.getFilteredData()});
  },

  componentDidMount: function() {
    RunstatStore.on(RunstatConstants.FILTER_CHANGE_EVENT, this.onFilterChange);
  },

  componentWillUnmount: function() {
    RunstatStore.removeListener(RunstatConstants.FILTER_CHANGE_EVENT, this.onFilterChange);
  },

  render: function() {
    var self = this;
    var numResultsVisible = Math.min(this.state.list.length, 5);
    return (
      <div className={'col-xs-' + this.props.col}>
        <div>Showing {numResultsVisible} out of {this.state.list.length} results.</div>
        <ul className='list-group' ref='results'>
          {_(this.state.list).map(function(runner, index) {
            return (
              <li className='list-group-item' key={index}>{runner[self.props.stat]}</li>
            );
          }).take(numResultsVisible).value()}
        </ul>
      </div>
    );
  }
});

module.exports = Results;
