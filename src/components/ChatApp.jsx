import React from 'react';
import LocalFlux from 'nexus-flux/adapters/Local';
import RemoteFluxClient from 'nexus-flux-socket.io/client';
import { Remutable } from 'nexus-flux';
import { parse } from 'url';
import router from '../router';
import { flux } from '../config';
import Nexus from 'react-nexus';
const { protocol, host, port } = flux;

export default class ChatApp extends Nexus.bind(class extends React.Component {
  static displayName = 'ChatApp';
  static propTypes = {
    status: Nexus.PropTypes.Immutable.Map,
  };

  getNexusBindings() {
    return {
      status: ['remote', '/status', {}],
    };
  }

  render() {
    return <div>
      <p>Topic: {this.props.status.get('topic')}</p>
      <p>Date: {this.props.status.get('date')}</p>
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
      '/user': new Remutable({
        clientID,
        nickname: null,
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
    }

    return client;
  }

  static createRemoteFluxClient({ req, window }, clientID, lifespan) {
    const client = new RemoteFluxClient(`${protocol}://${host}:${port}`);
    lifespan.onRelease(() => client.lifespan.release());
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
