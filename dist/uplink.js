"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var cors = require("cors");
var express = require("express");
var UplinkSimpleServer = require("nexus-uplink-simple-server");

module.exports = function () {
  var uplink = new UplinkSimpleServer({
    pid: _.guid("pid"),
    stores: ["/clock", "/users"],
    rooms: [],
    actions: [],
    activityTimeout: 2000,
    app: express().use(cors()) });

  var users = {};

  function updateAll() {
    uplink.update({ path: "/clock", value: { now: Date.now() } });
    uplink.update({ path: "/users", value: { count: Object.keys(users).length } });
  }

  uplink.events.on("create", function (_ref) {
    var guid = _ref.guid;
    users[guid] = true;
  });
  uplink.events.on("delete", function (_ref2) {
    var guid = _ref2.guid;
    delete users[guid];
  });

  setInterval(updateAll, 100);
  return uplink;
};