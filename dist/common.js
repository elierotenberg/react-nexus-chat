"use strict";

require("6to5/polyfill");
var Promise = require("bluebird");
module.exports = {
  supportedLocales: ["en", "fr"],
  uplink: {
    url: "http://localhost:8080" },
  render: {
    url: "http://localhost:8000" } };