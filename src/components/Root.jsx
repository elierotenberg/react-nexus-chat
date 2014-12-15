const R = require('react-nexus');
const React = R.React;
const styles = require('../styles');

const Root = React.createClass({
  mixins: [R.Root.Mixin],

  getFluxStoreSubscriptions() {
    return {
      'clock': 'uplink://clock',
      'users': 'uplink://users',
    };
  },

  render() {
    return <div className='Root'>
      Hello React Nexus. Now is {this.state.clock ? this.state.clock.now : '(unknown)'} and there are {this.state.users ? this.state.users.count : '(unknown)'} active users.
    </div>;
  },

  statics: {
    styles: {
      'html, body': {
        color: styles.colors.Text,
        fontFamily: styles.fonts.Roboto,
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
    },
  },
});

module.exports = Root;
