"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var cors = require("cors");
var express = require("express");
var path = require("path");

var App = require("./App");

module.exports = function () {
  var render = express().use(cors()).use(express["static"](path.join(__dirname, "..", "public"))).get("/favicon.ico", function (req, res) {
    return res.status(404).send(null);
  }).use((new App()).prerender);

  return render;
};