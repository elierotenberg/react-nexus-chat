'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _localesEn = require('./locales/en');

var _localesEn2 = _interopRequireDefault(_localesEn);

var _localesFr = require('./locales/fr');

var _localesFr2 = _interopRequireDefault(_localesFr);

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
exports['default'] = {
  MODULE_NAME: 'react-nexus-chat',

  analytics: {
    UA: 'UA-XXXXX-X' },

  render: {
    port: {
      'public': 80,
      'private': 80 },
    host: 'localhost',
    protocol: 'http' },

  flux: {
    port: {
      'public': 8080,
      'private': 8080 },
    host: 'localhost',
    protocol: 'http' },

  intl: {
    en: _localesEn2['default'],
    'en-US': _localesEn2['default'],
    fr: _localesFr2['default'],
    'fr-FR': _localesFr2['default'] },

  INT_MAX: 9007199254740992,
  DEFAULT_CLIENT_ID: 'DefaultClientId' };
module.exports = exports['default'];