import EnSystemMessage from './locales/en/SystemMessage';
import FrSystemMessage from './locales/fr/SystemMessage';

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
    en: EnSystemMessage,
    'en-US': EnSystemMessage,
    fr: FrSystemMessage,
    'fr-FR': FrSystemMessage,
  },

  INT_MAX: 9007199254740992,
  DEFAULT_CLIENT_ID: 'DefaultClientId',
};
