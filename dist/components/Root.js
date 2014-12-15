"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;
var styles = require("../styles");

var ChatRoom = require("./ChatRoom");

var Root = React.createClass({ displayName: "Root",
  mixins: [R.Root.Mixin],

  render: function () {
    return React.createElement("div", { className: "Root" }, React.createElement(ChatRoom, null));
  },

  statics: {
    styles: {
      "html, body": {
        color: styles.colors.Text,
        fontFamily: styles.fonts.Roboto,
        width: "100%",
        height: "100%",
        margin: "0 auto" },

      "a, a:hover, a:visited, a:active": {
        textDecoration: "none" },

      a: {
        color: styles.colors.Link },

      "a:hover": {
        color: styles.colors.LinkHover },

      "a:active": {
        color: styles.colors.LinkActive },

      ".Root": {
        width: 1024,
        height: 640,
        margin: "0 auto" } } } });

module.exports = Root;