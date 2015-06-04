import React from 'react';
import Nexus from 'react-nexus';
import sha256 from 'sha256';

@Nexus.inject(() => ({}))
class MessageInput extends React.Component {
  static displayName = 'MessageInput';

  static propTypes = {
    clientID: React.PropTypes.string.isRequired,
    messages: Nexus.PropTypes.Immutable.Map,
    nexus: React.PropTypes.shape({
      remote: React.PropTypes.shape({
        dispatchAction: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  componentDidUpdate() {
    this.refs.messageInput.getDOMNode().focus();
  }

  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  updateMessage(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  postMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    const { clientID, nexus } = this.props;
    if(message.startsWith('/nick')) {
      nexus.remote.dispatchAction('/setNickname', { clientID, nickname: message.slice('/nick'.length + 1) });
    }
    else if(message.startsWith('/topic')) {
      nexus.remote.dispatchAction('/setTopic', { clientID, topic: message.slice('/topic'.length + 1) });
    }
    else {
      nexus.remote.dispatchAction('/postMessage', { clientID, text: message });
    }
    this.setState({ message: '' });
  }

  hasNickname() {
    const { clientID, users } = this.props;
    return users.get(sha256(clientID)) !== void 0;
  }

  render() {
    const { message } = this.state;
    return <div className='MessageInput'>
      {this.hasNickname() ?
        <form onSubmit={(e) => this.postMessage(e)}>
          <input ref='messageInput' type='text' onChange={(e) => this.updateMessage(e)} value={message} />
        </form> :
        'You must have a nickname to post messages.'
      }
    </div>;
  }
}

export default MessageInput;
