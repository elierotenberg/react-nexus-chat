'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _nexusFlux = require('nexus-flux');

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

var components = {
  App: _componentsApp2['default'] };

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
  var componentName = _ref.componentName;
  var appRootID = _ref.appRootID;
  var data = _ref.data;
  var props = _ref.props;

  return '\n    window[JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(_config.MODULE_NAME)) + '\')][JSON.parse(\'' + JSON.stringify((0, _jsesc2['default'])(componentName)) + '\')]({\n      container: document.getElementById(JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(appRootID)) + '\')),\n      data: JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(data)) + '\'),\n      props: JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(props)) + '\'),\n    });\n  ';
}

var stylesheets = {
  'semantic': rSemantic,
  'react-nexus-chat-css': rCSS };

var loadStylesheetsCode = _.map(stylesheets, function (url, id) {
  return '\n    (function(href, id) {\n      if(!document.getElementById(id)) {\n        var link = document.createElement(\'link\');\n        link.id = id;\n        link.rel = \'stylesheet\';\n        link.type = \'text/css\';\n        link.href = href;\n        document.getElementsByTagName(\'head\')[0].appendChild(link);\n      }\n    }(JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(url)) + '\'), JSON.parse(\'' + (0, _jsesc2['default'])(JSON.stringify(id)) + '\')))\n';
}).join(',\n');

