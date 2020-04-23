<template>
  <div id="qrcodes" style="width:100%;">
    <mt-header title="二维码">
      <mt-button class="bgnone" slot="left" @click="$router.go(-1)">返回</mt-button>
    </mt-header>
    <span v-if="user.role === 'user'">
      <li class="txtQr" style="padding-top:7vh;">学生姓名：{{ userInfo.xm || '' }}</li>
      <li class="txtQr">门票类型：{{ ticketType }}</li>
    </span>
    <div id="qrcode" style="display:flex;justify-content:center;align-items:center;" :style="newHeight" ref="qrcode">
      <canvas id="canvas" style="display:-webkit-inline-box;width: 4rem !important;height:4rem !important;margin-top: 200px;"></canvas>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import QRCode from 'qrcode';
export default {
  name: 'qrcodes',
  data() {
    return {
      id: this.$route.query.id || '',
      ticketType: this.$route.query.type && this.$route.query.type === '0' ? '普通票' : '受限票' || '',
      popupVisible: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.publics.user,
      userInfo: state => state.self.userInfo,
    }),
    newHeight: {
      get() {
        let height;
        if (this.user.role === 'user') {
          height = window.screen.availHeight * 0.3 + 'px';
        } else {
          height = window.screen.availHeight * 0.6 + 'px';
        }
        let style = { height: height };
        return style;
      },
    },
  },
  created() {
    this.$nextTick(() => {
      this.initQrcode();
    });
  },
  methods: {
    async initQrcode() {
      if (!this.booForQrcode) {
        await QRCode.toCanvas(document.getElementById('canvas'), this.id, {
          width: 300,
          margin: 0,
          color: { dark: this.$route.query.type === '0' ? '#00ff14' : '#FF9900' },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.txtQr {
  font-size: 14px;
  text-align: center;
  min-height: 30px;
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mint-header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #26a2ff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  background: #2577e3;
  padding: 0;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
</style>
