const config = require('./config.json');
export const environment = {
  production: true,
  API_PATH: "https://recbook-api.giangweb.com/api",
  SOCKET_PATH: "http://54.242.122.43:8081",
  appName: config.appName,
};
