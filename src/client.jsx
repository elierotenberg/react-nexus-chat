import { Lifespan } from 'nexus-flux';
import Nexus from 'react-nexus';
import uuid from 'node-uuid';
const { React } = Nexus;

import App from './components/App';
import { MODULE_NAME } from './config';

if(__DEV__) {
  window.should.not.have.property(MODULE_NAME);
}

window[MODULE_NAME] = _.mapValues({
  App,
}, (Component) => ({ clientID = uuid.v1(), container, data = {}, props }) => {
  if(__DEV__) {
    clientID.should.be.a.String;
    container.should.be.an.Object;
    data.should.be.an.Object;
    props.should.be.an.Object;
  }

  const lifespan = new Lifespan();
  const nexus = Component.createNexus({ window }, clientID, lifespan);
  window.addEventListener('close', lifespan.release);
  Nexus.mountApp(<Component {...props} />, nexus, data, container);
});
