import React from 'react';
import Nexus from 'react-nexus';
import sha256 from 'sha256';
import requestAnimationFrame from 'raf';

@Nexus.component()
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

  componentWillReceiveProps() {
    if(!this.hasNickname()) {
      if(this._raf !== null) {
        requestAnimationFrame.cancel(this._raf);
      }
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        if(this.hasNickname()) {
          this.refs.messageInput.getDOMNode().focus();
        }
      });
    }
  }

  componentWillUnmount() {
    if(this._raf !== null) {
      requestAnimationFrame.cancel(this._raf);
      this._raf = null;
    }
  }

  constructor(props) {
    super(props);
    this.state = { message: '' };
    this._raf = null;
  }

  updateMessage(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  postMessage(e) {
    e.preventDefault();
    if(!this.hasNickname()) {
      return;
    }
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
    const disabled = !this.hasNickname();
    const onChange = (e) => this.updateMessage(e);
    const onSubmit = (e) => this.postMessage(e);
    return <div className='MessageInput'>
      <form onSubmit={onSubmit}>
        <div className='ui fluid left icon input'>
          <input ref='messageInput' type='text' onChange={onChange} value={message} disabled={disabled}
            placeholder='Type message...' />
          <i className='comment icon' />
        </div>
      </form>
    </div>;
  }
}

export default MessageInput;
