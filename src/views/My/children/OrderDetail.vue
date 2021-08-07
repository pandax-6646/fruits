<template>
  <div class="my-order-detail-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.push('/my/order')"
    />

    <!-- 订单状态 -->
    <div class="order-state flex">
      <div
        class="cancel-order flex jc-sa ai-c wp-100"
        v-if="orderDetail.orderStatus === '00'"
      >
        <span>已取消</span>
        <img
          src="https://file.sdyxmall.com/h5/v1/public/app/img/cancel.ff91da7.png"
          alt=""
        />
      </div>

      <div
        class="wp-100 flex ai-c jc-sa"
        v-if="orderDetail.orderStatus === '01'"
      >
        <span>已支付</span>
        <span>等待商家发货....</span>
      </div>

      <div
        class="wp-100 flex ai-c jc-sa"
        v-if="orderDetail.orderStatus === '02'"
      >
        <span>等待支付</span>

        <!-- 倒计时 -->
        <CountDown
          :time="5"
          :createdOrderTime="orderDetail.createTime"
          :orderState="orderDetail.orderStatus"
          class="fs-12"
        />
      </div>
    </div>

    <!-- 商品 -->
    <div class="goods-list mt-10">
      <van-card
        v-for="goods in orderDetail.carts"
        :key="goods.cartId"
        :num="goods.buyNum"
        :price="(goods.price / 100).toFixed(2)"
        :desc="goods.slaveName"
        :title="goods.masterName"
        :thumb="goods.imgUrl"
      />
    </div>

    <div class="pay-money-info bc-fff mt-10 flex fw-w">
      <p class="flex jc-sb wp-100 ai-c fs-13">
        <span class="fc-666">商品金额</span>
        <span>￥ {{ orderDetail.totalMoney }}</span>
      </p>
      <p class="flex jc-sb wp-100 ai-c fs-13">
        <span class="fc-666">运费</span>
        <span>￥10</span>
      </p>
      <p class="flex jc-sb wp-100 ai-c">
        <span>实付</span>
        <span class="pay-money fs-18"
          >￥ {{ (orderDetail.allFee / 100).toFixed(2) }}</span
        >
      </p>
    </div>
    <div class="order-info bc-fff mt-10 fc-666 fs-12 flex ac-sa fw-w">
      <p class="wp-100 flex jc-sb ai-c">
        <span> 订单编号： {{ orderDetail.orderId }} </span>
        <span
          class="copy-order-number"
          @click="copyOrderNum(orderDetail.orderId)"
          >复制</span
        >
      </p>
      <p class="wp-100">
        <span> 下单时间： {{ orderDetail.createTime | changeTimeType }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import CountDown from "@/components/CountDown";
import { orderRequest } from "@/api";
export default {
  name: "orderDetail",
  data() {
    return {
      orderId: this.$route.params.orderId,
      orderDetail: {},
    };
  },
  components: {
    CountDown,
  },
  filters: {
    // 转换时间类型
    changeTimeType(time) {
      let newTimeObj = {
        year: new Date(time).getFullYear(),
        month: new Date(time).getMonth() + 1,
        day: new Date(time).getDate(),
        hour: new Date(time).getHours(),
        minute: new Date(time).getMinutes(),
        second: new Date(time).getSeconds(),
      };

      for (let prop in newTimeObj) {
        let value = newTimeObj[prop];
        newTimeObj[prop] = value > 9 ? value : ("0" + value).slice(0, 2);
      }

      return `${newTimeObj.year}-${newTimeObj.month}-${newTimeObj.day} ${newTimeObj.hour}:${newTimeObj.minute}:${newTimeObj.second}`;
    },
  },
  created() {
    this.getOrderDetailInfo();
  },

  methods: {
    getOrderDetailInfo() {
      orderRequest
        .orderDetail({ orderId: this.orderId })
        .then((res) => (this.orderDetail = res.result))
        .catch((err) => this.$toast.fail(err));
    },
    copyOrderNum(orderId) {
      this.$toast.success(`复制成功 \n ${orderId}`);
    },
  },
};
</script>

<style lang="less" scoped>
.order-state {
  height: 80px;
  background-color: #c03131;
  color: #fff;
  img {
    width: 100px;
  }
}
.goods-list {
  .van-card {
    margin: 1px 0;
    background-color: #fff;
  }
}
.pay-money-info {
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
  .pay-money {
    color: #c03131;
  }
}
.order-info {
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  .copy-order-number {
    padding: 2px;
    border: 1px solid #ebedf0;
    border-radius: 3px;
    color: #222;
  }
}
</style>