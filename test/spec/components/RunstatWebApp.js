'use strict';

describe('RunstatWebApp', () => {
  let React = require('react/addons');
  let RunstatWebApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    RunstatWebApp = require('components/RunstatWebApp.js');
    component = React.createElement(RunstatWebApp);
  });

  it('should create a new instance of RunstatWebApp', () => {
    expect(component).toBeDefined();
  });
});
