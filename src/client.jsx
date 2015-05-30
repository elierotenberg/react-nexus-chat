import Lifespan from 'lifespan';
import Nexus from 'react-nexus';
import uuid from 'node-uuid';
const { React } = Nexus;

import ChatApp from './components/ChatApp';
import { MODULE_NAME } from './config';

if(__DEV__) {
  window.should.not.have.property(MODULE_NAME);
}

window[MODULE_NAME] = {
  ChatApp({ clientID = uuid.v1(), container, data = {}, props }) {
    if(__DEV__) {
      clientID.should.be.a.String;
      container.should.be.an.Object;
      data.should.be.an.Object;
      props.should.be.an.Object;
    }

    const lifespan = new Lifespan();
    const nexus = CommentsClientRoot.createNexus({ window }, clientID, lifespan);
    window.addEventListener('close', lifespan.release);
    Nexus.mountApp(<CommentsClientRoot {...props} />, nexus, data, container);
  },
};
