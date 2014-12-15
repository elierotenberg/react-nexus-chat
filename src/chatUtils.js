const _ = require('lodash-next');

module.exports = {
  userId(guid) {
    return _.secureHash(guid);
  },

  messageId() {
    return _.uniqueId('message');
  },
};
