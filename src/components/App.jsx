import sha256 from 'sha256';
import LocalFlux from 'nexus-flux/adapters/Local';
import Nexus from 'react-nexus';
import React from 'react';
import RemoteFluxClient from 'nexus-flux-socket.io/client';
import { parse } from 'url';
import { Remutable } from 'nexus-flux';

import PingTicker from './PingTicker';
import NicknameModal from './NicknameModal';
import Room from './Room';
import router from '../router';
import { flux } from '../config';
const { protocol, host, port } = flux;

@Nexus.inject(() => ({
  messages: ['remote', '/messages', {}],
  session: ['local', '/session', {}],
  status: ['remote', '/status', {}],
  users: ['remote', '/users', {}],
}))
class App extends React.Component {
  static displayName = 'App';

  static propTypes = {
    messages: Nexus.PropTypes.Immutable.Map,
    session: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  static styles = {};

  getUser() {
    const defaultUser = {};
    const { session, users } = this.props;
    const clientID = session.get('clientID');
    if(!clientID) {
      return defaultUser;
    }
    return users.get(sha256(clientID)) || defaultUser;
  }

  render() {
    const { nickname } = this.getUser();
    const { messages, status, users } = this.props;
    const clientID = this.props.session.get('clientID');
    return <div className='App'>
      { nickname ? <PingTicker clientID={clientID} /> : <NicknameModal clientID={clientID} /> }
      <Room clientID={clientID} messages={messages} status={status} users={users} />
    </div>;
  }
}

Object.assign(App, {
  getRoutes({ window, req, url }) {
    const href = url ? url :
      req ? req.url :
      window ? window.location.href : '';
    const { path, hash } = parse(href);
    return router.route(`${path}${hash ? hash : ''}`);
  },

  updateMetaDOMNodes({ window }) {
    if(__DEV__) {
      __BROWSER__.should.be.true;
    }
    const { title, description } = App.getRoutes({ window })[0];
    const titleDOMNode = window.document.querySelector('title');
    if(titleDOMNode !== null) {
      titleDOMNode.textContent = title;
    }
    const descriptionDOMNode = window.document.querySelector('meta[name=description]');
    if(descriptionDOMNode !== null) {
      descriptionDOMNode.setAttribute('content', description);
    }
  },

  createLocalFluxClient({ req, window }, clientID, lifespan) {
    const stores = {
      '/window': new Remutable({
        routes: App.getRoutes({ req, window }),
        locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' :
          window.navigator.userLanguage || window.navigator.language || 'en',
        scrollX: __NODE__ ? 0 : window.scrollX,
        scrollY: __NODE__ ? 0 : window.scrollY,
      }),
      '/session': new Remutable({
        clientID,
      }),
    };

    const server = new LocalFlux.Server(stores);
    const client = new LocalFlux.Client(server);

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
        server.dispatchUpdate('/window',
          stores['/window']
            .set('scrollY', window.scrollX)
            .set('scrollY', window.scrollY)
          .commit()
        );
      });

      window.addEventListener('popstate', () => {
        server.dispatchUpdate('/window',
          stores['/window']
            .set('routes', App.getRoutes({ window }))
            .commit()
        );

        App.updateMetaDOMNodes({ window });
      });

      server
        .dispatchUpdate('/window',
          stores['/window']
            .set('routes', App.getRoutes({ window }))
            .set('locale', window.navigator.userLanguage || window.navigator.language || 'en')
            .set('scrollX', window.scrollX)
            .set('scrollY', window.scrollY)
          .commit()
        )
        .dispatchUpdate('/session',
          stores['/session']
            .set('clientID', clientID)
          .commit()
        )
      ;

    }

    return client;
  },

  createRemoteFluxClient({ req, window }, clientID, lifespan) {
    const client = new RemoteFluxClient(`${protocol}://${host}:${port}`);
    lifespan.onRelease(() => client.lifespan.release());

    if(__BROWSER__) {
      client.forceResync();
    }

    return client;
  },

  createNexus({ req, window }, clientID, lifespan) {
    return {
      local: App.createLocalFluxClient({ req, window }, clientID, lifespan),
      remote: App.createRemoteFluxClient({ req, window }, clientID, lifespan),
    };
  },
});

export default App;
