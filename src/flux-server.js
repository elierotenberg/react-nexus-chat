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
    super(port.private, void 0, void 0, void 0, [logger]);

    this._nextMessageId = 0;

    this.stores = {
      '/status': new Remutable({
        date: Date.now(),
        topic: 'Welcome!',
      }),
      '/messages': new Remutable({}),
      '/users': new Remutable({}),
    };

    this.usersTimers = {};

    this.postMessage({
      nickname: 'System',
      text: 'The server has started!',
    });

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

  createMessageId() {
    const id = this._nextMessageId;
    this._nextMessageId = this._nextMessageId + 1;
    return '' + id;
  }

  postMessage({ h = '', nickname, text }) {
    const id = this.createMessageId();
    const date = Date.now();
    this.dispatchUpdate(
      '/messages',
      this.stores['/messages'].set(id, { id, h, nickname, text, date }).commit()
    );
  }

  dispatchAction(path, params) {
    if(path === '/setTopic') {
      const { topic } = params;
      this.dispatchUpdate(
        '/status',
        this.stores['/status'].set('topic', topic).commit()
      );
      return;
    }
    if(path === '/setNickname') {
      const { clientID, nickname } = params;
      const h = sha256(clientID);
      if(this.usersTimers[h] === void 0) {
        this.postMessage({
          nickname: 'System',
          text: `${nickname} has joined.`,
        });
      }
      else {
        const oldNickname = this.stores['/users'].get(h).nickname;
        this.postMessage({
          nickname: 'System',
          text: `${oldNickname} is now ${nickname}.`,
        });
      }
      this.usersTimers[h] = Date.now();
      this.dispatchUpdate(
        '/users',
        this.stores['/users'].set(h, { h, nickname }).commit()
      );
      return;
    }
    if(path === '/ping') {
      const { clientID } = params;
      const h = sha256(clientID);
      if(this.usersTimers[h] === void 0) {
        return;
      }
      this.usersTimers[h] = Date.now();
      return;
    }
    if(path === '/postMessage') {
      const { clientID, text } = params;
      const h = sha256(clientID);
      const user = this.stores['/users'].head.get(h);
      if(user === void 0) {
        return;
      }
      const date = Date.now();
      this.usersTimers[h] = date;
      const { nickname } = user;
      this.postMessage({ h, nickname, text });
      return;
    }
  }

  tickClock() {
    this.dispatchUpdate(
      '/status',
      this.stores['/status'].set('date', Date.now()).commit()
    );
  }

  tickUsers() {
    const now = Date.now();
    const users = this.stores['/users'];
    _.each(this.usersTimers, (lastPing, h) => {
      if(now - lastPing > USER_TIMEOUT) {
        const { nickname } = users.get(h);
        this.postMessage({
          nickname: 'System',
          text: `${nickname} has left.`,
        });
        users.delete(h);
        delete this.usersTimers[h];
      }
    });
    if(!users.dirty) {
      return;
    }
    this.dispatchUpdate(
      '/users',
      users.commit()
    );
  }
}

const server = new ChatServer();

export default server;
