import LocalFlux from 'nexus-flux/adapters/Local';
import RemoteFluxClient from 'nexus-flux-socket.io/client';
import { Remutable } from 'nexus-flux';
import { parse } from 'url';
import router from './router';
import { flux } from './config';
const { protocol, host, port } = flux;


function createLocalFlux({ req, window }, clientId, lifespan) {
  const stores = {
    '/window': new Remutable({
      locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' :
        window.navigator.userLanguage || window.navigator.language || 'en',
      scrollX: __NODE__ ? 0 : window.scrollX,
      scrollY: __NODE__ ? 0 : window.scrollY,
    }),
    '/user': new Remutable({
      clientId,
      nickname: null,
    }),
  };

  const server = new LocalFlux.Server(stores);
  const client = new LocalFlux.Client(stores);
  lifespan.onRelease(() => {
    client.lifespan.release();
    server.lifespan.release();
  });

  server.on('action', ({ path, params }) => {
    if(path === '/window/scroll') {
      const { x, y } = params;
      if(__BROWSER__) {
        window.scrollTo(x, y);
      }
      return;
    }
  });

  if(__BROWSER__) {
    window.addEventListener('scroll', () => {
      server.dispatchUpdate(
        stores['/window']
          .set('scrollY', window.scrollX)
          .set('scrollY', window.scrollY)
        .commit()
      );
    });
  }

  return client;
}

function createRemoteFlux(lifespan) {
  const client = new RemoteFluxClient(`${protocol}://${host}:${port}`);
  lifespan.onRelease(() => client.lifespan.release());
  return client;
}

exort default {
  getRoutes({ req, window, url }) {
    const href = url ? url :
      req ? req.url :
      window ? window.location.href : '';
    const { path, hash } = parse(href);
    return router.route(`${path}${hash ? hash : ''}`);
  },

  createNexus({ req, window }, clientID, lifespan) {
    return {
      local: createLocalFlux({ req, window }, clientId, lifespan),
      remote: createRemoteFlux(lifespan),
    };
  },
};
