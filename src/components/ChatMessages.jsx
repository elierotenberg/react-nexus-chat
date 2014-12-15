const R = require('react-nexus');
const React = R.React;

const ChatMessages = React.createClass({
  mixins: [R.Component.Mixin],

  render() {
    return <div className='ChatMessages'>
      Chat messages.
    </div>;
  },

  statics: {
    styles: {
    },
  },
});

module.exports = ChatMessages;
