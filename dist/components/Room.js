'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

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

var _MessageInput = require('./MessageInput');

var _MessageInput2 = _interopRequireDefault(_MessageInput);

var _Messages = require('./Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

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

var Room = (function (_React$Component) {
  function Room() {
    _classCallCheck(this, Room);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Room, _React$Component);

  _createClass(Room, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;

      var topic = status.get('topic');
      return _react2['default'].createElement(
        'div',
        { className: 'Room' },
        _react2['default'].createElement(
          'div',
          { className: 'Room-header' },
          topic
        ),
        _react2['default'].createElement(
          'div',
          { className: 'Room-body' },
          _react2['default'].createElement(
            'div',
            { className: 'Room-body-upper' },
            _react2['default'].createElement(_Messages2['default'], this.props),
            _react2['default'].createElement(_Users2['default'], this.props)
          ),
          _react2['default'].createElement(
            'div',
            { className: 'Room-body-lower' },
            _react2['default'].createElement(_MessageInput2['default'], this.props)
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'Room-footer' },
          _react2['default'].createElement(
            'a',
            { target: '_blank', href: 'https://github.com/elierotenberg/react-nexus-chat' },
            'github'
          )
        )
      );
    }
  }], [{
    key: 'displayName',
    value: 'Room',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string.isRequired,
      messages: _reactNexus2['default'].PropTypes.Immutable.Map,
      status: _reactNexus2['default'].PropTypes.Immutable.Map,
      users: _reactNexus2['default'].PropTypes.Immutable.Map },
    enumerable: true
  }]);

  return Room;
})(_react2['default'].Component);

exports['default'] = Room;
module.exports = exports['default'];