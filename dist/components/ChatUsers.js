"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatUser = require("./ChatUser");

var ChatUsers = React.createClass({ displayName: "ChatUsers",
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions: function () {
    return {
      users: "uplink://userList" };
  },

  render: function () {
    var _this = this;
    return React.createElement("div", { className: "ChatUsers" }, React.createElement("ul", null, this.state.users ? Object.keys(this.state.users).map(function (userId) {
      return React.createElement("li", { key: userId }, React.createElement(ChatUser, { nickname: _this.state.users[userId] }));
    }) : null));
  },

  statics: {
    styles: {} } });

module.exports = ChatUsers;