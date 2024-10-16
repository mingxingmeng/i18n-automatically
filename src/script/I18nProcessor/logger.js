const { readConfig } = require('../setting');

const logger = (type) => {
  const config = readConfig();
  if (config.debug || type === 'error') {
    return (message, ...args) => {
      switch (type) {
        case 'debug':
          console.debug(message, ...args);
          break;
        case 'info':
          console.log(message, ...args);
          break;
        case 'warn':
          console.warn(message, ...args);
          break;
        case 'error':
          console.error(message, ...args);
          break;
      }
    };
  } else {
    return () => {};
  }
};

module.exports = {
  debug: logger('debug'),
  info: logger('info'),
  warn: logger('warn'),
  error: logger('error'),
};
