import React from 'react';
import Nexus from 'react-nexus';

@Nexus.inject(() => ({}))
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

  updateNickname(e) {
    if(this.state.disabled) {
      return;
    }
    const { value } = e.target;
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
    return <div className='NicknameModal'>
      <form onSubmit={(e) => this.postNickname(e)}>
        <fieldset disabled={disabled}>
          <input type='text' value={nickname} onChange={(e) => this.updateNickname(e)}/>
          <input type='submit' value='set nickname' />
        </fieldset>
      </form>
    </div>;
  }
}

export default NicknameModal;
