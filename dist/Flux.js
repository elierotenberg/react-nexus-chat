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
        var _this = this;
        var uplink;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
          while (true) switch (context$2$0.prev = context$2$0.next) {
            case 0: // jshint ignore:line
              _this.registerStore("memory", new R.Store.MemoryStore()).registerEventEmitter("memory", new R.EventEmitter.MemoryEventEmitter()).registerDispatcher("memory", new R.Dispatcher(memoryActionHandlers(_this)));

              uplink = _this.uplink = new Uplink({ url: common.uplink.url, guid: _this.guid });
              context$2$0.next = 4;
              return uplink.handshake;
            case 4: // jshint ignore:line

              _this.registerStore("uplink", new R.Store.UplinkStore({ uplink: uplink })).registerEventEmitter("uplink", new R.EventEmitter.UplinkEventEmitter({ uplink: uplink })).registerDispatcher("uplink", new R.Dispatcher(uplinkActionHandlers(_this)));
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
//# sourceMappingURL=data:application/json;base64,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U0FBUyxFQUFFO0FBQ3ZCLFFBQU0sRUFBRSxJQUFJLEVBQ2IsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6IkZsdXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSID0gcmVxdWlyZSgncmVhY3QtbmV4dXMnKTtcclxuY29uc3QgXyA9IFIuXztcclxuY29uc3QgVXBsaW5rID0gcmVxdWlyZSgnbmV4dXMtdXBsaW5rLWNsaWVudCcpO1xyXG5cclxuY29uc3QgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcclxuXHJcbmNvbnN0IG1lbW9yeUFjdGlvbkhhbmRsZXJzID0gKCkgPT4gKHtcclxuXHJcbn0pO1xyXG5cclxuY29uc3QgdXBsaW5rQWN0aW9uSGFuZGxlcnMgPSAoKSA9PiAoe1xyXG5cclxufSk7XHJcblxyXG5jbGFzcyBGbHV4IGV4dGVuZHMgUi5GbHV4IHtcclxuICAqYm9vdHN0cmFwKCkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcclxuICAgIHRoaXNcclxuICAgIC5yZWdpc3RlclN0b3JlKCdtZW1vcnknLCBuZXcgUi5TdG9yZS5NZW1vcnlTdG9yZSgpKVxyXG4gICAgLnJlZ2lzdGVyRXZlbnRFbWl0dGVyKCdtZW1vcnknLCBuZXcgUi5FdmVudEVtaXR0ZXIuTWVtb3J5RXZlbnRFbWl0dGVyKCkpXHJcbiAgICAucmVnaXN0ZXJEaXNwYXRjaGVyKCdtZW1vcnknLCBuZXcgUi5EaXNwYXRjaGVyKG1lbW9yeUFjdGlvbkhhbmRsZXJzKHRoaXMpKSk7XHJcblxyXG4gICAgbGV0IHVwbGluayA9IHRoaXMudXBsaW5rID0gbmV3IFVwbGluayh7IHVybDogY29tbW9uLnVwbGluay51cmwsIGd1aWQ6IHRoaXMuZ3VpZCB9KTtcclxuICAgIHlpZWxkIHVwbGluay5oYW5kc2hha2U7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG5cclxuICAgIHRoaXNcclxuICAgIC5yZWdpc3RlclN0b3JlKCd1cGxpbmsnLCBuZXcgUi5TdG9yZS5VcGxpbmtTdG9yZSh7IHVwbGluayB9KSlcclxuICAgIC5yZWdpc3RlckV2ZW50RW1pdHRlcigndXBsaW5rJywgbmV3IFIuRXZlbnRFbWl0dGVyLlVwbGlua0V2ZW50RW1pdHRlcih7IHVwbGluayB9KSlcclxuICAgIC5yZWdpc3RlckRpc3BhdGNoZXIoJ3VwbGluaycsIG5ldyBSLkRpc3BhdGNoZXIodXBsaW5rQWN0aW9uSGFuZGxlcnModGhpcykpKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmdldFN0b3JlKCdtZW1vcnknKS5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmdldEV2ZW50RW1pdHRlcignbWVtb3J5JykuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5nZXREaXNwYXRjaGVyKCdtZW1vcnknKS5kZXN0cm95KCk7XHJcblxyXG4gICAgdGhpcy5nZXRTdG9yZSgndXBsaW5rJykuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5nZXRFdmVudEVtaXR0ZXIoJ3VwbGluaycpLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuZ2V0RGlzcGF0Y2hlcigndXBsaW5rJykuZGVzdHJveSgpO1xyXG5cclxuICAgIHRoaXMudXBsaW5rLmRlc3Ryb3koKTtcclxuICAgIHRoaXMudXBsaW5rID0gbnVsbDtcclxuICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICB9XHJcbn1cclxuXHJcbl8uZXh0ZW5kKEZsdXgucHJvdG90eXBlLCB7XHJcbiAgdXBsaW5rOiBudWxsLFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmx1eDtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9