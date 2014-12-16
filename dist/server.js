"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var cluster = require("cluster");

var common = require("./common");
var render = require("./render");
var uplink = require("./uplink");

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

function run(CLUSTER_ROLE) {
  _.dev(function () {
    return (CLUSTER_ROLE !== void 0).should.be.ok && (workers[CLUSTER_ROLE] !== void 0).should.be.ok && workers[CLUSTER_ROLE].should.be.a.Function;
  });
  workers[CLUSTER_ROLE]().listen(common[CLUSTER_ROLE].port, function () {
    return _.dev(function () {
      return console.warn("" + CLUSTER_ROLE + " listening on port " + common[CLUSTER_ROLE].port + ".");
    });
  });
}

if (__DEV__) {
  console.warn("Running in DEVELOPMENT mode (single process-mode, debugging messages, runtime checks).");
  console.warn("Switch the NODE_ENV flag to 'production' to enable multi-process mode and run optimized code.");
  Object.keys(workers).forEach(run);
} else {
  if (cluster.isMaster) {
    Object.keys(workers).forEach(fork);
  } else {
    run(process.env.CLUSTER_ROLE);
  }
}