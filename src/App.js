const R = require('react-nexus');
const _ = R._;

const { supportedLocales } = require('./common');
const Flux = require('./Flux');
const Root = require('./components/Root');
const template = require('./template');
const router = require('./router');

class App extends R.App {
  getFluxClass() { return Flux; }

  getRootclass() { return Root; }

  getTemplate() { return template; }

  *getTemplateVars({ req }) { // jshint ignore:line
    let { title, description, canonical } = yield _.pick(router.match(req.pathname), ['title', 'description', 'canonical']); // jshint ignore:line
    let lang = R.Localize.bestLocale(req.headers['accept-langage'], supportedLocales);
    return { title, description, canonical, lang };
  }

  getPluginClasses() {
    return [
      R.Plugins.History({ storeName: 'memory', dispatcherName: 'memory' }),
      R.Plugins.Window({ storeName: 'memory', dispatcherName: 'memory' }),
      R.Plugins.Localize({ storeName: 'memory', dispatcherName: 'memory', supportedLocales }),
    ];
  }
}

module.exports = App;
