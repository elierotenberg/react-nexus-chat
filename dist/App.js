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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImc6L3JlYWN0LW5leHVzL3JlYWN0LW5leHVzLXN0YXJ0ZXJraXQvc3JjL0FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7V0FFZSxPQUFPLENBQUMsVUFBVSxDQUFDOztJQUF4QyxnQkFBZ0IsUUFBaEIsZ0JBQWdCO0FBQ3hCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMxQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU3QixHQUFHLGNBQVMsQ0FBQztNQUFiLEdBQUcsWUFBSCxHQUFHO0FBQVMsS0FBQyxDQUFDLEdBQUc7OztXQUFqQixHQUFHLEVBQVMsQ0FBQyxDQUFDLEdBQUc7O2NBQWpCLEdBQUc7QUFDUCxnQkFBWTs7YUFBQSxZQUFHO0FBQUUsZUFBTyxJQUFJLENBQUM7T0FBRTs7QUFFL0IsZ0JBQVk7O2FBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDO09BQUU7O0FBRS9CLGVBQVc7O2FBQUEsWUFBRztBQUFFLGVBQU8sUUFBUSxDQUFDO09BQUU7O0FBRWpDLG1CQUFlOztxQ0FBQTtZQUFHLEdBQUcsU0FDZCxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFDL0IsSUFBSTs7O29CQUZTLEdBQUcsU0FBSCxHQUFHOztxQkFDMEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBQWpILG1CQUFLLFNBQUwsS0FBSztBQUFFLHlCQUFXLFNBQVgsV0FBVztBQUFFLHVCQUFTLFNBQVQsU0FBUztBQUMvQixrQkFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztrREFDMUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFOzs7OztPQUMvQzs7QUFFRCxxQkFBaUI7O2FBQUEsWUFBRztBQUNsQixlQUFPLENBQ0wsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUNwRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQ25FLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFoQixnQkFBZ0IsRUFBRSxDQUFDLENBQ3hGLENBQUM7T0FDSDs7OztTQW5CRyxHQUFHO0dBQVMsQ0FBQzs7QUFzQm5CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJzZ0bzUvcG9seWZpbGwnKTtcbmNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuY29uc3QgUiA9IHJlcXVpcmUoJ3JlYWN0LW5leHVzJyk7XG5jb25zdCBfID0gUi5fO1xuXG5jb25zdCB7IHN1cHBvcnRlZExvY2FsZXMgfSA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5jb25zdCBGbHV4ID0gcmVxdWlyZSgnLi9GbHV4Jyk7XG5jb25zdCBSb290ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1Jvb3QnKTtcbmNvbnN0IHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xuY29uc3Qgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcblxuY2xhc3MgQXBwIGV4dGVuZHMgUi5BcHAge1xuICBnZXRGbHV4Q2xhc3MoKSB7IHJldHVybiBGbHV4OyB9XG5cbiAgZ2V0Um9vdENsYXNzKCkgeyByZXR1cm4gUm9vdDsgfVxuXG4gIGdldFRlbXBsYXRlKCkgeyByZXR1cm4gdGVtcGxhdGU7IH1cblxuICAqZ2V0VGVtcGxhdGVWYXJzKHsgcmVxIH0pIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgbGV0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYW5vbmljYWwgfSA9IHlpZWxkIF8ucGljayhyb3V0ZXIubWF0Y2gocmVxLnBhdGhuYW1lKSwgWyd0aXRsZScsICdkZXNjcmlwdGlvbicsICdjYW5vbmljYWwnXSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIGxldCBsYW5nID0gUi5Mb2NhbGl6ZS5iZXN0TG9jYWxlKHJlcS5oZWFkZXJzWydhY2NlcHQtbGFuZ2FnZSddLCBzdXBwb3J0ZWRMb2NhbGVzKTtcbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGNhbm9uaWNhbCwgbGFuZyB9O1xuICB9XG5cbiAgZ2V0UGx1Z2luc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFIuUGx1Z2lucy5IaXN0b3J5KHsgc3RvcmVOYW1lOiAnbWVtb3J5JywgZGlzcGF0Y2hlck5hbWU6ICdtZW1vcnknIH0pLFxuICAgICAgUi5QbHVnaW5zLldpbmRvdyh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5JyB9KSxcbiAgICAgIFIuUGx1Z2lucy5Mb2NhbGl6ZSh7IHN0b3JlTmFtZTogJ21lbW9yeScsIGRpc3BhdGNoZXJOYW1lOiAnbWVtb3J5Jywgc3VwcG9ydGVkTG9jYWxlcyB9KSxcbiAgICBdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9