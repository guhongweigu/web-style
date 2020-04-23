import Vue from 'vue';

Vue.config.weixin = {
  // baseUrl: process.env.BASE_URL + 'weixin',
  baseUrl: `http://${location.host}/weixin`,
};

Vue.config.stomp = {
  // brokerURL: 'ws://192.168.1.190:15674/ws',
  brokerURL: '/ws', // ws://${location.host}/ws
  connectHeaders: {
    host: 'smart',
    login: 'web',
    passcode: 'web123',
  },
  // debug: true,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
};
