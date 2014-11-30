"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var cluster = require("cluster");

var common = require("./common");
var render = require("./render");
var uplink = require("./uplink");

function listening(name, port) {
  return function () {
    return console.log("" + name + " listening on port " + port + ".");
  };
}

var ROLE_UPLINK = "uplink";
var ROLE_RENDER = "render";
var workers = (function (_workers) {
  _workers[ROLE_UPLINK] = uplink;
  _workers[ROLE_RENDER] = render;
  return _workers;
})({});

function fork(CLUSTER_ROLE) {
  cluster.fork({ CLUSTER_ROLE: CLUSTER_ROLE }).on("online", function () {
    _.dev(function () {
      return console.warn("worker " + CLUSTER_ROLE + " is online.");
    });
  }).on("exit", function (code, signal) {
    _.dev(function () {
      return console.warn("Worker " + CLUSTER_ROLE + " exited with code " + code + " and signal " + signal + ".");
    });
    fork(CLUSTER_ROLE);
  });
}

if (cluster.isMaster) {
  Object.keys(workers).forEach(fork);
} else {
  (function () {
    var role = process.env.CLUSTER_ROLE;
    _.dev(function () {
      return (role !== void 0).should.be.ok && (workers[role] !== void 0).should.be.ok && workers[role].should.be.a.Function;
    });
    workers[role]().listen(common[role].port, listening(role, common[role].port));
  })();
}