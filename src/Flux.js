const R = require('react-nexus');
const _ = R._;
const Uplink = require('nexus-uplink-client');

const common = require('./common');

const memoryActionHandlers = () => ({

});

const uplinkActionHandlers = () => ({

});

class Flux extends R.Flux {
  *bootstrap() { // jshint ignore:line
    this
    .registerStore('memory', new R.Store.MemoryStore())
    .registerEventEmitter('memory', new R.EventEmitter.MemoryEventEmitter())
    .registerDispatcher('memory', new R.Dispatcher(memoryActionHandlers(this)));

    const uplink = this.uplink = new Uplink({ url: common.uplink.url, guid: this.guid });

    this
    .registerStore('uplink', new R.Store.UplinkStore({ uplink }))
    .registerEventEmitter('uplink', new R.EventEmitter.UplinkEventEmitter({ uplink }))
    .registerDispatcher('uplink', new R.Dispatcher(uplinkActionHandlers(this)));
  }

  destroy() {
    this.getStore('memory').destroy();
    this.getEventEmitter('memory').destroy();
    this.getDispatcher('memory').destroy();

    this.getStore('uplink').destroy();
    this.getEventEmitter('uplink').destroy();
    this.getDispatcher('uplink').destroy();

    this.uplink.destroy();
    this.uplink = null;
    super.destroy();
  }
}

_.extend(Flux.prototype, {
  uplink: null,
});

module.exports = Flux;
