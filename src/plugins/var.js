import Vue from 'vue';
import _ from 'lodash';

const getSiteId = () => {
  let host = `${window.location.hostname}`; //`999991.smart.jilinjobswx.cn ${window.location.hostname}`
  let schId;
  host = host.replace('http://', '');
  let arr = host.split('.');
  if (arr.length > 0) {
    schId = arr[0];
    if (schId === 'smart') schId = 'master';
    else `${schId}`.includes('localhost') || `${schId}`.includes('127.0.0.1') ? (schId = '99991') : '';
    sessionStorage.setItem('schId', `${schId}`.includes('localhost') || `${schId}`.includes('127.0.0.1') ? '99991' : schId);
  }
  return schId;
};
const Plugin = {
  install(vue, options) {
    // 4. 添加实例方法
    vue.prototype.$limit = 10;
    vue.prototype.$site = getSiteId();
  },
};

Vue.use(Plugin);
