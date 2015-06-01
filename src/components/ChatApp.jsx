import sha256 from 'sha256';
import LocalFlux from 'nexus-flux/adapters/Local';
import Nexus from 'react-nexus';
import React from 'react';
import RemoteFluxClient from 'nexus-flux-socket.io/client';
import { parse } from 'url';
import { Remutable } from 'nexus-flux';

import NicknameModal from './NicknameModal';
import router from '../router';
import { flux } from '../config';
const { protocol, host, port } = flux;

export default class ChatApp extends Nexus.bind(class extends React.Component {
  static displayName = 'ChatApp';
  static propTypes = {
    session: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  getNexusBindings() {
    return {
      session: ['local', '/session', {}],
      status: ['remote', '/status', {}],
      users: ['remote', '/users', {}],
    };
  }

  getUser() {
    const defaultUser = {};
    const clientID = this.props.session.get('clientID');
    if(!clientID) {
      return defaultUser;
    }
    return this.props.users.get(sha256(clientID)) || defaultUser;
  }

  render() {
    const { nickname } = this.getUser();
    return <div className='ChatApp'>
      { nickname ? `Hello ${nickname}` : <NicknameModal /> }
    </div>;
  }
}) {
  static getRoutes({ window, req, url }) {
    const href = url ? url :
      req ? req.url :
      window ? window.location.href : '';
    const { path, hash } = parse(href);
    return router.route(`${path}${hash ? hash : ''}`);
  }

  static updateMetaDOMNodes({ window }) {
    if(__DEV__) {
      __BROWSER__.should.be.true;
    }
    const { title, description } = ChatApp.getRoutes({ window })[0];
    const titleDOMNode = window.document.querySelector('title');
    if(titleDOMNode !== null) {
      titleDOMNode.textContent = title;
    }
    const descriptionDOMNode = window.document.querySelector('meta[name=description]');
    if(descriptionDOMNode !== null) {
      descriptionDOMNode.setAttribute('content', description);
    }
  }

  static createLocalFluxClient({ req, window }, clientID, lifespan) {
    const stores = {
      '/window': new Remutable({
        routes: ChatApp.getRoutes({ req, window }),
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
            .set('routes', ChatApp.getRoutes({ window }))
            .commit()
        );

        ChatApp.updateMetaDOMNodes({ window });
      });

      server
        .dispatchUpdate('/window',
          stores['/window']
            .set('routes', ChatApp.getRoutes({ window }))
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
  }

  static createRemoteFluxClient({ req, window }, clientID, lifespan) {
    const client = new RemoteFluxClient(`${protocol}://${host}:${port}`);
    lifespan.onRelease(() => client.lifespan.release());

    if(__BROWSER__) {
      client.forceResync();
    }

    return client;
  }

  static createNexus({ req, window }, clientID, lifespan) {
    return {
      local: ChatApp.createLocalFluxClient({ req, window }, clientID, lifespan),
      remote: ChatApp.createRemoteFluxClient({ req, window }, clientID, lifespan),
    };
  }

  static styles = {};
}
