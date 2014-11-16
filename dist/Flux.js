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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImc6L3JlYWN0LW5leHVzL3JlYWN0LW5leHVzLXN0YXJ0ZXJraXQvc3JjL0ZsdXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFFOUMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVuQyxJQUFNLG9CQUFvQixHQUFHO1NBQU0sQ0FBQyxFQUVuQyxDQUFDO0NBQUEsQ0FBQzs7QUFFSCxJQUFNLG9CQUFvQixHQUFHO1NBQU0sQ0FBQyxFQUVuQyxDQUFDO0NBQUEsQ0FBQzs7SUFFRyxJQUFJLGNBQVMsQ0FBQztNQUFkLElBQUksWUFBSixJQUFJO0FBQVMsS0FBQyxDQUFDLElBQUk7OztXQUFuQixJQUFJLEVBQVMsQ0FBQyxDQUFDLElBQUk7O2NBQW5CLElBQUk7QUFDUCxhQUFTOztxQ0FBQTtZQU1KLE1BQU07Ozs7QUFMVixrQkFBSSxDQUNILGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQ2xELG9CQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUN2RSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFeEUsb0JBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O3FCQUM1RSxNQUFNLENBQUMsU0FBUzs7O0FBRXRCLGtCQUFJLENBQ0gsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FDNUQsb0JBQW9CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQ2pGLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztPQUM3RTs7QUFFRCxXQUFPOzthQUFBLFlBQUc7QUFDUixZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xDLFlBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekMsWUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFdkMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQyxZQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pDLFlBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRXZDLFlBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUExQkosQUEyQmYsU0EzQmdCLENBQUMsSUFBSSxXQTJCZixPQUFPLEtBQUEsTUFBRSxDQUFDO09BQ2pCOzs7O1NBNUJHLElBQUk7R0FBUyxDQUFDOztBQStCcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ3ZCLFFBQU0sRUFBRSxJQUFJLEVBQ2IsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6IkZsdXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCc2dG81L3BvbHlmaWxsJyk7XG5jb25zdCBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmNvbnN0IFIgPSByZXF1aXJlKCdyZWFjdC1uZXh1cycpO1xuY29uc3QgXyA9IFIuXztcbmNvbnN0IFVwbGluayA9IHJlcXVpcmUoJ25leHVzLXVwbGluay1jbGllbnQnKTtcblxuY29uc3QgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuY29uc3QgbWVtb3J5QWN0aW9uSGFuZGxlcnMgPSAoKSA9PiAoe1xuXG59KTtcblxuY29uc3QgdXBsaW5rQWN0aW9uSGFuZGxlcnMgPSAoKSA9PiAoe1xuXG59KTtcblxuY2xhc3MgRmx1eCBleHRlbmRzIFIuRmx1eCB7XG4gICpib290c3RyYXAoKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIHRoaXNcbiAgICAucmVnaXN0ZXJTdG9yZSgnbWVtb3J5JywgbmV3IFIuU3RvcmUuTWVtb3J5U3RvcmUoKSlcbiAgICAucmVnaXN0ZXJFdmVudEVtaXR0ZXIoJ21lbW9yeScsIG5ldyBSLkV2ZW50RW1pdHRlci5NZW1vcnlFdmVudEVtaXR0ZXIoKSlcbiAgICAucmVnaXN0ZXJEaXNwYXRjaGVyKCdtZW1vcnknLCBuZXcgUi5EaXNwYXRjaGVyKG1lbW9yeUFjdGlvbkhhbmRsZXJzKHRoaXMpKSk7XG5cbiAgICBsZXQgdXBsaW5rID0gdGhpcy51cGxpbmsgPSBuZXcgVXBsaW5rKHsgdXJsOiBjb21tb24udXBsaW5rLnVybCwgZ3VpZDogdGhpcy5ndWlkIH0pO1xuICAgIHlpZWxkIHVwbGluay5oYW5kc2hha2U7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgdGhpc1xuICAgIC5yZWdpc3RlclN0b3JlKCd1cGxpbmsnLCBuZXcgUi5TdG9yZS5VcGxpbmtTdG9yZSh7IHVwbGluayB9KSlcbiAgICAucmVnaXN0ZXJFdmVudEVtaXR0ZXIoJ3VwbGluaycsIG5ldyBSLkV2ZW50RW1pdHRlci5VcGxpbmtFdmVudEVtaXR0ZXIoeyB1cGxpbmsgfSkpXG4gICAgLnJlZ2lzdGVyRGlzcGF0Y2hlcigndXBsaW5rJywgbmV3IFIuRGlzcGF0Y2hlcih1cGxpbmtBY3Rpb25IYW5kbGVycyh0aGlzKSkpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmdldFN0b3JlKCdtZW1vcnknKS5kZXN0cm95KCk7XG4gICAgdGhpcy5nZXRFdmVudEVtaXR0ZXIoJ21lbW9yeScpLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdldERpc3BhdGNoZXIoJ21lbW9yeScpLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZ2V0U3RvcmUoJ3VwbGluaycpLmRlc3Ryb3koKTtcbiAgICB0aGlzLmdldEV2ZW50RW1pdHRlcigndXBsaW5rJykuZGVzdHJveSgpO1xuICAgIHRoaXMuZ2V0RGlzcGF0Y2hlcigndXBsaW5rJykuZGVzdHJveSgpO1xuXG4gICAgdGhpcy51cGxpbmsuZGVzdHJveSgpO1xuICAgIHRoaXMudXBsaW5rID0gbnVsbDtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cbn1cblxuXy5leHRlbmQoRmx1eC5wcm90b3R5cGUsIHtcbiAgdXBsaW5rOiBudWxsLFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmx1eDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==