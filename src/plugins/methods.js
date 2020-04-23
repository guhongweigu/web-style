import Vue from 'vue';
import _ from 'lodash';
const Plugin = {
  install(Vue, options) {
    // 3. 注入组件
    Vue.mixin({
      created() {
        if (this.$store && !this.$store.$toUndefined) {
          this.$store.$toUndefined = this.$toUndefined;
        }
      },
    });
    // 4. 添加实例方法
    Vue.prototype.$toUndefined = object => {
      let keys = Object.keys(object);
      keys.map(item => {
        object[item] = object[item] === '' ? (object[item] = undefined) : object[item];
      });
      return object;
    };
    Vue.prototype.$turnTo = item => {
      if (item.info_type == 1) {
        window.open(item.url);
      } else {
        let router = window.vm.$router;
        let route = window.vm.$route.path;
        router.push({ path: `/info/detail?id=${item.id}` });
      }
    };
  },
};

Vue.use(Plugin);
