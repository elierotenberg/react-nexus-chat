"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = {
  supportedLocales: ["en", "fr"],
  uplink: {
    port: 8080,
    url: "http://localhost:8080" },
  render: {
    port: 8000,
    url: "http://localhost:8000" } };