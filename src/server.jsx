/* eslint-disable no-var */
var cluster = require('cluster');

require('babel/register')({
  only: /\.jsx$/,
  modules: 'common',
  optional: [
    'es7.classProperties',
    'es7.decorators',
    'es7.objectRestSpread',
    'runtime',
  ],
});

function spawn(role) {
  (function start() {
    console.log('Starting', role);
    cluster.fork({
      ROLE: role,
      NODE_ENV: process.env.NODE_ENV || 'development',
    })
    .on('exit', function restart(code) {
      console.warn(role, 'exited with code', code);
      start();
    });
  })();
}

if(cluster.isMaster) {
  spawn('render-server');
  spawn('flux-server');
}
else if(process.env.ROLE === 'render-server') {
  require('./render-server');
}
else if(process.env.ROLE === 'flux-server') {
  require('./flux-server');
}
else {
  throw new Error('Unknown role: ' + process.env.ROLE);
}
