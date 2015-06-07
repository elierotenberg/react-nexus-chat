'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsesc = require('jsesc');

var _jsesc2 = _interopRequireDefault(_jsesc);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _url = require('url');

var _config = require('./config');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

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
var protocol = _config.render.protocol;
var port = _config.render.port;
var host = _config.render.host;

var root = '' + protocol + '://' + host + ':' + port['public'];
var r = function r(t) {
  return (0, _url.resolve)(root, t);
};
var rFavicon = r('/favicon.ico');
var rClient = r('/c.js');
var rJSON2 = r('/json2.min.js');
var rSemantic = r('/semantic.min.css');
var rCSS = r('/c.css');

function handleError(res) {
  return function (err) {
    res.status(500);
    if (__DEV__) {
      res.type('text/plain').send(err.stack);
    } else {
      res.json({ err: err.message });
    }
  };
}

function mountAppCode(_ref) {
  var appRootID = _ref.appRootID;
  var data = _ref.data;

  return '\n    ;(function(data, appRootID) {\n      window.startReactNexusChat(data, document.getElementById(appRootID));\n    })(JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(data)) + '\'), JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(appRootID)) + '\'))\n  ';
}

var stylesheets = {
  'semantic': rSemantic,
  'react-nexus-chat-css': rCSS
};

(0, _express2['default'])().use((0, _serveFavicon2['default'])('' + __dirname + '/public/favicon.ico')).use(_express2['default']['static']('' + __dirname + '/public')).use((0, _cors2['default'])()).get('/', function (req, res) {
  var clientID = _config.DEFAULT_CLIENT_ID;
  var appRootID = _config.APP_ROOT_ID;
  _reactNexus2['default'].renderToString(_react2['default'].createElement(_componentsApp2['default'], { clientID: clientID, req: req })).then(function (_ref2) {
    var html = _ref2.html;
    var data = _ref2.data;
    return res.status(200).send('<!doctype html><html>\n    <head>\n      <meta charset="utf-8">\n      <meta charset="X-UA-Compatible" content="IE=edge,chrome=1">\n      <title>React Nexus Chat</title>\n      <meta name="description" content="The *famous* React Nexus Chat">\n      <meta name="viewport" content="width=device-width,initial-scale=1">\n      <link rel="icon" href="' + rFavicon + '" type="image/x-icon">\n      ' + _.map(stylesheets, function (href, id) {
      return '<link id="' + id + '" rel="stylesheet" href="' + href + '">';
    }).join('\n') + '\n    </head>\n    <body>\n      <div id="' + (0, _jsesc2['default'])(appRootID) + '">' + html + '</div>\n      <script src="' + (0, _jsesc2['default'])(rJSON2) + '"></script>\n      <script src="' + (0, _jsesc2['default'])(rClient) + '"></script>\n      <script>\n        ' + mountAppCode({ appRootID: appRootID, data: data }) + '\n      </script>\n      <script>\n        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=\n        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;\n        e=o.createElement(i);r=o.getElementsByTagName(i)[0];\n        e.src=\'//www.google-analytics.com/analytics.js\';\n        r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));\n        ga(\'create\',\'' + (0, _jsesc2['default'])(_config.analytics.UA) + '\',\'auto\');ga(\'send\',\'pageview\');\n      </script>\n    </body>\n  </html>');
  })['catch'](handleError(res));
}).listen(port['private']);