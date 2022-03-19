const chalk = require('chalk')

const log = console.log;

const error = (msg, canExit = true) => {
  console.error(chalk.white.bgRed(`Error: ${msg}`))
  canExit && process.exit()
};

module.exports = {
  log,
  error,
};
