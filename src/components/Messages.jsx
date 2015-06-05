import React from 'react';
import Nexus from 'react-nexus';
import pure from 'pure-render-decorator';
import moment from 'moment';
import Identicon from 'react-identicon';
import { styles } from 'react-statics-styles';
import requestAnimationFrame from 'raf';

function getTimeString(date) {
  return moment(date).format('HH:mm:ss');
}

@styles({
  '.Messages': {
    height: '600px',
    overflowY: 'scroll',
  },
})
@pure
class Messages extends React.Component {
  static displayName = 'Messages';

  static propTypes = {
    clientID: React.PropTypes.string.isRequired,
    messages: Nexus.PropTypes.Immutable.Map,
    status: Nexus.PropTypes.Immutable.Map,
    users: Nexus.PropTypes.Immutable.Map,
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.messages !== nextProps.messages) {
      requestAnimationFrame(() => {
        const messagesNode = this.refs.messages.getDOMNode();
        messagesNode.scrollTop = messagesNode.scrollHeight;
      });
    }
  }

  render() {
    const { messages } = this.props;
    return <div className='Messages ui feed' ref='messages'>
      {messages
        .sort((a, b) => a.date - b.date)
        .map(({ id, h, nickname, text, date }) => <div key={id} className='event'>
          <div className='label'>
            <Identicon id={h} type='retro' />
          </div>
          <div className='content'>
            <div className='summary'>
              <a className='user'>{nickname}</a>
              <div className='date'>{getTimeString(date)}</div>
            </div>
            <div className='extra text'>
              {text}
            </div>
          </div>
        </div>)
        .toArray()
      }
    </div>;
  }
}

export default Messages;
