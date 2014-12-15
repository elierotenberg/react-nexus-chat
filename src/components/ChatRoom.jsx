const R = require('react-nexus');
const React = R.React;

const ChatMessages = require('./ChatMessages');
const ChatUsers = require('./ChatUsers');

const ChatRoom = React.createClass({
  mixins: [R.Component.Mixin],

  render() {
    return <div className='ChatRoom'>
      <div className='ChatRoom-ChatMessages'>
        <ChatMessages />
      </div>
      <div className='ChatRoom-ChatUsers'>
        <ChatUsers />
      </div>
    </div>;
  },

  statics: {
    styles: {
      '.ChatRoom': {
        width: '100%',
        height: '100%',
      },

      '.ChatRoom-ChatMessages, .ChatRoom-ChatUsers': {
        display: 'inline-block',
        height: '100%',
      },

      '.ChatRoom-ChatMessages': {
        width: '70%',
      },

      '.ChatRoom-ChatUsers': {
        width: '30%',
      },
    },
  },
});

module.exports = ChatRoom;
