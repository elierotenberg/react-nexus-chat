const R = require('react-nexus');
const _ = R._;
const App = require('./App');

var client = new R.Client(new App());
client.mount({ window })
.then(() => _.dev(() => console.log('Client mounted.', client)))
.catch((err) => { throw err; });
