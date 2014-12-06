const R = require('react-nexus');
const _ = R._;
const url = require('url');

const { supportedLocales } = require('./common');
const Flux = require('./Flux');
const Root = require('./components/Root');
const template = require('./template');
const router = require('./router');

const History = R.Plugins.History({ storeName: 'memory', dispatcherName: 'memory' });
const Window = R.Plugins.Window({ storeName: 'memory', dispatcherName: 'memory' });
const Localize = R.Plugins.Localize({ storeName: 'memory', dispatcherName: 'memory', supportedLocales });

class App extends R.App {
  getFluxClass() { return Flux; }

  getRootClass() { return Root; }

  getTemplate() { return template; }

  *getTemplateVars({ req }) { // jshint ignore:line
    const { pathname } = url.parse(req.url);
    const { title, description, canonical } = yield _.pick(router.match(pathname), ['title', 'description', 'canonical']); // jshint ignore:line
    const lang = R.Plugins.Localize.bestLocale(req.headers['accept-langage'], supportedLocales).language;
    return { title, description, canonical, lang };
  }

  getPluginsClasses() {
    return [History, Window, Localize];
  }
}

module.exports = App;
