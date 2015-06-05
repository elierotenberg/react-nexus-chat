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

var _sha256 = require('sha256');

var _sha2562 = _interopRequireDefault(_sha256);

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

var MessageInput = (function (_React$Component) {
  function MessageInput(props) {
    _classCallCheck(this, _MessageInput);

    _get(Object.getPrototypeOf(_MessageInput.prototype), 'constructor', this).call(this, props);
    this.state = { message: '' };
    this._raf = null;
  }

  _inherits(MessageInput, _React$Component);

  var _MessageInput = MessageInput;

  _createClass(_MessageInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var _this = this;

      if (!this.hasNickname()) {
        if (this._raf !== null) {
          _raf2['default'].cancel(this._raf);
        }
        this._raf = (0, _raf2['default'])(function () {
          _this._raf = null;
          if (_this.hasNickname()) {
            _this.refs.messageInput.getDOMNode().focus();
          }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._raf !== null) {
        _raf2['default'].cancel(this._raf);
        this._raf = null;
      }
    }
  }, {
    key: 'updateMessage',
    value: function updateMessage(e) {
      e.preventDefault();
      this.setState({ message: e.target.value });
    }
  }, {
    key: 'postMessage',
    value: function postMessage(e) {
      e.preventDefault();
      if (!this.hasNickname()) {
        return;
      }
      var message = this.state.message;
      var _props = this.props;
      var clientID = _props.clientID;
      var nexus = _props.nexus;

      if (message.startsWith('/nick')) {
        nexus.remote.dispatchAction('/setNickname', { clientID: clientID, nickname: message.slice('/nick'.length + 1) });
      } else if (message.startsWith('/topic')) {
        nexus.remote.dispatchAction('/setTopic', { clientID: clientID, topic: message.slice('/topic'.length + 1) });
      } else {
        nexus.remote.dispatchAction('/postMessage', { clientID: clientID, text: message });
      }
      this.setState({ message: '' });
    }
  }, {
    key: 'hasNickname',
    value: function hasNickname() {
      var _props2 = this.props;
      var clientID = _props2.clientID;
      var users = _props2.users;

      return users.get((0, _sha2562['default'])(clientID)) !== void 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var message = this.state.message;

      var disabled = !this.hasNickname();
      var onChange = function onChange(e) {
        return _this2.updateMessage(e);
      };
      var onSubmit = function onSubmit(e) {
        return _this2.postMessage(e);
      };
      return _react2['default'].createElement(
        'div',
        { className: 'MessageInput' },
        _react2['default'].createElement(
          'form',
          { onSubmit: onSubmit },
          _react2['default'].createElement(
            'div',
            { className: 'ui fluid left icon input' },
            _react2['default'].createElement('input', { ref: 'messageInput', type: 'text', onChange: onChange, value: message, disabled: disabled,
              placeholder: 'Type message...' }),
            _react2['default'].createElement('i', { className: 'comment icon' })
          )
        )
      );
    }
  }], [{
    key: 'displayName',
    value: 'MessageInput',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string.isRequired,
      messages: _reactNexus2['default'].PropTypes.Immutable.Map,
      nexus: _react2['default'].PropTypes.shape({
        remote: _react2['default'].PropTypes.shape({
          dispatchAction: _react2['default'].PropTypes.func.isRequired }).isRequired }).isRequired,
      status: _reactNexus2['default'].PropTypes.Immutable.Map,
      users: _reactNexus2['default'].PropTypes.Immutable.Map },
    enumerable: true
  }]);

  MessageInput = _reactNexus2['default'].inject(function () {
    return {};
  })(MessageInput) || MessageInput;
  return MessageInput;
})(_react2['default'].Component);

exports['default'] = MessageInput;
module.exports = exports['default'];