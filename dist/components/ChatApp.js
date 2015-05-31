'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nexusFluxAdaptersLocal = require('nexus-flux/adapters/Local');

var _nexusFluxAdaptersLocal2 = _interopRequireDefault(_nexusFluxAdaptersLocal);

var _nexusFluxSocketIoClient = require('nexus-flux-socket.io/client');

var _nexusFluxSocketIoClient2 = _interopRequireDefault(_nexusFluxSocketIoClient);

var _nexusFlux = require('nexus-flux');

var _url = require('url');

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _config = require('../config');

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

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

var ChatApp = (function (_Nexus$bind) {
  function ChatApp() {
    _classCallCheck(this, ChatApp);

    if (_Nexus$bind != null) {
      _Nexus$bind.apply(this, arguments);
    }
  }

  _inherits(ChatApp, _Nexus$bind);

  _createClass(ChatApp, null, [{
    key: 'getRoutes',
    value: function getRoutes(_ref) {
      var window = _ref.window;
      var req = _ref.req;
      var url = _ref.url;

      var href = url ? url : req ? req.url : window ? window.location.href : '';

      var _parse = (0, _url.parse)(href);

      var path = _parse.path;
      var hash = _parse.hash;

      return _router2['default'].route('' + path + '' + (hash ? hash : ''));
    }
  }, {
    key: 'updateMetaDOMNodes',
    value: function updateMetaDOMNodes(_ref2) {
      var window = _ref2.window;

      if (__DEV__) {
        __BROWSER__.should.be['true'];
      }
      var _ChatApp$getRoutes$0 = ChatApp.getRoutes({ window: window })[0];
      var title = _ChatApp$getRoutes$0.title;
      var description = _ChatApp$getRoutes$0.description;

      var titleDOMNode = window.document.querySelector('title');
      if (titleDOMNode !== null) {
        titleDOMNode.textContent = title;
      }
      var descriptionDOMNode = window.document.querySelector('meta[name=description]');
      if (descriptionDOMNode !== null) {
        descriptionDOMNode.setAttribute('content', description);
      }
    }
  }, {
    key: 'createLocalFluxClient',
    value: function createLocalFluxClient(_ref3, clientID, lifespan) {
      var req = _ref3.req;
      var window = _ref3.window;

      var stores = {
        '/window': new _nexusFlux.Remutable({
          routes: ChatApp.getRoutes({ req: req, window: window }),
          locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' : window.navigator.userLanguage || window.navigator.language || 'en',
          scrollX: __NODE__ ? 0 : window.scrollX,
          scrollY: __NODE__ ? 0 : window.scrollY }),
        '/user': new _nexusFlux.Remutable({
          clientID: clientID,
          nickname: null }) };

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
          server.dispatchUpdate('/window', stores['/window'].set('routes', ChatApp.getRoutes({ window: window })).commit());
          ChatApp.updateMetaDOMNodes({ window: window });
        });
      }

      return client;
    }
  }, {
    key: 'createRemoteFluxClient',
    value: function createRemoteFluxClient(_ref5, clientID, lifespan) {
      var req = _ref5.req;
      var window = _ref5.window;

      var client = new _nexusFluxSocketIoClient2['default']('' + protocol + '://' + host + ':' + port);
      lifespan.onRelease(function () {
        return client.lifespan.release();
      });
      return client;
    }
  }, {
    key: 'createNexus',
    value: function createNexus(_ref6, clientID, lifespan) {
      var req = _ref6.req;
      var window = _ref6.window;

      return {
        local: ChatApp.createLocalFluxClient({ req: req, window: window }, clientID, lifespan),
        remote: ChatApp.createRemoteFluxClient({ req: req, window: window }, clientID, lifespan) };
    }
  }, {
    key: 'styles',
    value: {},
    enumerable: true
  }]);

  return ChatApp;
})(_reactNexus2['default'].bind((function (_React$Component) {
  var _class = function (props) {
    _classCallCheck(this, _class);

    _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);
  };

  _inherits(_class, _React$Component);

  _createClass(_class, [{
    key: 'getNexusBindings',
    value: function getNexusBindings() {
      return {
        status: ['remote', '/status', {}] };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        'Hello ChatApp!'
      );
    }
  }], [{
    key: 'displayName',
    value: 'ChatApp',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      status: _reactNexus2['default'].PropTypes.Immutable.Map },
    enumerable: true
  }]);

  return _class;
})(_react2['default'].Component)));

exports['default'] = ChatApp;
module.exports = exports['default'];