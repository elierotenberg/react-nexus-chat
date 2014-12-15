"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var cors = require("cors");
var express = require("express");
var UplinkSimpleServer = require("nexus-uplink-simple-server");

var chatUtils = require("./chatUtils");

module.exports = function () {
  var uplink = new UplinkSimpleServer({
    pid: _.guid("pid"),
    stores: ["/userList", "/messageList"],
    rooms: [],
    actions: ["/postMessage"],
    activityTimeout: 2000,
    app: express().use(cors()) });

  var MESSAGE_LIST_MAX_LENGTH = 200;
  var BATCH_REFRESH_INTERVAL = 100;
  var userList = {};
  var messageList = [];

  function catchAll(fn) {
    return function () {
      try {
        return fn.apply(this, arguments);
      } catch (err) {
        console.warn(err);
      }
    };
  }

  function userJoin(_ref) {
    var guid = _ref.guid;
    guid.should.be.a.String;
    var defaultNickname = _.uniqueId("Anonymous");
    userList[chatUtils.userId(guid)] = defaultNickname;
    _.dev(function () {
      return console.log("userList[" + chatUtils.userId(guid) + "] <- " + defaultNickname);
    });
  }

  function userLeave(_ref2) {
    var guid = _ref2.guid;
    guid.should.be.a.String;
    _.dev(function () {
      return console.log("userList[" + chatUtils.userId(guid) + "] <- void 0");
    });
    delete userList[chatUtils.userId(guid)];
  }

  function setNickname(_ref3) {
    var guid = _ref3.guid;
    var nickname = _ref3.nickname;
    guid.should.be.a.String;
    nickname.should.be.a.String;
    nickname.length.should.be.within(3, 24);
    _.dev(function () {
      return console.log("userList[" + chatUtils.userId(guid) + "] <- " + nickname);
    });
    userList[chatUtils.userId(guid)] = nickname;
  }

  function postMessage(_ref4) {
    var guid = _ref4.guid;
    var message = _ref4.message;
    message.should.be.a.String;
    message.length.should.be.within(1, 256);
    messageList.push({
      key: chatUtils.messageId(),
      timestamp: Date.now(),
      nickname: userList[chatUtils.userId(guid)],
      message: message
    });
    _.dev(function () {
      return console.log("userList[" + chatUtils.userId(guid) + "] -> " + message);
    });
    while (messageList.length > MESSAGE_LIST_MAX_LENGTH) {
      messageList.unshift();
    }
  }

  function render() {
    return {
      "/userList": userList,
      "/messageList": messageList };
  }

  function update() {
    var store = render();
    Object.keys(store).forEach(function (path) {
      return uplink.update({ path: path, value: store[path] });
    });
  }

  setInterval(update, BATCH_REFRESH_INTERVAL);

  uplink.events.on("create", catchAll(userJoin));
  uplink.events.on("delete", catchAll(userLeave));
  uplink.actions.on("/setNickname", catchAll(setNickname));
  uplink.actions.on("/postMessage", catchAll(postMessage));

  return uplink;
};