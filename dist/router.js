"use strict";

require("6to5/polyfill");var Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");

var router = new R.Router({
  "/about": function () {
    return ({
      title: "About",
      description: "About React Nexus Starterkit",
      canonical: "/about" });
  } })["default"](function () {
  return ({
    title: "Home",
    description: "Homepage of React Nexus Starterkit",
    canonical: "/" });
});

module.exports = router;