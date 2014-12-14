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
var Uplink = require("nexus-uplink-client");

var common = require("./common");

var memoryActionHandlers = function () {
  return ({});
};

var uplinkActionHandlers = function () {
  return ({});
};

var Flux = (function (R) {
  var Flux = function Flux() {
    R.Flux.apply(this, arguments);
  };

  _extends(Flux, R.Flux);

  Flux.prototype.bootstrap = regeneratorRuntime.mark(function _callee() {
    var _this = this;
    var uplink;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (true) switch (_context.prev = _context.next) {
        case 0: // jshint ignore:line
          _this.registerStore("memory", new R.Store.MemoryStore()).registerEventEmitter("memory", new R.EventEmitter.MemoryEventEmitter()).registerDispatcher("memory", new R.Dispatcher(memoryActionHandlers(_this)));

          uplink = _this.uplink = new Uplink({ url: common.uplink.url, guid: _this.guid });


          _this.registerStore("uplink", new R.Store.UplinkStore({ uplink: uplink })).registerEventEmitter("uplink", new R.EventEmitter.UplinkEventEmitter({ uplink: uplink })).registerDispatcher("uplink", new R.Dispatcher(uplinkActionHandlers(_this)));
        case 3:
        case "end": return _context.stop();
      }
    }, _callee, this);
  });
  Flux.prototype.destroy = function () {
    this.getStore("memory").destroy();
    this.getEventEmitter("memory").destroy();
    this.getDispatcher("memory").destroy();

    this.getStore("uplink").destroy();
    this.getEventEmitter("uplink").destroy();
    this.getDispatcher("uplink").destroy();

    this.uplink.destroy();
    this.uplink = null;
    R.Flux.prototype.destroy.call(this);
  };

  return Flux;
})(R);

_.extend(Flux.prototype, {
  uplink: null });

module.exports = Flux;