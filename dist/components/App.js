'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

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

var _nexusFlux = require('nexus-flux');

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _PingTicker = require('./PingTicker');

var _PingTicker2 = _interopRequireDefault(_PingTicker);

var _NicknameModal = require('./NicknameModal');

var _NicknameModal2 = _interopRequireDefault(_NicknameModal);

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

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
        _react2['default'].createElement(_Room2['default'], { clientID: clientID, messages: messages, status: status, users: users }),
        nickname ? _react2['default'].createElement(_PingTicker2['default'], { clientID: clientID }) : _react2['default'].createElement(_NicknameModal2['default'], { clientID: clientID })
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
      users: _reactNexus2['default'].PropTypes.Immutable.Map
    },
    enumerable: true
  }, {
    key: 'styles',
    value: {},
    enumerable: true
  }]);

  App = (0, _pureRenderDecorator2['default'])(App) || App;
  App = _reactNexus2['default'].component(function () {
    return {
      messages: ['remote://messages', {}],
      session: ['local://session', {}],
      status: ['remote://status', {}],
      users: ['remote://users', {}]
    };
  })(App) || App;
  App = _reactNexus2['default'].root(function (_ref) {
    var req = _ref.req;
    var window = _ref.window;
    var clientID = _ref.clientID;

    var lifespan = new _nexusFlux.Lifespan();

    var localStores = {
      '/window': new _nexusFlux.Remutable({
        locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' : window.navigator.userLanguage || window.navigator.language || 'en',
        scrollX: __NODE__ ? 0 : window.scrollX,
        scrollY: __NODE__ ? 0 : window.scrollY
      }),
      '/session': new _nexusFlux.Remutable({
        clientID: clientID
      })
    };

    var localServer = new _nexusFluxAdaptersLocal2['default'].Server(localStores);
    var localClient = new _nexusFluxAdaptersLocal2['default'].Client(localServer);
    lifespan.onRelease(function () {
      return localClient.lifespan.release();
    });
    lifespan.onRelease(function () {
      return localServer.lifespan.release();
    });

    _.each(localStores, function (value, key) {
      return localServer.dispatchUpdate(key, value.commit());
    });

    localServer.on('action', function (_ref2) {
      var path = _ref2.path;
      var params = _ref2.params;

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
        localServer.dispatchUpdate('/window', localStores['/window'].set('scrollY', window.scrollX).set('scrollY', window.scrollY).commit());
      });
    }

    var remoteClient = new _nexusFluxSocketIoClient2['default']('' + protocol + '://' + host + ':' + port['public']);
    lifespan.onRelease(function () {
      return remoteClient.lifespan.release();
    });

    var nexus = {
      local: localClient,
      remote: remoteClient
    };

    return { nexus: nexus, lifespan: lifespan };
  })(App) || App;
  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];
// local flux