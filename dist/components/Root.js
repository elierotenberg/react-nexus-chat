"use strict";

require("6to5/polyfill");
var Promise = require("bluebird");
var R = require("react-nexus");
var React = R.React;
var styles = require("../styles");


var Root = React.createClass({
  displayName: "Root",
  mixins: [R.Root.Mixin],

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
        color: styles.colors.LinkActive } } },

  render: function () {
    return React.createElement("div", {
      className: "Root"
    }, "Hello React Nexus.");
  } });

module.exports = Root;