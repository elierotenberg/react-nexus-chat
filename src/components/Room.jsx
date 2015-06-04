import React from 'react';
import Nexus from 'react-nexus';

import MessageInput from './MessageInput';
import Messages from './Messages';
import Users from './Users';

class Room extends React.Component {
  static displayName = 'Room';
  static propTypes = {
    clientID: React.PropTypes.string.isRequired,
    messages: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  render() {
    const { status } = this.props;
    const topic = status.get('topic');
    return <div className='Room'>
      <div className='Room-header'>
        {topic}
      </div>
      <div className='Room-body'>
        <div className='Room-body-upper'>
          <Messages {...this.props} />
          <Users {...this.props} />
        </div>
        <div className='Room-body-lower'>
          <MessageInput {...this.props} />
        </div>
      </div>
      <div className='Room-footer'>
        <a target='_blank' href='https://github.com/elierotenberg/react-nexus-chat'>github</a>
      </div>
    </div>;
  }
}

export default Room;
