const R = require('react-nexus');
const _ = R._;
const cluster = require('cluster');

const common = require('./common');
const render = require('./render');
const uplink = require('./uplink');

function listening(name, port) {
  return () => console.log(`${name} listening on port ${port}.`);
}

const ROLE_UPLINK = 'uplink';
const ROLE_RENDER = 'render';
const workers = { [ROLE_UPLINK]: uplink, [ROLE_RENDER]: render };

function fork(CLUSTER_ROLE) {
  cluster.fork({ CLUSTER_ROLE })
  .on('online', () => {
    _.dev(() => console.warn(`worker ${CLUSTER_ROLE} is online.`));
  })
  .on('exit', (code, signal) => {
    _.dev(() => console.warn(`Worker ${CLUSTER_ROLE} exited with code ${code} and signal ${signal}.`));
    fork(CLUSTER_ROLE);
  });
}

if(cluster.isMaster) {
  Object.keys(workers).forEach(fork);
}

else {
  const role = process.env.CLUSTER_ROLE;
  _.dev(() => (role !== void 0).should.be.ok &&
    (workers[role] !== void 0).should.be.ok &&
    workers[role].should.be.a.Function
  );
  workers[role]()
  .listen(common[role].port, listening(role, common[role].port));
}
