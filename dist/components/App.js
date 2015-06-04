'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _sha256 = require('sha256');

var _sha2562 = _interopRequireDefault(_sha256);

var _nexusFluxAdaptersLocal = require('nexus-flux/adapters/Local');

var _nexusFluxAdaptersLocal2 = _interopRequireDefault(_nexusFluxAdaptersLocal);

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nexusFluxSocketIoClient = require('nexus-flux-socket.io/client');

var _nexusFluxSocketIoClient2 = _interopRequireDefault(_nexusFluxSocketIoClient);

var _url = require('url');

var _nexusFlux = require('nexus-flux');

var _PingTicker = require('./PingTicker');

var _PingTicker2 = _interopRequireDefault(_PingTicker);

var _NicknameModal = require('./NicknameModal');

var _NicknameModal2 = _interopRequireDefault(_NicknameModal);

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _config = require('../config');

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
var protocol = _config.flux.protocol;
var host = _config.flux.host;
var port = _config.flux.port;

var App = (function (_React$Component) {
  function App() {
    _classCallCheck(this, _App);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(App, _React$Component);

  var _App = App;

  _createClass(_App, [{
    key: 'getUser',
    value: function getUser() {
      var defaultUser = {};
      var _props = this.props;
      var session = _props.session;
      var users = _props.users;

      var clientID = session.get('clientID');
      if (!clientID) {
        return defaultUser;
      }
      return users.get((0, _sha2562['default'])(clientID)) || defaultUser;
    }
  }, {
    key: 'render',
    value: function render() {
      var _getUser = this.getUser();

      var nickname = _getUser.nickname;
      var _props2 = this.props;
      var messages = _props2.messages;
      var status = _props2.status;
      var users = _props2.users;

      var clientID = this.props.session.get('clientID');
      return _react2['default'].createElement(
        'div',
        { className: 'App' },
        nickname ? _react2['default'].createElement(_PingTicker2['default'], { clientID: clientID }) : _react2['default'].createElement(_NicknameModal2['default'], { clientID: clientID }),
        _react2['default'].createElement(_Room2['default'], { clientID: clientID, messages: messages, status: status, users: users })
      );
    }
  }], [{
    key: 'displayName',
    value: 'App',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      messages: _reactNexus2['default'].PropTypes.Immutable.Map,
      session: _reactNexus2['default'].PropTypes.Immutable.Map,
      status: _reactNexus2['default'].PropTypes.Immutable.Map,
      users: _reactNexus2['default'].PropTypes.Immutable.Map },
    enumerable: true
  }, {
    key: 'styles',
    value: {},
    enumerable: true
  }]);

  App = _reactNexus2['default'].inject(function () {
    return {
      messages: ['remote', '/messages', {}],
      session: ['local', '/session', {}],
      status: ['remote', '/status', {}],
      users: ['remote', '/users', {}] };
  })(App) || App;
  return App;
})(_react2['default'].Component);

_Object$assign(App, {
  getRoutes: function getRoutes(_ref) {
    var window = _ref.window;
    var req = _ref.req;
    var url = _ref.url;

    var href = url ? url : req ? req.url : window ? window.location.href : '';

    var _parse = (0, _url.parse)(href);

    var path = _parse.path;
    var hash = _parse.hash;

    return _router2['default'].route('' + path + '' + (hash ? hash : ''));
  },

  updateMetaDOMNodes: function updateMetaDOMNodes(_ref2) {
    var window = _ref2.window;

    if (__DEV__) {
      __BROWSER__.should.be['true'];
    }
    var _App$getRoutes$0 = App.getRoutes({ window: window })[0];
    var title = _App$getRoutes$0.title;
    var description = _App$getRoutes$0.description;

    var titleDOMNode = window.document.querySelector('title');
    if (titleDOMNode !== null) {
      titleDOMNode.textContent = title;
    }
    var descriptionDOMNode = window.document.querySelector('meta[name=description]');
    if (descriptionDOMNode !== null) {
      descriptionDOMNode.setAttribute('content', description);
    }
  },

  createLocalFluxClient: function createLocalFluxClient(_ref3, clientID, lifespan) {
    var req = _ref3.req;
    var window = _ref3.window;

    var stores = {
      '/window': new _nexusFlux.Remutable({
        routes: App.getRoutes({ req: req, window: window }),
        locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' : window.navigator.userLanguage || window.navigator.language || 'en',
        scrollX: __NODE__ ? 0 : window.scrollX,
        scrollY: __NODE__ ? 0 : window.scrollY }),
      '/session': new _nexusFlux.Remutable({
        clientID: clientID }) };

    var server = new _nexusFluxAdaptersLocal2['default'].Server(stores);
    var client = new _nexusFluxAdaptersLocal2['default'].Client(server);

    lifespan.onRelease(function () {
      client.lifespan.release();
      server.lifespan.release();
    });

    server.on('action', function (_ref4) {
      var path = _ref4.path;
      var params = _ref4.params;

      if (path === '/window/scroll') {
        var x = params.x;
        var y = params.y;

        if (__BROWSER__) {
          window.scrollTo(x, y);
        }
        return;
      }
    });

    if (__BROWSER__) {
      window.addEventListener('scroll', function () {
        server.dispatchUpdate('/window', stores['/window'].set('scrollY', window.scrollX).set('scrollY', window.scrollY).commit());
      });

      window.addEventListener('popstate', function () {
        server.dispatchUpdate('/window', stores['/window'].set('routes', App.getRoutes({ window: window })).commit());

        App.updateMetaDOMNodes({ window: window });
      });

      server.dispatchUpdate('/window', stores['/window'].set('routes', App.getRoutes({ window: window })).set('locale', window.navigator.userLanguage || window.navigator.language || 'en').set('scrollX', window.scrollX).set('scrollY', window.scrollY).commit()).dispatchUpdate('/session', stores['/session'].set('clientID', clientID).commit());
    }

    return client;
  },

  createRemoteFluxClient: function createRemoteFluxClient(_ref5, clientID, lifespan) {
    var req = _ref5.req;
    var window = _ref5.window;

    var client = new _nexusFluxSocketIoClient2['default']('' + protocol + '://' + host + ':' + port);
    lifespan.onRelease(function () {
      return client.lifespan.release();
    });

    if (__BROWSER__) {
      client.forceResync();
    }

    return client;
  },

  createNexus: function createNexus(_ref6, clientID, lifespan) {
    var req = _ref6.req;
    var window = _ref6.window;

    return {
      local: App.createLocalFluxClient({ req: req, window: window }, clientID, lifespan),
      remote: App.createRemoteFluxClient({ req: req, window: window }, clientID, lifespan) };
  } });

exports['default'] = App;
module.exports = exports['default'];