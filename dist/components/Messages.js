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

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactIdenticon = require('react-identicon');

var _reactIdenticon2 = _interopRequireDefault(_reactIdenticon);

var _reactStaticsStyles = require('react-statics-styles');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

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

function getTimeString(date) {
  return (0, _moment2['default'])(date).format('HH:mm:ss');
}

var Messages = (function (_React$Component) {
  function Messages() {
    _classCallCheck(this, _Messages);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Messages, _React$Component);

  var _Messages = Messages;

  _createClass(_Messages, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      if (this.props.messages !== nextProps.messages) {
        (0, _raf2['default'])(function () {
          var messagesNode = _this.refs.messages.getDOMNode();
          messagesNode.scrollTop = messagesNode.scrollHeight;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var messages = this.props.messages;

      return _react2['default'].createElement(
        'div',
        { className: 'Messages ui list', ref: 'messages' },
        messages.sort(function (a, b) {
          return a.date - b.date;
        }).map(function (_ref) {
          var id = _ref.id;
          var h = _ref.h;
          var nickname = _ref.nickname;
          var text = _ref.text;
          var date = _ref.date;
          return _react2['default'].createElement(
            'div',
            { key: id, className: 'item' },
            _react2['default'].createElement(_reactIdenticon2['default'], { id: h, type: 'retro', className: 'ui top aligned mini avatar image' }),
            _react2['default'].createElement(
              'div',
              { className: 'Messages-content content' },
              _react2['default'].createElement(
                'div',
                { className: 'header' },
                nickname,
                ' ',
                _react2['default'].createElement(
                  'span',
                  { className: 'Messages-date' },
                  getTimeString(date)
                )
              ),
              text
            )
          );
        }).toArray()
      );
    }
  }], [{
    key: 'displayName',
    value: 'Messages',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string.isRequired,
      messages: _reactNexus2['default'].PropTypes.Immutable.Map,
      status: _reactNexus2['default'].PropTypes.Immutable.Map,
      users: _reactNexus2['default'].PropTypes.Immutable.Map
    },
    enumerable: true
  }]);

  Messages = (0, _pureRenderDecorator2['default'])(Messages) || Messages;
  Messages = (0, _reactStaticsStyles.styles)({
    '.Messages': {
      height: '600px',
      overflowY: 'scroll'
    },

    '.Messages-content': {
      maxWidth: '90%'
    }
  })(Messages) || Messages;
  return Messages;
})(_react2['default'].Component);

exports['default'] = Messages;
module.exports = exports['default'];