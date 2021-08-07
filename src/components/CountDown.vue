<template>
  <div class="count-down-container">
    <div v-if="newOrderState === '02'" class="count-down flex jc-sb">
      <div>订单可支付时间：</div>
      <div>{{ randerTime }}</div>
    </div>

    <div v-else-if="newOrderState === '01'">订单状态：已支付,正在发货</div>

    <div v-else-if="newOrderState === '00'" class="fc-666">
      订单状态：已自动取消
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 倒计时
      countDownTime: null,

      // 订单状态的中间变量
      newOrderState: "02",

      // 渲染时间
      randerTime: "",
    };
  },

  props: {
    time: {
      type: Number,

      // 默认倒计 10 分钟
      default: 10,
    },

    createdOrderTime: {
      type: Number,
      required: true,
    },

    // 传过来的订单状态
    orderState: {
      type: String,
      default: "02",
    },
  },

  created() {
    this.newOrderState = this.orderState;

    // 将倒计时长转为秒数，多加的 4 秒钟是为了更新订单列表页的各个按钮状态时，后台数据已经更新
    this.countDownTime = Math.floor(
      (this.createdOrderTime +
        4000 +
        this.time * 60 * 1000 -
        new Date().getTime()) /
        1000
    );

    this.countDown();
  },

  watch: {
    // 当有订单超时取消就通知父组件刷新页面
    newOrderState(newVal) {
      if (newVal === "00") {
        this.$emit("changeOrderState");
      }
    },
  },

  methods: {
    countDown() {
      let timer = setInterval(() => {
        if (this.orderState === "01") {
          this.newOrderState = "01";
          clearInterval(timer);
        } else if (this.countDownTime >= 1) {
          this.newOrderState = "02";
        } else if (this.countDownTime < 1) {
          this.newOrderState = "00";
          clearInterval(timer);
        }
        this.countDownTime--;
        this.randerTime =
          Math.floor(this.countDownTime / 60) +
          " 分 " +
          Math.floor(this.countDownTime % 60) +
          " 秒";
      }, 1000);
    },
  },
};
</script>