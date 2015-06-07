'use strict';

var _child_process = require('child_process');

var _path = require('path');

var _ = require('lodash');
var should = require('should');
var Promise = (global || window).Promise = require('bluebird');
var __DEV__ = process.env.NODE_ENV !== 'production';
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === 'object';
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}

function spawn(child) {
  (function start() {
    console.log('Starting', child);
    (0, _child_process.fork)((0, _path.join)(__dirname, child), {
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    }).on('exit', function (code) {
      console.warn(child, 'exited with code', code);
      start();
    });
  })();
}

spawn('render-server');
spawn('flux-server');