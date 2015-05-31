'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _nexusFlux = require('nexus-flux');

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _componentsChatApp = require('./components/ChatApp');

var _componentsChatApp2 = _interopRequireDefault(_componentsChatApp);

var _config = require('./config');

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
  window.should.not.have.property(_config.MODULE_NAME);
}

window[_config.MODULE_NAME] = {
  ChatApp: function ChatApp(_ref) {
    var _ref$clientID = _ref.clientID;
    var clientID = _ref$clientID === undefined ? _nodeUuid2['default'].v1() : _ref$clientID;
    var container = _ref.container;
    var _ref$data = _ref.data;
    var data = _ref$data === undefined ? {} : _ref$data;
    var props = _ref.props;

    if (__DEV__) {
      clientID.should.be.a.String;
      container.should.be.an.Object;
      data.should.be.an.Object;
      props.should.be.an.Object;
    }

    var lifespan = new _nexusFlux.Lifespan();
    var nexus = _componentsChatApp2['default'].createNexus({ window: window }, clientID, lifespan);
    window.addEventListener('close', lifespan.release);
    _reactNexus2['default'].mountApp(React.createElement(_componentsChatApp2['default'], props), nexus, data, container);
  } };