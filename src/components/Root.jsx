const R = require('react-nexus');
const React = R.React;
const styles = require('../styles');

const ChatRoom = require('./ChatRoom');

const Root = React.createClass({
  mixins: [R.Root.Mixin],

  render() {
    return <div className='Root'>
      <ChatRoom />
    </div>;
  },

  statics: {
    styles: {
      'html, body': {
        color: styles.colors.Text,
        fontFamily: styles.fonts.Roboto,
        width: '100%',
        height: '100%',
        margin: '0 auto',
      },

      'a, a:hover, a:visited, a:active': {
        textDecoration: 'none',
      },

      'a': {
        color: styles.colors.Link,
      },

      'a:hover': {
        color: styles.colors.LinkHover,
      },

      'a:active': {
        color: styles.colors.LinkActive,
      },

      '.Root': {
        width: 1024,
        height: 640,
        margin: '0 auto',
      },
    },
  },
});

module.exports = Root;
