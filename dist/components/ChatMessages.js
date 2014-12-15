"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatMessages = React.createClass({ displayName: "ChatMessages",
  mixins: [R.Component.Mixin],

  render: function () {
    return React.createElement("div", { className: "ChatMessages" }, "Chat messages.");
  },

  statics: {
    styles: {} } });

module.exports = ChatMessages;