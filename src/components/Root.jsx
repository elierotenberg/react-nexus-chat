const R = require('react-nexus');
const React = R.React;
const styles = require('../styles');

const Root = React.createClass({
  mixins: [R.Root.Mixin],

  getInitialState() {
    return {
      '/clock': null,
    };
  },

  getFluxStoreSubscriptions() {
    return {
      'clock': 'uplink://clock',
    };
  },

  render() {
    return <div className='Root'>
      Hello React Nexus. Now is {this.state.clock.tick}
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
