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

var _reactIdenticon = require('react-identicon');

var _reactIdenticon2 = _interopRequireDefault(_reactIdenticon);

var _sha256 = require('sha256');

var _sha2562 = _interopRequireDefault(_sha256);

var _reactStaticsStyles = require('react-statics-styles');

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.nicknameInput.getDOMNode().focus();
    }
  }, {
    key: 'updateNickname',
    value: function updateNickname(e) {
      if (this.state.disabled) {
        return;
      }
      var value = e.target.value;

      if (value.length > 14) {
        return;
      }
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
      var clientID = this.props.clientID;

      var onChange = function onChange(e) {
        return _this.updateNickname(e);
      };
      return _react2['default'].createElement(
        'div',
        { className: 'NicknameModal' },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'form',
            { onSubmit: function (e) {
                return _this.postNickname(e);
              }, className: 'ui fluid form segment' },
            _react2['default'].createElement(
              'h4',
              { className: 'header' },
              'Welcome to React Nexus Chat!'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Your avatar is ',
              _react2['default'].createElement(_reactIdenticon2['default'], { id: (0, _sha2562['default'])(clientID), type: 'retro', className: 'ui mini avatar image' })
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Please enter a nickname to be able to post messages.'
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ui action input' },
              _react2['default'].createElement('input', { type: 'text', ref: 'nicknameInput', value: nickname, onChange: onChange,
                placeholder: 'Pick a nickname', disabled: disabled }),
              _react2['default'].createElement(
                'button',
                { className: 'ui button', disabled: disabled },
                'Go!'
              )
            )
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
  NicknameModal = (0, _reactStaticsStyles.styles)({
    '.NicknameModal': {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(120, 120, 120, 0.8)',
      cursor: 'not-allowed' },

    '.NicknameModal > div': {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)' } })(NicknameModal) || NicknameModal;
  return NicknameModal;
})(_react2['default'].Component);

exports['default'] = NicknameModal;
module.exports = exports['default'];