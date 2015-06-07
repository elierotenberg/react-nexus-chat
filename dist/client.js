'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _ = require('lodash');
var should = require('should');
var Promise = (global || window).Promise = require('bluebird');
var __DEV__ = process.env.NODE_ENV !== 'production';
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === 'object';
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}
var React = _reactNexus2['default'].React;

if (__DEV__) {
  __BROWSER__.should.be['true'];
}

window.startReactNexusChat = function (data, container) {
  var clientID = _nodeUuid2['default'].v1();
  React.render(React.createElement(_componentsApp2['default'], { data: data, clientID: clientID, window: window }), container);
};