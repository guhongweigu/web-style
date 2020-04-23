/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import _ from 'lodash';
import Axios from 'axios';
import { Util, Error } from 'naf-core';
// import { Indicator } from 'mint-ui';
import util from './user-util';

const { trimData, isNullOrUndefined } = Util;
const { ErrorCode } = Error;

let currentRequests = 0;

export default class AxiosWrapper {
  constructor({ baseUrl = '', unwrap = true } = {}) {
    this.baseUrl = baseUrl;
    this.unwrap = unwrap;
  }

  // 替换uri中的参数变量
  static merge(uri, query = {}) {
    if (!uri.includes(':')) {
      return uri;
    }
    const keys = [];
    const regexp = /\/:([a-z0-9_]+)/gi;
    let res;
    // eslint-disable-next-line no-cond-assign
    while ((res = regexp.exec(uri)) != null) {
      keys.push(res[1]);
    }
    keys.forEach(key => {
      if (!isNullOrUndefined(query[key])) {
        uri = uri.replace(`:${key}`, query[key]);
      }
    });
    return uri;
  }
  //替换路由方法
  static routerChange(uri, router = {}) {
    let keys = Object.keys(router);
    keys.forEach(key => {
      uri = _.replace(uri, `{${key}}`, router[key]);
    });
    return uri;
  }

  $get(uri, router, query, options) {
    return this.$request(uri, null, query, options, router);
  }

  $post(uri, data = {}, router, query, options) {
    return this.$request(uri, data, query, options, router);
  }

  $delete(uri, data = {}, router, query, options = {}) {
    options = { ...options, method: 'delete' };
    return this.$request(uri, data, query, options, router);
  }

  async $request(uri, data, query, options, router) {
    // TODO: 合并query和options
    if (_.isObject(query) && _.isObject(options)) {
      options = { ...options, params: query, method: 'get' };
    } else if (_.isObject(query) && !query.params) {
      options = { params: query };
    } else if (_.isObject(query) && query.params) {
      options = query;
    }
    if (!options) options = {};
    if (options.params) options.params = trimData(options.params);
    let url = AxiosWrapper.merge(uri, options.params);
    //处理url部分需要替换参数的情况
    if (_.isObject(router)) {
      url = AxiosWrapper.routerChange(url, router);
    }
    currentRequests += 1;
    // Indicator.open({
    //   spinnerType: 'fading-circle',
    // });

    try {
      const axios = Axios.create({
        baseURL: this.baseUrl,
      });
      if (sessionStorage.getItem('token')) {
        axios.defaults.headers.common.Authorization = util.token;
      }
      let res = await axios.request({
        method: isNullOrUndefined(data) ? 'get' : 'post',
        url,
        data,
        responseType: 'json',
        ...options,
      });
      res = res.data;
      const { errcode, errmsg, details } = res;
      if (errcode) {
        console.warn(`[${uri}] fail: ${errcode}-${errmsg} ${details}`);
        return res;
      }
      // unwrap data
      if (this.unwrap) {
        res = _.omit(res, ['errmsg', 'details']);
        const keys = Object.keys(res);
        if (keys.length === 1 && keys.includes('data')) {
          res = res.data;
        }
      }
      return res;
    } catch (err) {
      let errmsg = '接口请求失败，请稍后重试';
      if (err.response) {
        const { status } = err.response;
        if (status === 401) errmsg = '用户认证失败，请重新登录';
        if (status === 403) errmsg = '当前用户不允许执行该操作';
      }
      console.error(
        `[AxiosWrapper] 接口请求失败: ${err.config && err.config.url} - 
        ${err.message}`
      );
      return { errcode: ErrorCode.SERVICE_FAULT, errmsg, details: err.message };
    } finally {
      /* eslint-disable */
      currentRequests -= 1;
      if (currentRequests <= 0) {
        currentRequests = 0;
        // Indicator.close();
      }
    }
  }
}
