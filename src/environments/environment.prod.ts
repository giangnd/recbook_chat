const config = require('./config.json');
export const environment = {
  production: true,
  API_PATH: "http://recbook-api.ap-southeast-1.elasticbeanstalk.com/api",
  SOCKET_PATH: "https://socket-dot-recbook-api.appspot.com",
  appName: config.appName,
};
