"use strict";

require("6to5/polyfill");var Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var UplinkSimpleServer = require("nexus-uplink-simple-server");
var express = require("express");
var cors = require("cors");
var path = require("path");

var common = require("./common");
var App = require("./App");

function listening(name, port) {
  return function () {
    return console.log("" + name + " listening on port " + port + ".");
  };
}

// Render + static server
express().use(cors()).use(express["static"](path.join(__dirname, "..", "public"))).get("/favicon.ico", function (req, res) {
  return res.status(404).send(null);
}).use((new App()).prerender).listen(common.render.port, listening("render", common.render.port));

(new UplinkSimpleServer({
  pid: _.guid("pid"),
  stores: [],
  rooms: [],
  actions: [],
  app: express().use(cors()) })).listen(common.uplink.port, listening("uplink", common.uplink.port));