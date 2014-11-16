const R = require('react-nexus');

const router = new R.Router({
  '/about': () => ({
    title: 'About',
    description: 'About React Nexus Starterkit',
    canonical: '/about',
  }),
}).default(() => ({
  title: 'Home',
  description: 'Homepage of React Nexus Starterkit',
  canonical: '/',
}));

module.exports = router;
