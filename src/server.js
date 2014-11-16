const R = require('react-nexus');
const _ = R._;
const UplinkSimpleServer = require('nexus-uplink-simple-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const common = require('./common');
const App = require('./App');

// Render + static server
express()
.use(cors())
.use(express.static(path.join(__dirname, '..', 'public')))
.get('/favicon.ico', (req, res) => res.status(404).send(null))
.use((new App()).prerender)
.listen(common.render.port);


// Uplink server
let uplink = express().use(cors());
(new UplinkSimpleServer({
  guid: _.guid(),
  stores: [
  ],
  rooms: [
  ],
  actions: [
  ]
})).attach(uplink);
uplink.listen(common.uplink.port);

