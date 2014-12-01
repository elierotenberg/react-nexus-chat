"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;
var styles = require("../styles");

var Root = React.createClass({ displayName: "Root",
  mixins: [R.Root.Mixin],

  getInitialState: function () {
    return {
      "/clock": null };
  },

  getFluxStoreSubscriptions: function () {
    return {
      clock: "uplink://clock" };
  },

  render: function () {
    return React.createElement("div", { className: "Root" }, "Hello React Nexus. Now is ", this.state.clock.tick);
  },

  statics: {
    styles: {
      "html, body": {
        color: styles.colors.Text,
        fontFamily: styles.fonts.Roboto },

      "a, a:hover, a:visited, a:active": {
        textDecoration: "none" },

      a: {
        color: styles.colors.Link },

      "a:hover": {
        color: styles.colors.LinkHover },

      "a:active": {
        color: styles.colors.LinkActive } } } });

module.exports = Root;