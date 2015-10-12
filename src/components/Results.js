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
    return (
      <div className={'col-xs-' + this.props.col}>
        <ul className='list-group' ref='results'>
          {_(this.state.list).map(function(runner, index) {
            return (
              <li className='list-group-item' key={index}>{runner[self.props.stat]}</li>
            );
          }).take(Math.min(this.state.list.length, 10)).value()}
        </ul>
      </div>
    );
  }
});

module.exports = Results;
