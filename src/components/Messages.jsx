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

  '.Messages-content': {
    maxWidth: '90%',
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
    return <div className='Messages ui list' ref='messages'>
      {messages
        .sort((a, b) => a.date - b.date)
        .map(({ id, h, nickname, text, date }) => <div key={id} className='item'>
          <Identicon id={h} type='retro' className='ui top aligned mini avatar image' />
          <div className='Messages-content content'>
            <div className='header'>{nickname} <span className='Messages-date'>{getTimeString(date)}</span></div>
            {text}
          </div>
        </div>)
        .toArray()
      }
    </div>;
  }
}

export default Messages;
