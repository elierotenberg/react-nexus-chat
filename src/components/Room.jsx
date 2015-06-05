import React from 'react';
import Nexus from 'react-nexus';
import pure from 'pure-render-decorator';
import { styles } from 'react-statics-styles';

import MessageInput from './MessageInput';
import Messages from './Messages';
import Users from './Users';

@styles({
  '.Room': {
    paddingTop: '1em',
  },
})
@pure
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
      <div className='ui page grid'>
        <div className='sixteen column wide'>
          <div className='ui top attached header'>
            {topic}
          </div>
          <div className='ui attached segment'>
            <div className='ui grid'>
              <div className='eleven wide column'>
                <Messages {...this.props} />
              </div>
              <div className='five wide column'>
                <Users {...this.props} />
              </div>
            </div>
          </div>
          <div className='ui attached segment'>
            <MessageInput {...this.props} />
          </div>
          <div className='ui bottom attached segment'>
            React Nexus Demo Chat made with <i className='heart icon' /> by <a target='_blank' href='https://twitter.com/elierotenberg'>@elierotenberg</a>. Check out the code on <a target='_blank' href='https://github.com/elierotenberg/react-nexus-chat'><i className='github icon' /></a>!
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Room;
