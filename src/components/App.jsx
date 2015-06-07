import sha256 from 'sha256';
import LocalFlux from 'nexus-flux/adapters/Local';
import Nexus from 'react-nexus';
import React from 'react';
import RemoteFluxClient from 'nexus-flux-socket.io/client';
import { Lifespan, Remutable } from 'nexus-flux';
import pure from 'pure-render-decorator';

import PingTicker from './PingTicker';
import NicknameModal from './NicknameModal';
import Room from './Room';
import { flux } from '../config';
const { protocol, host, port } = flux;

@Nexus.root(({ req, window, clientID }) => {
  const lifespan = new Lifespan();
  // local flux
  const localStores = {
    '/window': new Remutable({
      locale: __NODE__ ? req.acceptsLanguages(['en', 'fr']) || 'en' :
        window.navigator.userLanguage || window.navigator.language || 'en',
      scrollX: __NODE__ ? 0 : window.scrollX,
      scrollY: __NODE__ ? 0 : window.scrollY,
    }),
    '/session': new Remutable({
      clientID,
    }),
  };

  const localServer = new LocalFlux.Server(localStores);
  const localClient = new LocalFlux.Client(localServer);
  lifespan.onRelease(() => localClient.lifespan.release());
  lifespan.onRelease(() => localServer.lifespan.release());

  _.each(localStores,
    (value, key) => localServer.dispatchUpdate(key, value.commit())
  );

  localServer.on('action', ({ path, params }) => {
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
      localServer.dispatchUpdate('/window',
        localStores['/window']
          .set('scrollY', window.scrollX)
          .set('scrollY', window.scrollY)
        .commit()
      );
    });
  }

  const remoteClient = new RemoteFluxClient(`${protocol}://${host}:${port.public}`);
  lifespan.onRelease(() => remoteClient.lifespan.release());

  const nexus = {
    local: localClient,
    remote: remoteClient,
  };

  return { nexus, lifespan };
})
@Nexus.component(() => ({
  messages: ['remote://messages', {}],
  session: ['local://session', {}],
  status: ['remote://status', {}],
  users: ['remote://users', {}],
}))
@pure
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
      <Room clientID={clientID} messages={messages} status={status} users={users} />
      { nickname ? <PingTicker clientID={clientID} /> : <NicknameModal clientID={clientID} /> }
    </div>;
  }
}

export default App;
