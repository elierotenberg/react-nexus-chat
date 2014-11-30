const R = require('react-nexus');
const _ = R._;
const co = _.co;
const cors = require('cors');
const express = require('express');
const UplinkSimpleServer = require('nexus-uplink-simple-server');

module.exports = () => {
    const uplink = new UplinkSimpleServer({
      pid: _.guid('pid'),
      stores: ['/clock'],
      rooms: [],
      actions: [],
      app: express().use(cors())
    });
    setInterval(() => co(function*() {
      yield uplink.update('/clock', { now: Date.now() });
    }), 100);

    return uplink;
};
