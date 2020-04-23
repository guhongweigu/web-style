import { Util } from 'naf-core';

const { isNullOrUndefined } = Util;

export default {
  //判断信息是否过期
  isDateOff(dataDate) {
    const now = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    dataDate = new Date(dataDate);
    return now.getTime() <= dataDate.getTime();
  },
  //判断企业是否可以执行此动作/显示
  checkCorp(data) {
    const { role, unit, selfUnit, status, displayType, userid } = data;
    if (!isNullOrUndefined(selfUnit) && !isNullOrUndefined(status)) {
      return role === 'corp' && selfUnit === unit && status === '0';
    } else if (!isNullOrUndefined(displayType)) {
      if (role === 'corp') {
        return role === displayType;
      } else {
        return role === displayType && !isNullOrUndefined(userid);
      }
    }
  },
  //获取url的参数params
  getParams() {
    let str = location.href;
    let num = str.indexOf('?');
    const param = {};
    str = str.substr(num + 1);
    let num2 = str.indexOf('#');
    let str2 = '';
    if (num2 > 0) {
      str2 = str.substr(0, num2);
    } else {
      num2 = str.indexOf('/');
      str2 = str.substr(0, num2);
    }
    const arr = str2.split('&');
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        const name = arr[i].substring(0, num);
        const value = arr[i].substr(num + 1);
        param[name] = decodeURI(value);
      }
    }
    return param;
  },
};
