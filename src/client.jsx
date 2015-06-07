import Nexus from 'react-nexus';
import uuid from 'node-uuid';
const { React } = Nexus;
import App from './components/App';

if(__DEV__) {
  __BROWSER__.should.be.true;
}

window.startReactNexusChat = (data, container) => {
  const clientID = uuid.v1();
  React.render(<App data={data} clientID={clientID} window={window} />, container);
};
