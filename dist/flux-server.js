'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

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

    this._nextMessageId = 0;

    this.stores = {
      '/status': new _nexusFlux.Remutable({
        date: Date.now(),
        topic: 'Welcome!' }),
      '/messages': new _nexusFlux.Remutable({}),
      '/users': new _nexusFlux.Remutable({}) };

    this.usersTimers = {};

    this.postMessage({
      nickname: 'System',
      text: 'The server has started!' });

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
    key: 'createMessageId',
    value: function createMessageId() {
      var id = this._nextMessageId;
      this._nextMessageId = this._nextMessageId + 1;
      return '' + id;
    }
  }, {
    key: 'postMessage',
    value: function postMessage(_ref3) {
      var nickname = _ref3.nickname;
      var text = _ref3.text;

      var id = this.createMessageId();
      var date = Date.now();
      this.dispatchUpdate('/messages', this.stores['/messages'].set(id, { id: id, nickname: nickname, text: text, date: date }).commit());
    }
  }, {
    key: 'dispatchAction',
    value: function dispatchAction(path, params) {
      if (path === '/setTopic') {
        var topic = params.topic;

        this.dispatchUpdate('/status', this.stores['/status'].set('topic', topic).commit());
        return;
      }
      if (path === '/setNickname') {
        var clientID = params.clientID;
        var nickname = params.nickname;

        var h = (0, _sha2562['default'])(clientID);
        if (this.usersTimers[h] === void 0) {
          this.postMessage({
            nickname: 'System',
            text: '' + nickname + ' has joined.' });
        } else {
          var oldNickname = this.stores['/users'].get(h).nickname;
          this.postMessage({
            nickname: 'System',
            text: '' + oldNickname + ' is now ' + nickname + '.' });
        }
        this.usersTimers[h] = Date.now();
        this.dispatchUpdate('/users', this.stores['/users'].set(h, { h: h, nickname: nickname }).commit());
        return;
      }
      if (path === '/ping') {
        var clientID = params.clientID;

        var h = (0, _sha2562['default'])(clientID);
        if (this.usersTimers[h] === void 0) {
          return;
        }
        this.usersTimers[h] = Date.now();
        return;
      }
      if (path === '/postMessage') {
        var clientID = params.clientID;
        var text = params.text;

        var h = (0, _sha2562['default'])(clientID);
        var user = this.stores['/users'].head.get(h);
        if (user === void 0) {
          return;
        }
        var date = Date.now();
        this.usersTimers[h] = date;
        var nickname = user.nickname;

        this.postMessage({ nickname: nickname, text: text });
        return;
      }
    }
  }, {
    key: 'tickClock',
    value: function tickClock() {
      this.dispatchUpdate('/status', this.stores['/status'].set('date', Date.now()).commit());
    }
  }, {
    key: 'tickUsers',
    value: function tickUsers() {
      var _this3 = this;

      var now = Date.now();
      var users = this.stores['/users'];
      _.each(this.usersTimers, function (lastPing, h) {
        if (now - lastPing > USER_TIMEOUT) {
          var _users$get = users.get(h);

          var nickname = _users$get.nickname;

          _this3.postMessage({
            nickname: 'System',
            text: '' + nickname + ' has left.' });
          users['delete'](h);
          delete _this3.usersTimers[h];
        }
      });
      if (!users.dirty) {
        return;
      }
      this.dispatchUpdate('/users', users.commit());
    }
  }]);

  return ChatServer;
})(_nexusFluxSocketIoServer2['default']);

var server = new ChatServer();

exports['default'] = server;
module.exports = exports['default'];