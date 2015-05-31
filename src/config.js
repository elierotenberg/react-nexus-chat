import en from './locales/en';
import fr from './locales/fr';

export default {
  MODULE_NAME: 'react-nexus-chat',

  analytics: {
    UA: 'UA-XXXXX-X',
  },

  render: {
    port: 80,
    host: 'localhost',
    protocol: 'http',
  },

  flux: {
    port: 8080,
    host: 'localhost',
    protocol: 'http',
  },

  intl: {
    en,
    'en-US': en,
    fr,
    'fr-FR': fr,
  },

  INT_MAX: 9007199254740992,
  DEFAULT_CLIENT_ID: 'DefaultClientId',
};
