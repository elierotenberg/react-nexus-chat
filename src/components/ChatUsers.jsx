const R = require('react-nexus');
const React = R.React;

const ChatUser = require('./ChatUser');

const ChatUsers = React.createClass({
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions() {
    return {
      'users': 'uplink://userList',
    };
  },

  render() {
    return <div className='ChatUsers'><ul>
    {this.state.users ?
      Object.keys(this.state.users).map((userId) => <li key={userId}>
        <ChatUser nickname={this.state.users[userId]} />
      </li>) : null}
    </ul></div>;
  },

  statics: {
    styles: {
    },
  },
});

module.exports = ChatUsers;
