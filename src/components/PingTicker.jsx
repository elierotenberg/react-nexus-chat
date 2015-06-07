import React from 'react';
import Nexus from 'react-nexus';

const PING_TICK_INTERVAL = 3000;

@Nexus.component()
class PingTicker extends React.Component {
  static displayName = 'PingTicker';
  static propTypes = {
    clientID: React.PropTypes.string,
    nexus: React.PropTypes.shape({
      remote: React.PropTypes.shape({
        dispatchAction: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this._ticker = setInterval(() => {
      const { clientID, nexus } = this.props;
      nexus.remote.dispatchAction('/ping', { clientID });
    }, PING_TICK_INTERVAL);
  }

  componentWillUnmount() {
    if(this._ticker !== null) {
      clearInterval(this._ticker);
      this._ticker = null;
    }
  }

  constructor(props) {
    super(props);
    this._ticker = null;
  }

  render() {
    return null;
  }
}

export default PingTicker;
