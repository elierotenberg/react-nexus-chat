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
    getRootClass: {
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
          while (true) switch (context$2$0.prev = context$2$0.next) {
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
    getPluginsClasses: {
      writable: true,
      value: function () {
        return [R.Plugins.History({ storeName: "memory", dispatcherName: "memory" }), R.Plugins.Window({ storeName: "memory", dispatcherName: "memory" }), R.Plugins.Localize({ storeName: "memory", dispatcherName: "memory", supportedLocales: supportedLocales })];
      }
    }
  });

  return App;
})(R);

module.exports = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7V0FFZSxPQUFPLENBQUMsVUFBVSxDQUFDOztJQUF4QyxnQkFBZ0IsUUFBaEIsZ0JBQWdCO0FBQ3hCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMxQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU3QixHQUFHLGNBQVMsQ0FBQztNQUFiLEdBQUcsWUFBSCxHQUFHO0FBQVMsS0FBQyxDQUFDLEdBQUc7OztXQUFqQixHQUFHLEVBQVMsQ0FBQyxDQUFDLEdBQUc7O2NBQWpCLEdBQUc7QUFDUCxnQkFBWTs7YUFBQSxZQUFHO0FBQUUsZUFBTyxJQUFJLENBQUM7T0FBRTs7QUFFL0IsZ0JBQVk7O2FBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDO09BQUU7O0FBRS9CLGVBQVc7O2FBQUEsWUFBRztBQUFFLGVBQU8sUUFBUSxDQUFDO09BQUU7O0FBRWpDLG1CQUFlOztxQ0FBQTtZQUFHLEdBQUcsU0FDZCxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFDL0IsSUFBSTs7O29CQUZTLEdBQUcsU0FBSCxHQUFHOztxQkFDMEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBQWpILG1CQUFLLFNBQUwsS0FBSztBQUFFLHlCQUFXLFNBQVgsV0FBVztBQUFFLHVCQUFTLFNBQVQsU0FBUztBQUMvQixrQkFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztrREFDMUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFOzs7OztPQUMvQzs7QUFFRCxxQkFBaUI7O2FBQUEsWUFBRztBQUNsQixlQUFPLENBQ0wsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUNwRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQ25FLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFoQixnQkFBZ0IsRUFBRSxDQUFDLENBQ3hGLENBQUM7T0FDSDs7OztTQW5CRyxHQUFHO0dBQVMsQ0FBQzs7QUFzQm5CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFIgPSByZXF1aXJlKCdyZWFjdC1uZXh1cycpO1xyXG5jb25zdCBfID0gUi5fO1xyXG5cclxuY29uc3QgeyBzdXBwb3J0ZWRMb2NhbGVzIH0gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xyXG5jb25zdCBGbHV4ID0gcmVxdWlyZSgnLi9GbHV4Jyk7XHJcbmNvbnN0IFJvb3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUm9vdCcpO1xyXG5jb25zdCB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKTtcclxuY29uc3Qgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFIuQXBwIHtcclxuICBnZXRGbHV4Q2xhc3MoKSB7IHJldHVybiBGbHV4OyB9XHJcblxyXG4gIGdldFJvb3RDbGFzcygpIHsgcmV0dXJuIFJvb3Q7IH1cclxuXHJcbiAgZ2V0VGVtcGxhdGUoKSB7IHJldHVybiB0ZW1wbGF0ZTsgfVxyXG5cclxuICAqZ2V0VGVtcGxhdGVWYXJzKHsgcmVxIH0pIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcbiAgICBsZXQgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhbm9uaWNhbCB9ID0geWllbGQgXy5waWNrKHJvdXRlci5tYXRjaChyZXEucGF0aG5hbWUpLCBbJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJywgJ2Nhbm9uaWNhbCddKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXHJcbiAgICBsZXQgbGFuZyA9IFIuTG9jYWxpemUuYmVzdExvY2FsZShyZXEuaGVhZGVyc1snYWNjZXB0LWxhbmdhZ2UnXSwgc3VwcG9ydGVkTG9jYWxlcyk7XHJcbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhbm9uaWNhbCwgbGFuZyB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0UGx1Z2luc0NsYXNzZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBSLlBsdWdpbnMuSGlzdG9yeSh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5JyB9KSxcclxuICAgICAgUi5QbHVnaW5zLldpbmRvdyh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5JyB9KSxcclxuICAgICAgUi5QbHVnaW5zLkxvY2FsaXplKHsgc3RvcmVOYW1lOiAnbWVtb3J5JywgZGlzcGF0Y2hlck5hbWU6ICdtZW1vcnknLCBzdXBwb3J0ZWRMb2NhbGVzIH0pLFxyXG4gICAgXTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=