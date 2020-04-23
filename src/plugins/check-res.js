/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import Vue from 'vue';
import _ from 'lodash';
import { Message } from 'element-ui';

const vm = new Vue({});
const Plugin = {
  install(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$checkRes = (res, okText, errText) => {
      let _okText = okText;
      let _errText = errText;
      if (!_.isFunction(okText) && _.isObject(okText) && okText != null) {
        ({ okText: _okText, errText: _errText } = okText);
      }
      const { errcode = 0, errmsg } = res || {};
      if (errcode === 0) {
        if (_.isFunction(_okText)) {
          return _okText();
        }
        if (_okText) {
          Message.success(_okText);
        }
        return true;
      }
      if (_.isFunction(_errText)) {
        return _errText();
      }
      Message.error(_errText || errmsg);
      // Message({ message: _errText || errmsg, duration: 60000 });
      return false;
    };
  },
};

Vue.use(Plugin);
