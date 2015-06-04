'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isomorphicRouter = require('isomorphic-router');

var _isomorphicRouter2 = _interopRequireDefault(_isomorphicRouter);

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

var router = new _isomorphicRouter2['default']();

// patterns are matched from top to bottom.
// pattern, title, description
[['(.*)/App', 'React Nexus Chat', 'The *famous* React Nexus Chat!'], ['(.*)', 'Not found', 'Page not found']].forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3);

  var pattern = _ref2[0];
  var title = _ref2[1];
  var description = _ref2[2];
  return router.on(pattern, function (query, params, hash) {
    return { title: title, description: description, query: query, params: params, hash: hash };
  });
});

exports['default'] = router;
module.exports = exports['default'];