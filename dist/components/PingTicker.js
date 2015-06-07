'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var PING_TICK_INTERVAL = 3000;

var PingTicker = (function (_React$Component) {
  function PingTicker(props) {
    _classCallCheck(this, _PingTicker);

    _get(Object.getPrototypeOf(_PingTicker.prototype), 'constructor', this).call(this, props);
    this._ticker = null;
  }

  _inherits(PingTicker, _React$Component);

  var _PingTicker = PingTicker;

  _createClass(_PingTicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this._ticker = setInterval(function () {
        var _props = _this.props;
        var clientID = _props.clientID;
        var nexus = _props.nexus;

        nexus.remote.dispatchAction('/ping', { clientID: clientID });
      }, PING_TICK_INTERVAL);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._ticker !== null) {
        clearInterval(this._ticker);
        this._ticker = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'displayName',
    value: 'PingTicker',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string,
      nexus: _react2['default'].PropTypes.shape({
        remote: _react2['default'].PropTypes.shape({
          dispatchAction: _react2['default'].PropTypes.func.isRequired
        }).isRequired
      }).isRequired
    },
    enumerable: true
  }]);

  PingTicker = _reactNexus2['default'].component()(PingTicker) || PingTicker;
  return PingTicker;
})(_react2['default'].Component);

exports['default'] = PingTicker;
module.exports = exports['default'];