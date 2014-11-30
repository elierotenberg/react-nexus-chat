"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var co = _.co;
var cors = require("cors");
var express = require("express");
var UplinkSimpleServer = require("nexus-uplink-simple-server");

module.exports = function () {
  var uplink = new UplinkSimpleServer({
    pid: _.guid("pid"),
    stores: ["/clock"],
    rooms: [],
    actions: [],
    app: express().use(cors())
  });
  setInterval(function () {
    return co(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (true) switch (_context.prev = _context.next) {
          case 0: _context.next = 2;
            return uplink.update("/clock", { now: Date.now() });
          case 2:
          case "end": return _context.stop();
        }
      }, _callee, this);
    }));
  }, 100);

  return uplink;
};