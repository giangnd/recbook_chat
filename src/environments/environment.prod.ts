const config = require('./config.json');
export const environment = {
  production: true,
  API_PATH: "https://recbook-chat-api.herokuapp.com/api",
  SOCKET_PATH: "https://recbook-chat-socket.herokuapp.com",
  appName: config.appName,
};
