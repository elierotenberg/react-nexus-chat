const R = require('react-nexus');

const router = new R.Router({
}).default(() => ({
  title: 'React Nexus Chat',
  description: 'A simple chat webapp built with React Nexus',
  canonical: '/',
}));

module.exports = router;
