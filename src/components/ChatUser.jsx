const R = require('react-nexus');
const React = R.React;

const ChatUser = React.createClass({
  mixins: [R.Component.Mixin],

  propTypes: {
    nickname: React.PropTypes.string.isRequired,
  },

  render() {
    return <div className='ChatUser'>
      {this.props.nickname}
    </div>;
  },

  statics: {
    styles: {

    }
  },
});

module.exports = ChatUser;
