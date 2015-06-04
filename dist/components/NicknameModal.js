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

var NicknameModal = (function (_React$Component) {
  function NicknameModal(props) {
    _classCallCheck(this, _NicknameModal);

    _get(Object.getPrototypeOf(_NicknameModal.prototype), 'constructor', this).call(this, props);
    this.state = {
      nickname: '',
      disabled: false };
  }

  _inherits(NicknameModal, _React$Component);

  var _NicknameModal = NicknameModal;

  _createClass(_NicknameModal, [{
    key: 'updateNickname',
    value: function updateNickname(e) {
      if (this.state.disabled) {
        return;
      }
      var value = e.target.value;

      this.setState({ nickname: value });
    }
  }, {
    key: 'postNickname',
    value: function postNickname(e) {
      e.preventDefault();
      if (this.state.disabled) {
        return;
      }
      var nickname = this.state.nickname;
      var clientID = this.props.clientID;

      if (!clientID) {
        return;
      }
      this.props.nexus.remote.dispatchAction('/setNickname', { nickname: nickname, clientID: clientID });
      this.setState({ disabled: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _state = this.state;
      var disabled = _state.disabled;
      var nickname = _state.nickname;

      return _react2['default'].createElement(
        'div',
        { className: 'NicknameModal' },
        _react2['default'].createElement(
          'form',
          { onSubmit: function (e) {
              return _this.postNickname(e);
            } },
          _react2['default'].createElement(
            'fieldset',
            { disabled: disabled },
            _react2['default'].createElement('input', { type: 'text', value: nickname, onChange: function (e) {
                return _this.updateNickname(e);
              } }),
            _react2['default'].createElement('input', { type: 'submit', value: 'set nickname' })
          )
        )
      );
    }
  }], [{
    key: 'displayName',
    value: 'NicknameModal',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string,
      nexus: _react2['default'].PropTypes.shape({
        remote: _react2['default'].PropTypes.shape({
          dispatchAction: _react2['default'].PropTypes.func.isRequired }).isRequired }).isRequired },
    enumerable: true
  }]);

  NicknameModal = _reactNexus2['default'].inject(function () {
    return {};
  })(NicknameModal) || NicknameModal;
  return NicknameModal;
})(_react2['default'].Component);

exports['default'] = NicknameModal;
module.exports = exports['default'];