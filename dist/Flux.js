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

  _classProps(Flux, null, {
    bootstrap: {
      writable: true,
      value: regeneratorRuntime.mark(function callee$1$0() {
        var uplink;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0: // jshint ignore:line
              this.registerStore("memory", new R.Store.MemoryStore()).registerEventEmitter("memory", new R.EventEmitter.MemoryEventEmitter()).registerDispatcher("memory", new R.Dispatcher(memoryActionHandlers(this)));

              uplink = this.uplink = new Uplink({ url: common.uplink.url, guid: this.guid });
              context$2$0.next = 4;
              return uplink.handshake;
            case 4: // jshint ignore:line

              this.registerStore("uplink", new R.Store.UplinkStore({ uplink: uplink })).registerEventEmitter("uplink", new R.EventEmitter.UplinkEventEmitter({ uplink: uplink })).registerDispatcher("uplink", new R.Dispatcher(uplinkActionHandlers(this)));
            case 5:
            case "end": return context$2$0.stop();
          }
        }, callee$1$0, this);
      })
    },
    destroy: {
      writable: true,
      value: function () {
        this.getStore("memory").destroy();
        this.getEventEmitter("memory").destroy();
        this.getDispatcher("memory").destroy();

        this.getStore("uplink").destroy();
        this.getEventEmitter("uplink").destroy();
        this.getDispatcher("uplink").destroy();

        this.uplink.destroy();
        this.uplink = null;
        R.Flux.prototype.destroy.call(this);
      }
    }
  });

  return Flux;
})(R);

_.extend(Flux.prototype, {
  uplink: null });

module.exports = Flux;