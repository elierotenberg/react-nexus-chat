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

var _reactStaticsStyles = require('react-statics-styles');

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
    _classCallCheck(this, _Room);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Room, _React$Component);

  var _Room = Room;

  _createClass(_Room, [{
    key: 'render',
    value: function render() {
      var status = this.props.status;

      var topic = status.get('topic');
      var heart = _react2['default'].createElement('i', { className: 'heart icon' });
      var credits = _react2['default'].createElement(
        'a',
        { target: '_blank', href: 'https://twitter.com/elierotenberg' },
        '@elierotenberg'
      );
      var github = _react2['default'].createElement(
        'a',
        { target: '_blank', href: 'https://github.com/elierotenberg/react-nexus-chat' },
        _react2['default'].createElement('i', { className: 'github icon' })
      );
      return _react2['default'].createElement(
        'div',
        { className: 'Room' },
        _react2['default'].createElement(
          'div',
          { className: 'ui page grid' },
          _react2['default'].createElement(
            'div',
            { className: 'sixteen column wide' },
            _react2['default'].createElement(
              'div',
              { className: 'ui top attached header' },
              topic
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ui attached segment' },
              _react2['default'].createElement(
                'div',
                { className: 'ui grid' },
                _react2['default'].createElement(
                  'div',
                  { className: 'eleven wide column' },
                  _react2['default'].createElement(_Messages2['default'], this.props)
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'five wide column' },
                  _react2['default'].createElement(_Users2['default'], this.props)
                )
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ui attached segment' },
              _react2['default'].createElement(_MessageInput2['default'], this.props)
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ui bottom attached segment' },
              'React Nexus Demo Chat made with ',
              heart,
              ' by ',
              credits,
              '. Check out the code on ',
              github,
              '!'
            )
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
      users: _reactNexus2['default'].PropTypes.Immutable.Map
    },
    enumerable: true
  }]);

  Room = (0, _pureRenderDecorator2['default'])(Room) || Room;
  Room = (0, _reactStaticsStyles.styles)({
    '.Room': {
      paddingTop: '1em'
    }
  })(Room) || Room;
  return Room;
})(_react2['default'].Component);

exports['default'] = Room;
module.exports = exports['default'];