(0, _express2['default'])().use((0, _serveFavicon2['default'])('' + __dirname + '/public/favicon.ico')).use(_express2['default']['static']('' + __dirname + '/public')).use((0, _cors2['default'])())
// Example: /page/CommentsClient?props={threadId:1337}&__clientId=Client3253151
// Loads a full page containing only the component
.get('/page/:componentName', function (req, res) {
  return Promise['try'](function () {
    var componentName = req.params.componentName;

    var clientID = req.query.__clientId || _config.DEFAULT_CLIENT_ID;
    var appRootID = req.query.__appRootId || _.uniqueId('Client' + _.random(1, _config.INT_MAX - 1));
    var props = JSON.parse(req.query.props || '{}');
    var lifespan = new _nexusFlux.Lifespan();
    if (!_.has(components, componentName)) {
      return res.status(404).end();
    }
    var Component = components[componentName];
    var nexus = Component.createNexus({ req: req }, clientID, lifespan);
    return _reactNexus2['default'].prerenderApp(_react2['default'].createElement(Component, props), nexus).then(function (_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2);

      var html = _ref22[0];
      var data = _ref22[1];

      lifespan.release();
      var _Component$getRoutes$0 = Component.getRoutes({ req: req })[0];
      var title = _Component$getRoutes$0.title;
      var description = _Component$getRoutes$0.description;

      res.status(200).send('<!doctype html>\n        <html>\n        <head>\n          <meta charset="utf-8">\n          <meta charset="X-UA-Compatible" content="IE=edge,chrome=1">\n          <title>' + (0, _jsesc2['default'])(title) + '</title>\n          <meta name="description" content="' + (0, _jsesc2['default'])(description) + '">\n          <meta name="viewport" content="width=device-width,initial-scale=1">\n          <link rel="icon" href="' + rFavicon + '" type="image/x-icon">\n          ' + _.map(stylesheets, function (href, id) {
        return '<link id="' + id + '" rel="stylesheet" href="' + href + '">';
      }).join('\n') + '\n        </head>\n        <body>\n          <div id="' + (0, _jsesc2['default'])(appRootID) + '">' + html + '</div>\n          <script src="' + (0, _jsesc2['default'])(rJSON2) + '"></script>\n          <script src="' + (0, _jsesc2['default'])(rClient) + '"></script>\n          <script>\n            ' + mountAppCode({ componentName: componentName, appRootID: appRootID, data: data, props: props }) + '\n          </script>\n          <script>\n            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=\n            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;\n            e=o.createElement(i);r=o.getElementsByTagName(i)[0];\n            e.src=\'//www.google-analytics.com/analytics.js\';\n            r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));\n            ga(\'create\',\'' + (0, _jsesc2['default'])(_config.analytics.UA) + '\',\'auto\');ga(\'send\',\'pageview\');\n          </script>\n        </body>\n        </html>');
    });
  })['catch'](handleError(res));
})
// Example: /iframe/CommentsClient?props={threadId:12234}&__clientId=23523
// Loads the given component into an iframe
.get('/iframe/:componentName', function (req, res) {
  return Promise['try'](function () {
    var componentName = req.params.componentName;

    if (!_.has(components, componentName)) {
      return res.status(404).end();
    }
    var originalUrl = req.originalUrl;

    var iframe = '/iframe';
    var page = '/page';
    var sourceUrl = (0, _url.resolve)(root, page + originalUrl.substring(iframe.length));
    res.status(200).send('<iframe src="' + (0, _jsesc2['default'])(sourceUrl) + '"></iframe>');
  })['catch'](handleError(res));
})
// Example: /fragment/CommentsClient?props={threadId:124124214}&__clientId=13532&__appRootId=99325
// Loads the given component into an inline HTML fragment
.get('/fragment/:componentName', function (req, res) {
  return Promise['try'](function () {
    var componentName = req.params.componentName;

    var clientID = req.query.__clientId || _config.DEFAULT_CLIENT_ID;
    var appRootID = req.query.__appRootId || _.uniqueId('Client' + _.random(1, _config.INT_MAX - 1));
    var props = JSON.parse(req.query.props || '{}');
    var lifespan = new _nexusFlux.Lifespan();
    if (!_.has(components, componentName)) {
      return res.status(404).end();
    }
    var Component = components[componentName];
    var nexus = Component.createNexus({ req: req }, clientID, lifespan);
    return _reactNexus2['default'].prerenderApp(_react2['default'].createElement(Component, props), nexus).then(function (_ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var html = _ref32[0];
      var data = _ref32[1];

      lifespan.release();
      res.status(200).send('\n        <div id="' + (0, _jsesc2['default'])(appRootID) + '">' + html + '</div>\n        <script src="' + rJSON2 + '"></script>\n        <script src="' + rClient + '"></script>\n        <script>\n          ' + mountAppCode({ componentName: componentName, appRootID: appRootID, data: data, props: props }) + '\n          ' + loadStylesheetsCode + '\n        </script>\n      ');
    });
  })['catch'](handleError(res));
})
// Example: /json/CommentsClient?props={threadId:124124214}&__clientId=13532&__appRootId=99325
// Loads the given component into an JSON object { html, css }
.get('/json/:componentName', function (req, res) {
  return Promise['try'](function () {
    var componentName = req.params.componentName;

    var clientID = req.query.__clientId || _config.DEFAULT_CLIENT_ID;
    var appRootID = req.query.__appRootId || _.uniqueId('Client' + _.random(1, _config.INT_MAX - 1));
    var props = JSON.parse(req.query.props || '{}');
    var lifespan = new _nexusFlux.Lifespan();
    if (!_.has(components, componentName)) {
      return res.status(404).end();
    }
    var Component = components[componentName];
    var nexus = Component.createNexus({ req: req }, clientID, lifespan);
    return _reactNexus2['default'].prerenderApp(_react2['default'].createElement(Component, props), nexus).then(function (_ref4) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var html = _ref42[0];
      var data = _ref42[1];

      lifespan.release();
      res.status(200).json({
        html: '\n          <div id="' + (0, _jsesc2['default'])(appRootID) + '">' + html + '</div>\n          <script src="' + rJSON2 + '"></script>\n          <script src="' + rClient + '"></script>\n          <script>\n            ' + mountAppCode({ componentName: componentName, appRootID: appRootID, data: data, props: props }) + '\n          </script>\n        ',
        css: _.values(stylesheets) });
    });
  })['catch'](handleError(res));
}).listen(port['private']);