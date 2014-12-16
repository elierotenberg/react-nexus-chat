const R = require('react-nexus');
const _ = R._;
const cluster = require('cluster');

const common = require('./common');
const render = require('./render');
const uplink = require('./uplink');

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

function run(CLUSTER_ROLE) {
  _.dev(() => (CLUSTER_ROLE !== void 0).should.be.ok &&
    (workers[CLUSTER_ROLE] !== void 0).should.be.ok &&
    workers[CLUSTER_ROLE].should.be.a.Function
  );
  workers[CLUSTER_ROLE]()
  .listen(common[CLUSTER_ROLE].port, () => _.dev(() => console.warn(`${CLUSTER_ROLE} listening on port ${common[CLUSTER_ROLE].port}.`)));
}

if(__DEV__) {
  console.warn('Running in DEVELOPMENT mode (single process-mode, debugging messages, runtime checks).');
  console.warn('Switch the NODE_ENV flag to \'production\' to enable multi-process mode and run optimized code.');
  Object.keys(workers).forEach(run);
}
else {
  if(cluster.isMaster) {
    Object.keys(workers).forEach(fork);
  }
  else {
    run(process.env.CLUSTER_ROLE);
  }
}
