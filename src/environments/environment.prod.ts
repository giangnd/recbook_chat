const config = require('./config.json');
export const environment = {
  production: true,
  API_PATH: "https://recbook-api.appspot.com/api",
  SOCKET_PATH: "https://socket-dot-recbook-api.appspot.com",
  appName: config.appName,
};
