"use strict";

require("6to5/polyfill");var Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__; /* jshint ignore:start */
// Escape double-quotes
var X = function (x) {
  return x.replace(/\"/g, "\\\"");
};

module.exports = function (_ref) {
  var title = _ref.title;
  var description = _ref.description;
  var canonical = _ref.canonical;
  var lang = _ref.lang;
  var rootHtml = _ref.rootHtml;
  var serializedFlux = _ref.serializedFlux;
  var serializedHeaders = _ref.serializedHeaders;
  var guid = _ref.guid;
  return "<!DOCTYPE html" + (lang ? " lang=\"" + X(lang) + "\"" : "") + ">\r\n  <html>\r\n    <head>\r\n      <meta charset=\"utf-8\">\r\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n      " + (description ? "<meta name=\"description\" content=\"" + X(description) + "\">" : "") + "\r\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n      <title>" + (title || "") + "</title>\r\n      <link rel=\"stylesheet\" type=\"text/css\" href=\"/p" + (__DEV__ ? "" : ".min") + ".css\">\r\n      <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>\r\n      <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>\r\n      <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>\r\n    </head>\r\n    <body>\r\n      <div id=\"__ReactNexusRoot\">\r\n        " + rootHtml + "\r\n      </div>\r\n      <script type=\"text/javascript\">\r\n        (function(w, d, i, f, h, g) {\r\n          w.__ReactNexus = { serializedFlux: f, serializedHeaders: h, guid: g, rootElement: d.getElementById(i) };\r\n        }(window, document, '__ReactNexusRoot', '" + serializedFlux + "', '" + serializedHeaders + "', '" + guid + "'))\r\n      </script>\r\n      <script type=\"text/javascript\" src=\"/p" + (__DEV__ ? "" : ".min") + ".js\"></script>\r\n    </body>\r\n  </html>\r\n  ";
};
/* jshint ignore:end */