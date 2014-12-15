"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");

var router = new R.Router({})["default"](function () {
  return ({
    title: "React Nexus Chat",
    description: "A simple chat webapp built with React Nexus",
    canonical: "/" });
});

module.exports = router;