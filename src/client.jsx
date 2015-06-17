import { React } from 'react-nexus';
import uuid from 'node-uuid';
import App from './components/App';
const __DEV__ = process.env.NODE_ENV === 'development';
const __BROWSER__ = (typeof window === 'object');

if(__DEV__) {
  __BROWSER__.should.be.true;
}

window.startReactNexusChat = (data, container) => {
  const clientID = uuid.v1();
  React.render(<App data={data} clientID={clientID} window={window} />, container);
};
