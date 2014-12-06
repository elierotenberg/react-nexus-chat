"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__; /* jshint ignore:start */
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
  return "<!DOCTYPE html" + (lang ? " lang=\"" + X(lang) + "\"" : "") + ">\n  <html>\n    <head>\n      <meta charset=\"utf-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      " + (description ? "<meta name=\"description\" content=\"" + X(description) + "\">" : "") + "\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <title>" + (title || "") + "</title>\n      <link rel=\"stylesheet\" type=\"text/css\" href=\"/p" + (__DEV__ ? "" : ".min") + ".css\">\n      <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>\n      <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>\n      <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>\n    </head>\n    <body>\n      <div id=\"__ReactNexusRoot\">\n        " + rootHtml + "\n      </div>\n      <script type=\"text/javascript\">\n        (function(w, d, i, f, h, g) {\n          w.__ReactNexus = { serializedFlux: f, serializedHeaders: h, guid: g, rootElement: d.getElementById(i) };\n        }(window, document, '__ReactNexusRoot', '" + serializedFlux + "', '" + serializedHeaders + "', '" + guid + "'))\n      </script>\n      <script type=\"text/javascript\" src=\"/p" + (__DEV__ ? "" : ".min") + ".js\"></script>\n    </body>\n  </html>\n  ";
};
/* jshint ignore:end */