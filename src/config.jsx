import en from './locales/en';
import fr from './locales/fr';

export default {
  analytics: {
    UA: 'UA-XXXXX-X',
  },

  render: {
    port: {
      public: 443,
      private: 19924,
    },
    host: 'react-nexus-chat.rotenberg.io',
    protocol: 'https',
  },

  flux: {
    port: {
      public: 443,
      private: 19925,
    },
    host: 'react-nexus-chat-flux.rotenberg.io',
    protocol: 'https',
  },

  intl: {
    en,
    'en-US': en,
    fr,
    'fr-FR': fr,
  },

  INT_MAX: 9007199254740992,
  DEFAULT_CLIENT_ID: 'DefaultClientId',
  APP_ROOT_ID: 'ReactNexusChatAppRoot',
};
