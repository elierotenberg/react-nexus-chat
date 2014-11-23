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
      value: regeneratorRuntime.mark(function _callee(_ref2) {
        var req, _ref3, title, description, canonical, lang;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (true) switch (_context.prev = _context.next) {
            case 0: req = _ref2.req;
              _context.next = 3;
              return _.pick(router.match(req.pathname), ["title", "description", "canonical"]);
            case 3: _ref3 = _context.sent;
              title = _ref3.title;
              description = _ref3.description;
              canonical = _ref3.canonical;
              lang = R.Plugins.Localize.bestLocale(req.headers["accept-langage"], supportedLocales).language;
              return _context.abrupt("return", { title: title, description: description, canonical: canonical, lang: lang });
            case 9:
            case "end": return _context.stop();
          }
        }, _callee, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQU0sT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUM7QUFDN0YsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1dBRWUsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7SUFBeEMsZ0JBQWdCLFFBQWhCLGdCQUFnQjtBQUN4QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDMUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFN0IsR0FBRyxjQUFTLENBQUM7TUFBYixHQUFHLFlBQUgsR0FBRztBQUFTLEtBQUMsQ0FBQyxHQUFHOzs7V0FBakIsR0FBRyxFQUFTLENBQUMsQ0FBQyxHQUFHOztjQUFqQixHQUFHO0FBQ1AsZ0JBQVk7O2FBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDO09BQUU7O0FBRS9CLGdCQUFZOzthQUFBLFlBQUc7QUFBRSxlQUFPLElBQUksQ0FBQztPQUFFOztBQUUvQixlQUFXOzthQUFBLFlBQUc7QUFBRSxlQUFPLFFBQVEsQ0FBQztPQUFFOztBQUVqQyxtQkFBZTs7cUNBQUE7WUFBRyxHQUFHLFNBQ2QsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQy9CLElBQUk7OztvQkFGUyxHQUFHLFNBQUgsR0FBRzs7cUJBQzBCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztBQUFqSCxtQkFBSyxTQUFMLEtBQUs7QUFBRSx5QkFBVyxTQUFYLFdBQVc7QUFBRSx1QkFBUyxTQUFULFNBQVM7QUFDL0Isa0JBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMsUUFBUTsrQ0FDM0YsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFOzs7OztPQUMvQzs7QUFFRCxxQkFBaUI7O2FBQUEsWUFBRztBQUNsQixlQUFPLENBQ0wsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUNwRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQ25FLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFoQixnQkFBZ0IsRUFBRSxDQUFDLENBQ3hGLENBQUM7T0FDSDs7OztTQW5CRyxHQUFHO0dBQVMsQ0FBQzs7QUFzQm5CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFIgPSByZXF1aXJlKCdyZWFjdC1uZXh1cycpO1xuY29uc3QgXyA9IFIuXztcblxuY29uc3QgeyBzdXBwb3J0ZWRMb2NhbGVzIH0gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuY29uc3QgRmx1eCA9IHJlcXVpcmUoJy4vRmx1eCcpO1xuY29uc3QgUm9vdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb290Jyk7XG5jb25zdCB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKTtcbmNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFIuQXBwIHtcbiAgZ2V0Rmx1eENsYXNzKCkgeyByZXR1cm4gRmx1eDsgfVxuXG4gIGdldFJvb3RDbGFzcygpIHsgcmV0dXJuIFJvb3Q7IH1cblxuICBnZXRUZW1wbGF0ZSgpIHsgcmV0dXJuIHRlbXBsYXRlOyB9XG5cbiAgKmdldFRlbXBsYXRlVmFycyh7IHJlcSB9KSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIGxldCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgY2Fub25pY2FsIH0gPSB5aWVsZCBfLnBpY2socm91dGVyLm1hdGNoKHJlcS5wYXRobmFtZSksIFsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnY2Fub25pY2FsJ10pOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICBsZXQgbGFuZyA9IFIuUGx1Z2lucy5Mb2NhbGl6ZS5iZXN0TG9jYWxlKHJlcS5oZWFkZXJzWydhY2NlcHQtbGFuZ2FnZSddLCBzdXBwb3J0ZWRMb2NhbGVzKS5sYW5ndWFnZTtcbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhbm9uaWNhbCwgbGFuZyB9O1xuICB9XG5cbiAgZ2V0UGx1Z2luc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFIuUGx1Z2lucy5IaXN0b3J5KHsgc3RvcmVOYW1lOiAnbWVtb3J5JywgZGlzcGF0Y2hlck5hbWU6ICdtZW1vcnknIH0pLFxuICAgICAgUi5QbHVnaW5zLldpbmRvdyh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5JyB9KSxcbiAgICAgIFIuUGx1Z2lucy5Mb2NhbGl6ZSh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5Jywgc3VwcG9ydGVkTG9jYWxlcyB9KSxcbiAgICBdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9