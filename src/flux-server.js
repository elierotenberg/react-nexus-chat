import SocketIOServer from 'nexus-flux-socket.io/server';
import { Remutable } from 'nexus-flux';
import { flux } from './config';
import sha256 from 'sha256';
import morgan from 'morgan';
const { port } = flux;

const CLOCK_TICK_INTERVAL = 500;
const USER_TIMEOUT = 5000;

class NotFound extends Error {
  name = 'NotFound';
  status = '404';
}

class ChatServer extends SocketIOServer {
  constructor() {
    const logger = morgan('combined');
    super(port, void 0, void 0, void 0, [logger]);

    this.stores = {
      '/status': new Remutable({
        date: Date.now(),
        topic: 'Welcome!',
      }),
      '/messages': new Remutable({}),
      '/users': new Remutable({}),
    };

    this.on('action', ({ path, params }) => this.dispatchAction({ path, params }));

    this.lifespan.setInterval(() => this.tickClock(), CLOCK_TICK_INTERVAL);
    this.lifespan.setInterval(() => this.tickUsers(), USER_TIMEOUT / 2);
  }

  serveStore({ path }) {
    return Promise.try(() => {
      if(this.stores.hasOwnProperty(path)) {
        return this.stores[path].toJSON();
      }
      throw new NotFound('Store not found.');
    });
  }

  dispatchAction(path, params) {
    if(path === '/topic') {
      const { topic } = params;
      return this.dispatchUpdate('/status', this.stores['/status'].set('topic', topic).commit());
    }
    if(path === '/nickname') {
      const { clientID, nickname } = params;
      const h = sha256(clientID);
      return this.dispatchUpdate('/users', this.stores['/users'].set(h, { h, nickname, lastSeen: Date.now() }).commit());
    }
    if(path === '/ping') {
      const { clientID } = params;
      const h = sha256(clientID);
      const prev = this.stores['/users'].head.get(h);
      if(prev === void 0) {
        return null;
      }
      const next = Object.assign({}, prev, { lastSeen: Date.now() });
      return this.dispatchUpdate('/users', this.stores['/users'].set(h, next).commit());
    }
  }

  tickClock() {
    return this.dispatchUpdate('/status', this.stores['/status'].set('date', Date.now()).commit());
  }

  tickUsers() {
    const now = Date.now();
    _.each(this.stores['/users'].head.entries(), (h, user) => {
      const { lastSeen } = user;
      if(now - lastSeen > USER_TIMEOUT) {
        this.stores['/users'].delete(h);
      }
    });
    if(!this.stores['/users'].dirty) {
      return null;
    }
    return this.dispatchUpdate('/users', this.stores['/users'].commit());
  }
}

const server = new ChatServer();

export default server;
