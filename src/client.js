const R = require('react-nexus');
const _ = R._;
const App = require('./App');

const app = new App();
const client = new R.Client({ app });
_.co(function*() {
  yield client.mount({ window });
  _.dev(() => console.log('Client mounted.', client));
});
