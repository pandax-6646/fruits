<template>
  <div class="pay-container bc-fff">
    <van-nav-bar
      :title="$route.params.payType == 'wx' ? '请用微信扫码' : '请用支付宝扫码'"
      left-arrow
      @click-left="$router.push('/my/order')"
    />

    <div class="qr-code wp-100 pt-30 pb-30">
      <img :src="params.qrCode" alt="" />
    </div>

    <p class="pay-money">￥{{ (params.allFee / 100).toFixed(2) }}</p>
    <div class="order-info fs-12">
      <p class="flex jc-sb">
        <span>订单号:</span>
        <span>{{ params.orderId }}</span>
      </p>
      <p class="flex jc-sb">
        <span>收款方:</span>
        <span>天堂电子商务有限公司</span>
      </p>
      <p>
        <!-- 倒计时 time 为停止计时的时长，单位为分钟 createdOrderTime 为创建订单的时间 orderState 为订单状态-->
        <CountDown
          :time="5"
          :createdOrderTime="Number(params.createdOrderTime)"
        />
      </p>
    </div>
  </div>
</template>

<script>
import CountDown from "@/components/CountDown";
import { orderRequest } from "@/api";
export default {
  name: "pay",

  data() {
    return {
      params: null,
      timer: null,
    };
  },

  components: {
    CountDown,
  },

  created() {
    this.params = this.$route.params;
    this.$toast.clear();
    this.checkPayState();
  },
  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    // 进入支付页面后，轮询该订单的支付状态是否改变
    checkPayState() {
      this.timer = setInterval(() => {
        orderRequest
          .orderDetail({ orderId: this.params.orderId })
          .then((res) => {
            if (res.result.orderStatus == "01") {
              this.$router.push(`/my/orderDetail/${this.params.orderId}`);
              clearInterval(this.timer);
            }
          })
          .catch((err) => this.$toast.fail("小主支付失败"));
      }, 2000);
    },
  },
};
</script>

<style lang='less' scoped>
.pay-container {
  height: 100vh;
}
.qr-code {
  height: 200px;
  img {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}
.pay-money {
  font-size: 30px;
  text-align: center;
  color: #f40;
  line-height: 100px;
  font-weight: bold;
}
.order-info {
  padding: 20px 30px;
  color: #2d3e4f;
  p {
    height: 45px;
    border-bottom: 1px solid #eee;
    line-height: 45px;
  }
}
</style>