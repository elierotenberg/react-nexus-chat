"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatMessages = require("./ChatMessages");
var ChatUsers = require("./ChatUsers");

var ChatRoom = React.createClass({ displayName: "ChatRoom",
  mixins: [R.Component.Mixin],

  render: function () {
    return React.createElement("div", { className: "ChatRoom" }, React.createElement("div", { className: "ChatRoom-ChatMessages" }, React.createElement(ChatMessages, null)), React.createElement("div", { className: "ChatRoom-ChatUsers" }, React.createElement(ChatUsers, null)));
  },

  statics: {
    styles: {
      ".ChatRoom": {
        width: "100%",
        height: "100%" },

      ".ChatRoom-ChatMessages, .ChatRoom-ChatUsers": {
        display: "inline-block",
        height: "100%" },

      ".ChatRoom-ChatMessages": {
        width: "70%" },

      ".ChatRoom-ChatUsers": {
        width: "30%" } } } });

module.exports = ChatRoom;