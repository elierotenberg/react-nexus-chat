import React from 'react';
import Nexus from 'react-nexus';
import pure from 'pure-render-decorator';

@pure
class Messages extends React.Component {
  static displayName = 'Messages';

  static propTypes = {
    clientID: React.PropTypes.string.isRequired,
    messages: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  render() {
    const { messages } = this.props;
    return <ul className='Messages'>
      {messages
        .sort((a, b) => a.date - b.date)
        .map(({ id, nickname, text, date }) => <li key={id} className='Messages-item'>
          <div className='Messages-item-date'>
            {date}
          </div>
          <div className='Messages-item-nickname'>
            {nickname}
          </div>
          <div className='Messages-item-text'>
            {text}
          </div>
        </li>)
        .toArray()
      }
    </ul>;
  }
}

export default Messages;
