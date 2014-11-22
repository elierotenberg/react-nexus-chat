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
              lang = R.Localize.bestLocale(req.headers["accept-langage"], supportedLocales);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQU0sT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUM7QUFDN0YsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1dBRWUsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7SUFBeEMsZ0JBQWdCLFFBQWhCLGdCQUFnQjtBQUN4QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDMUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFN0IsR0FBRyxjQUFTLENBQUM7TUFBYixHQUFHLFlBQUgsR0FBRztBQUFTLEtBQUMsQ0FBQyxHQUFHOzs7V0FBakIsR0FBRyxFQUFTLENBQUMsQ0FBQyxHQUFHOztjQUFqQixHQUFHO0FBQ1AsZ0JBQVk7O2FBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDO09BQUU7O0FBRS9CLGdCQUFZOzthQUFBLFlBQUc7QUFBRSxlQUFPLElBQUksQ0FBQztPQUFFOztBQUUvQixlQUFXOzthQUFBLFlBQUc7QUFBRSxlQUFPLFFBQVEsQ0FBQztPQUFFOztBQUVqQyxtQkFBZTs7cUNBQUE7WUFBRyxHQUFHLFNBQ2QsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQy9CLElBQUk7OztvQkFGUyxHQUFHLFNBQUgsR0FBRzs7cUJBQzBCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztBQUFqSCxtQkFBSyxTQUFMLEtBQUs7QUFBRSx5QkFBVyxTQUFYLFdBQVc7QUFBRSx1QkFBUyxTQUFULFNBQVM7QUFDL0Isa0JBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsZ0JBQWdCLENBQUM7K0NBQzFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRTs7Ozs7T0FDL0M7O0FBRUQscUJBQWlCOzthQUFBLFlBQUc7QUFDbEIsZUFBTyxDQUNMLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFDcEUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUNuRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBaEIsZ0JBQWdCLEVBQUUsQ0FBQyxDQUN4RixDQUFDO09BQ0g7Ozs7U0FuQkcsR0FBRztHQUFTLENBQUM7O0FBc0JuQixNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSID0gcmVxdWlyZSgncmVhY3QtbmV4dXMnKTtcclxuY29uc3QgXyA9IFIuXztcclxuXHJcbmNvbnN0IHsgc3VwcG9ydGVkTG9jYWxlcyB9ID0gcmVxdWlyZSgnLi9jb21tb24nKTtcclxuY29uc3QgRmx1eCA9IHJlcXVpcmUoJy4vRmx1eCcpO1xyXG5jb25zdCBSb290ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1Jvb3QnKTtcclxuY29uc3QgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XHJcbmNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSLkFwcCB7XHJcbiAgZ2V0Rmx1eENsYXNzKCkgeyByZXR1cm4gRmx1eDsgfVxyXG5cclxuICBnZXRSb290Q2xhc3MoKSB7IHJldHVybiBSb290OyB9XHJcblxyXG4gIGdldFRlbXBsYXRlKCkgeyByZXR1cm4gdGVtcGxhdGU7IH1cclxuXHJcbiAgKmdldFRlbXBsYXRlVmFycyh7IHJlcSB9KSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG4gICAgbGV0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYW5vbmljYWwgfSA9IHlpZWxkIF8ucGljayhyb3V0ZXIubWF0Y2gocmVxLnBhdGhuYW1lKSwgWyd0aXRsZScsICdkZXNjcmlwdGlvbicsICdjYW5vbmljYWwnXSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxyXG4gICAgbGV0IGxhbmcgPSBSLkxvY2FsaXplLmJlc3RMb2NhbGUocmVxLmhlYWRlcnNbJ2FjY2VwdC1sYW5nYWdlJ10sIHN1cHBvcnRlZExvY2FsZXMpO1xyXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYW5vbmljYWwsIGxhbmcgfTtcclxuICB9XHJcblxyXG4gIGdldFBsdWdpbnNDbGFzc2VzKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgUi5QbHVnaW5zLkhpc3RvcnkoeyBzdG9yZU5hbWU6ICdtZW1vcnknLCBkaXNwYXRjaGVyTmFtZTogJ21lbW9yeScgfSksXHJcbiAgICAgIFIuUGx1Z2lucy5XaW5kb3coeyBzdG9yZU5hbWU6ICdtZW1vcnknLCBkaXNwYXRjaGVyTmFtZTogJ21lbW9yeScgfSksXHJcbiAgICAgIFIuUGx1Z2lucy5Mb2NhbGl6ZSh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5Jywgc3VwcG9ydGVkTG9jYWxlcyB9KSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9