/* eslint-disable no-console */
export default {
  get user() {
    const val = sessionStorage.getItem('user');
    try {
      if (val) return JSON.parse(val);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  set user(userinfo) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
  },
  get token() {
    return sessionStorage.getItem('token');
  },
  set token(token) {
    sessionStorage.setItem('token', token);
  },
  get openid() {
    return sessionStorage.getItem('openid');
  },
  set openid(openid) {
    sessionStorage.setItem('openid', openid);
  },
  get isGuest() {
    return !this.user || this.user.role === 'guest';
  },
  save({ userinfo, token }) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
    sessionStorage.setItem('token', token);
  },

  get corpInfo() {
    const val = sessionStorage.getItem('corpInfo');
    if (val) return JSON.parse(val);
    return null;
  },
  set corpInfo(corpInfo) {
    sessionStorage.setItem('corpInfo', JSON.stringify(corpInfo));
  },
  saveCorpInfo(corpInfo) {
    sessionStorage.setItem('corpInfo', JSON.stringify(corpInfo));
  },

  get unit() {
    const val = sessionStorage.getItem('unit');
    if (val) return JSON.parse(val);
    return null;
  },
  set unit(unitList) {
    sessionStorage.setItem('unit', JSON.stringify(unitList));
  },
  saveUnit(unitList) {
    sessionStorage.setItem('unit', JSON.stringify(unitList));
  },
  get userInfo() {
    const val = sessionStorage.getItem('userInfo');
    if (val) return JSON.parse(val);
    return null;
  },
  set userInfo(userInfo) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  saveUserInfo(userInfo) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
};
