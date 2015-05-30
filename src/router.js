import Router from 'isomorphic-router';

const router = new Router();

// patterns are matched from top to bottom.
// pattern, title, description
[
  ['/ChatApp', 'React Nexus Chat', 'The *famous* React Nexus Chat!'],
  ['(.*)', 'Not found', 'Page not found'],
].forEach(([pattern, title, description]) =>
  router.on(pattern, (query, params, hash) => ({ title, description, query, params, hash }))
);

export default router;
