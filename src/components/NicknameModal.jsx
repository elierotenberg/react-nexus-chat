import React from 'react';
import Nexus from 'react-nexus';
import Identicon from 'react-identicon';
import sha256 from 'sha256';
import { styles } from 'react-statics-styles';

@styles({
  '.NicknameModal': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(120, 120, 120, 0.8)',
    cursor: 'not-allowed',
  },

  '.NicknameModal > div': {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})
@Nexus.component()
class NicknameModal extends React.Component {
  static displayName = 'NicknameModal';
  static propTypes = {
    clientID: React.PropTypes.string,
    nexus: React.PropTypes.shape({
      remote: React.PropTypes.shape({
        dispatchAction: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.refs.nicknameInput.getDOMNode().focus();
  }

  updateNickname(e) {
    if(this.state.disabled) {
      return;
    }
    const { value } = e.target;
    if(value.length > 14) {
      return;
    }
    this.setState({ nickname: value });
  }

  postNickname(e) {
    e.preventDefault();
    if(this.state.disabled) {
      return;
    }
    const { nickname } = this.state;
    const { clientID } = this.props;
    if(!clientID) {
      return;
    }
    this.props.nexus.remote.dispatchAction('/setNickname', { nickname, clientID });
    this.setState({ disabled: true });
  }

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      disabled: false,
    };
  }

  render() {
    const { disabled, nickname } = this.state;
    const { clientID } = this.props;
    const onChange = (e) => this.updateNickname(e);
    return <div className='NicknameModal'>
      <div>
        <form onSubmit={(e) => this.postNickname(e)} className='ui fluid form segment'>
          <h4 className='header'>
            Welcome to React Nexus Chat!
          </h4>
          <p>Your avatar is <Identicon id={sha256(clientID)} type='retro' className='ui mini avatar image' /></p>
          <p>Please enter a nickname to be able to post messages.</p>
            <div className='ui action input'>
              <input type='text' ref='nicknameInput' value={nickname} onChange={onChange}
                placeholder='Pick a nickname' disabled={disabled} />
              <button className='ui button' disabled={disabled} >Go!</button>
            </div>
        </form>
      </div>
    </div>;
  }
}

export default NicknameModal;
