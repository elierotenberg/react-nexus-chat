"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var _ = require("lodash-next");

module.exports = {
  userId: function (guid) {
    return _.secureHash(guid);
  },

  messageId: function () {
    return _.uniqueId("message");
  } };