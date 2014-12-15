const R = require('react-nexus');
const _ = R._;
const cors = require('cors');
const express = require('express');
const UplinkSimpleServer = require('nexus-uplink-simple-server');

module.exports = () => {
    const uplink = new UplinkSimpleServer({
      pid: _.guid('pid'),
      stores: ['/clock', '/users'],
      rooms: [],
      actions: [],
      activityTimeout: 2000,
      app: express().use(cors()),
    });

    let users = {};

    function updateAll() {
      uplink.update({ path: '/clock', value: { now: Date.now() } });
      uplink.update({ path: '/users', value: { count: Object.keys(users).length } });
    }

    uplink.events.on('create', function({ guid }) { users[guid] = true; });
    uplink.events.on('delete', function({ guid }) { delete users[guid]; });

    setInterval(updateAll, 100);
    return uplink;
};
