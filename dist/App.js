"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

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

require("6to5/polyfill");
var Promise = require("bluebird");
var R = require("react-nexus");
var _ = R._;

var _ref = require("./common");

var supportedLocales = _ref.supportedLocales;
var Flux = require("./Flux");
var Root = require("./components/Root");
var template = require("./template");
var router = require("./router");

var App = (function (R) {
  var App = function App() {
    R.App.apply(this, arguments);
  };

  _extends(App, R.App);

  _classProps(App, null, {
    getFluxClass: {
      writable: true,
      value: function () {
        return Flux;
      }
    },
    getRootclass: {
      writable: true,
      value: function () {
        return Root;
      }
    },
    getTemplate: {
      writable: true,
      value: function () {
        return template;
      }
    },
    getTemplateVars: {
      writable: true,
      value: regeneratorRuntime.mark(function callee$1$0(_ref2) {
        var req, _ref3, title, description, canonical, lang;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0: req = _ref2.req;
              context$2$0.next = 3;
              return _.pick(router.match(req.pathname), ["title", "description", "canonical"]);
            case 3: _ref3 = context$2$0.sent;
              title = _ref3.title;
              description = _ref3.description;
              canonical = _ref3.canonical;
              lang = R.Localize.bestLocale(req.headers["accept-langage"], supportedLocales);
              return context$2$0.abrupt("return", { title: title, description: description, canonical: canonical, lang: lang });
            case 9:
            case "end": return context$2$0.stop();
          }
        }, callee$1$0, this);
      })
    },
    getPluginClasses: {
      writable: true,
      value: function () {
        return [R.Plugins.History({ storeName: "memory", dispatcherName: "memory" }), R.Plugins.Window({ storeName: "memory", dispatcherName: "memory" }), R.Plugins.Localize({ storeName: "memory", dispatcherName: "memory", supportedLocales: supportedLocales })];
      }
    }
  });

  return App;
})(R);

module.exports = App;