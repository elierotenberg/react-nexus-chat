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
var Promise = require("bluebird");var __DEV__ = (process.env.NODE_ENV !== "production");
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
      value: regeneratorRuntime.mark(function _callee() {
        var _this = this;
        var uplink;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (true) switch (_context.prev = _context.next) {
            case 0: // jshint ignore:line
              _this.registerStore("memory", new R.Store.MemoryStore()).registerEventEmitter("memory", new R.EventEmitter.MemoryEventEmitter()).registerDispatcher("memory", new R.Dispatcher(memoryActionHandlers(_this)));

              uplink = _this.uplink = new Uplink({ url: common.uplink.url, guid: _this.guid });
              _context.next = 4;
              return uplink.handshake;
            case 4: // jshint ignore:line

              _this.registerStore("uplink", new R.Store.UplinkStore({ uplink: uplink })).registerEventEmitter("uplink", new R.EventEmitter.UplinkEventEmitter({ uplink: uplink })).registerDispatcher("uplink", new R.Dispatcher(uplinkActionHandlers(_this)));
            case 5:
            case "end": return _context.stop();
          }
        }, _callee, this);
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
//# sourceMappingURL=data:application/json;base64,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QztPQUNqQjs7OztTQTVCRyxJQUFJO0dBQVMsQ0FBQzs7QUErQnBCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUN2QixRQUFNLEVBQUUsSUFBSSxFQUNiLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJGbHV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUiA9IHJlcXVpcmUoJ3JlYWN0LW5leHVzJyk7XHJcbmNvbnN0IF8gPSBSLl87XHJcbmNvbnN0IFVwbGluayA9IHJlcXVpcmUoJ25leHVzLXVwbGluay1jbGllbnQnKTtcclxuXHJcbmNvbnN0IGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XHJcblxyXG5jb25zdCBtZW1vcnlBY3Rpb25IYW5kbGVycyA9ICgpID0+ICh7XHJcblxyXG59KTtcclxuXHJcbmNvbnN0IHVwbGlua0FjdGlvbkhhbmRsZXJzID0gKCkgPT4gKHtcclxuXHJcbn0pO1xyXG5cclxuY2xhc3MgRmx1eCBleHRlbmRzIFIuRmx1eCB7XHJcbiAgKmJvb3RzdHJhcCgpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcbiAgICB0aGlzXHJcbiAgICAucmVnaXN0ZXJTdG9yZSgnbWVtb3J5JywgbmV3IFIuU3RvcmUuTWVtb3J5U3RvcmUoKSlcclxuICAgIC5yZWdpc3RlckV2ZW50RW1pdHRlcignbWVtb3J5JywgbmV3IFIuRXZlbnRFbWl0dGVyLk1lbW9yeUV2ZW50RW1pdHRlcigpKVxyXG4gICAgLnJlZ2lzdGVyRGlzcGF0Y2hlcignbWVtb3J5JywgbmV3IFIuRGlzcGF0Y2hlcihtZW1vcnlBY3Rpb25IYW5kbGVycyh0aGlzKSkpO1xyXG5cclxuICAgIGxldCB1cGxpbmsgPSB0aGlzLnVwbGluayA9IG5ldyBVcGxpbmsoeyB1cmw6IGNvbW1vbi51cGxpbmsudXJsLCBndWlkOiB0aGlzLmd1aWQgfSk7XHJcbiAgICB5aWVsZCB1cGxpbmsuaGFuZHNoYWtlOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuXHJcbiAgICB0aGlzXHJcbiAgICAucmVnaXN0ZXJTdG9yZSgndXBsaW5rJywgbmV3IFIuU3RvcmUuVXBsaW5rU3RvcmUoeyB1cGxpbmsgfSkpXHJcbiAgICAucmVnaXN0ZXJFdmVudEVtaXR0ZXIoJ3VwbGluaycsIG5ldyBSLkV2ZW50RW1pdHRlci5VcGxpbmtFdmVudEVtaXR0ZXIoeyB1cGxpbmsgfSkpXHJcbiAgICAucmVnaXN0ZXJEaXNwYXRjaGVyKCd1cGxpbmsnLCBuZXcgUi5EaXNwYXRjaGVyKHVwbGlua0FjdGlvbkhhbmRsZXJzKHRoaXMpKSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5nZXRTdG9yZSgnbWVtb3J5JykuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5nZXRFdmVudEVtaXR0ZXIoJ21lbW9yeScpLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuZ2V0RGlzcGF0Y2hlcignbWVtb3J5JykuZGVzdHJveSgpO1xyXG5cclxuICAgIHRoaXMuZ2V0U3RvcmUoJ3VwbGluaycpLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuZ2V0RXZlbnRFbWl0dGVyKCd1cGxpbmsnKS5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmdldERpc3BhdGNoZXIoJ3VwbGluaycpLmRlc3Ryb3koKTtcclxuXHJcbiAgICB0aGlzLnVwbGluay5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnVwbGluayA9IG51bGw7XHJcbiAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcblxyXG5fLmV4dGVuZChGbHV4LnByb3RvdHlwZSwge1xyXG4gIHVwbGluazogbnVsbCxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZsdXg7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==