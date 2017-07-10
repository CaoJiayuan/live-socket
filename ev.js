const ev = {
  commands: {
    RELOAD: 'command:reload',
    NOTICE: 'command:notice',
    GIFT  : 'command:gift'
  },
  events  : {
    LOGIN     : 'login',
    DISCONNECT: 'disconnect',
    USERS     : 'users',
    RELOAD    : 'reload',
    NOTICE    : 'notice',
    RECONNECT : 'reconnect',
    PING      : 'ping',
    GIFT      : 'gift'
  }
};

module.exports = ev;