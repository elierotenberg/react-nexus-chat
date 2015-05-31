'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _nexusFluxSocketIoServer = require('nexus-flux-socket.io/server');

var _nexusFluxSocketIoServer2 = _interopRequireDefault(_nexusFluxSocketIoServer);

var _nexusFlux = require('nexus-flux');

var _config = require('./config');

var _sha256 = require('sha256');

var _sha2562 = _interopRequireDefault(_sha256);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

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
var port = _config.flux.port;

var CLOCK_TICK_INTERVAL = 500;
var USER_TIMEOUT = 5000;

var NotFound = (function (_Error) {
  function NotFound() {
    _classCallCheck(this, NotFound);

    if (_Error != null) {
      _Error.apply(this, arguments);
    }

    this.name = 'NotFound';
    this.status = '404';
  }

  _inherits(NotFound, _Error);

  return NotFound;
})(Error);

var ChatServer = (function (_SocketIOServer) {
  function ChatServer() {
    var _this = this;

    _classCallCheck(this, ChatServer);

    var logger = (0, _morgan2['default'])('combined');
    _get(Object.getPrototypeOf(ChatServer.prototype), 'constructor', this).call(this, port, void 0, void 0, void 0, [logger]);

    this.stores = {
      '/status': new _nexusFlux.Remutable({
        date: Date.now(),
        topic: 'Welcome!' }),
      '/messages': new _nexusFlux.Remutable({}),
      '/users': new _nexusFlux.Remutable({}) };

    this.on('action', function (_ref) {
      var path = _ref.path;
      var params = _ref.params;
      return _this.dispatchAction({ path: path, params: params });
    });

    this.lifespan.setInterval(function () {
      return _this.tickClock();
    }, CLOCK_TICK_INTERVAL);
    this.lifespan.setInterval(function () {
      return _this.tickUsers();
    }, USER_TIMEOUT / 2);
  }

  _inherits(ChatServer, _SocketIOServer);

  _createClass(ChatServer, [{
    key: 'serveStore',
    value: function serveStore(_ref2) {
      var _this2 = this;

      var path = _ref2.path;

      return Promise['try'](function () {
        if (_this2.stores.hasOwnProperty(path)) {
          return _this2.stores[path].toJSON();
        }
        throw new NotFound('Store not found.');
      });
    }
  }, {
    key: 'dispatchAction',
    value: function dispatchAction(_ref3) {
      var path = _ref3.path;
      var params = _ref3.params;

      if (path === '/topic') {
        var topic = params.topic;

        return this.dispatchUpdate('/status', this.stores['/status'].set('topic', topic).commit());
      }
      if (path === '/nickname') {
        var clientId = params.clientId;
        var nickname = params.nickname;

        var h = (0, _sha2562['default'])(clientId);
        return this.dispatchUpdate('/users', this.stores['/users'].set(h, { h: h, nickname: nickname, lastSeen: Date.now() }).commit());
      }
      if (path === '/ping') {
        var clientId = params.clientId;

        var h = (0, _sha2562['default'])(clientId);
        var prev = this.stores['/users'].head.get(h);
        if (prev === void 0) {
          return null;
        }
        var next = _Object$assign({}, prev, { lastSeen: Date.now() });
        return this.dispatchUpdate('/users', this.stores['/users'].set(h, next).commit());
      }
    }
  }, {
    key: 'tickClock',
    value: function tickClock() {
      return this.dispatchUpdate('/status', this.stores['/status'].set('date', Date.now()).commit());
    }
  }, {
    key: 'tickUsers',
    value: function tickUsers() {
      var _this3 = this;

      var now = Date.now();
      _.each(this.stores['/users'].head.entries(), function (h, user) {
        var lastSeen = user.lastSeen;

        if (now - lastSeen > USER_TIMEOUT) {
          _this3.stores['/users']['delete'](h);
        }
      });
      if (!this.stores['/users'].dirty) {
        return null;
      }
      return this.dispatchUpdate('/users', this.stores['/users'].commit());
    }
  }]);

  return ChatServer;
})(_nexusFluxSocketIoServer2['default']);

var server = new ChatServer();

exports['default'] = server;
module.exports = exports['default'];