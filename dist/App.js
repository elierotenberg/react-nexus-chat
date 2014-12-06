"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var url = require("url");

var _ref = require("./common");

var supportedLocales = _ref.supportedLocales;
var Flux = require("./Flux");
var Root = require("./components/Root");
var template = require("./template");
var router = require("./router");

var History = R.Plugins.History({ storeName: "memory", dispatcherName: "memory" });
var Window = R.Plugins.Window({ storeName: "memory", dispatcherName: "memory" });
var Localize = R.Plugins.Localize({ storeName: "memory", dispatcherName: "memory", supportedLocales: supportedLocales });

var App = (function (R) {
  var App = function App() {
    R.App.apply(this, arguments);
  };

  _extends(App, R.App);

  App.prototype.getFluxClass = function () {
    return Flux;
  };

  App.prototype.getRootClass = function () {
    return Root;
  };

  App.prototype.getTemplate = function () {
    return template;
  };

  App.prototype.getTemplateVars = regeneratorRuntime.mark(function _callee(_ref2) {
    var req, _ref3, pathname, _ref4, title, description, canonical, lang;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (true) switch (_context.prev = _context.next) {
        case 0: req = _ref2.req;
          _ref3 = url.parse(req.url);
          pathname = _ref3.pathname;
          _context.next = 5;
          return _.pick(router.match(pathname), ["title", "description", "canonical"]);
        case 5: _ref4 = _context.sent;
          title = _ref4.title;
          description = _ref4.description;
          canonical = _ref4.canonical;
          lang = R.Plugins.Localize.bestLocale(req.headers["accept-langage"], supportedLocales).language;
          return _context.abrupt("return", { title: title, description: description, canonical: canonical, lang: lang });
        case 11:
        case "end": return _context.stop();
      }
    }, _callee, this);
  });
  App.prototype.getPluginsClasses = function () {
    return [History, Window, Localize];
  };

  return App;
})(R);

module.exports = App;