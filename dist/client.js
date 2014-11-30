"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var App = require("./App");

var app = new App();
var client = new R.Client({ app: app });
_.co(regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (true) switch (_context.prev = _context.next) {
      case 0: _context.next = 2;
        return client.mount({ window: window });
      case 2:
        _.dev(function () {
          return console.log("Client mounted.", client);
        });
      case 3:
      case "end": return _context.stop();
    }
  }, _callee, this);
}));