<template>
  <div class="my-order-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="我的订单"
      left-arrow
      :border="true"
      @click-left="$router.push('/my')"
    />

    <!-- 导航栏 -->
    <van-sticky>
      <van-cell class="tab-bar">
        <van-tabs v-model="active">
          <van-tab title="全部"></van-tab>
          <van-tab title="待付款"></van-tab>
          <van-tab title="待发货"></van-tab>
          <van-tab title="已取消"></van-tab>
        </van-tabs>
      </van-cell>
    </van-sticky>

    <ul class="container wp-100">
      <li
        v-for="order in changeOrderList"
        :key="order.orderId"
        class="mt-10 bc-fff"
      >
        <!-- 商品信息 -->
        <div class="goods">
          <router-link
            :to="`/my/orderDetail/${order.orderId}`"
            class="flex jc-sb ai-c wp-100"
          >
            <div class="flex fw-nw">
              <img
                :src="goods.imgUrl"
                alt=""
                v-for="goods in order.carts"
                :key="goods.cartId"
              />
            </div>

            <div class="fg-1 flex wp-100 fw-w" v-if="order.carts.length == 1">
              <p class="fs-15">{{order.carts[0].masterName}}</p>
              <p class="flex jc-sb wp-100">
                <span class="fs-22 ml-10"
                  >￥{{ (order.allFee / 100).toFixed(2) }}</span
                >
                <span class="fc-999 mr-10 fs-14"
                  >x {{ order.carts | getOrderGoodsNum }}</span
                >
              </p>
            </div>
            <van-icon
              name="arrow"
              class="ml-10"
              v-show="order.carts.length != 1"
            />
          </router-link>
        </div>

        <!-- 商品数量支付  -->
        <div class="goods-num wp-100 flex fs-14">
          <div>
            <span>共{{ order.carts | getOrderGoodsNum }}件商品 </span>
            <span> 实付 </span>
            <span> ￥{{ (order.allFee / 100).toFixed(2) }}</span>
          </div>
        </div>

        <!-- 订单状态 -->
        <div class="orderState flex jc-sb fs-12 ai-c">
          
          <!-- 倒计时 -->
          <CountDown
            :time="5"
            :createdOrderTime="order.createTime"
            :orderState="order.orderStatus"
            @changeOrderState="changeOrderState"
          />
          <div class="flex ai-c">
            <span
              v-if="order.orderStatus === '02'"
              @click="
                toPay(
                  order.orderId,
                  order.allFee,
                  order.createTime,
                  order.qrcode
                )
              "
              >去支付</span
            >
            <span
              v-else-if="order.orderStatus === '01'"
              @click="toPreOrderDetail(order.preOrderId)"
              >再次购买</span
            >
            <span v-else @click="toPreOrderDetail(order.preOrderId)"
              >重新购买</span
            >
            <span
              @click="delOrder(order.orderId)"
              v-if="order.orderStatus !== '01'"
              >删除订单</span
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CountDown from "@/components/CountDown";
import { orderRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "order",
  data() {
    return {
      // 导航栏切换索引
      active: 0,

      // 所有订单的列表
      orderList: [],
    };
  },
  mixins: [toast],

  components: {
    CountDown,
  },

  created() {
    this.getOrderAllInfo();
  },

  computed: {
    // 修改渲染列表
    changeOrderList() {
      let randerOrderList = [];

      if (this.active == 1) {
        randerOrderList = this.orderList.filter(
          (order) => order.orderStatus === "02"
        );
      } else if (this.active == 2) {
        randerOrderList = this.orderList.filter(
          (order) => order.orderStatus === "01"
        );
      } else if (this.active == 3) {
        randerOrderList = this.orderList.filter(
          (order) => order.orderStatus === "00"
        );
      } else {
        randerOrderList = this.orderList;
      }
      return randerOrderList;
    },
  },

  filters: {
    // 计算商品总数量
    getOrderGoodsNum(cartList) {
      let goodsNum = 0;
      cartList.forEach((goods) => (goodsNum += goods.buyNum));
      return goodsNum;
    },
  },

  methods: {
    // 获取全部订单
    getOrderAllInfo() {
      this.showLoading();
      orderRequest
        .getOrderAll()
        .then((res) => {
          this.orderList = res.list;
          this.$toast.clear();
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 待支付,跳转到支付页面
    toPay(orderId, allFee, createdOrderTime, qrCode) {
      this.$router.push({
        name: "pay",
        params: {
          orderId,
          allFee,
          createdOrderTime,
          qrCode,
        },
      });
    },

    // 删除订单
    delOrder(orderId) {
      if (window.confirm("是否删除该订单？")) {
        this.showLoading();
        orderRequest
          .delOrder({ orderId })
          .then((res) => {
            if (res.code == 666) {
              // 重新渲染列表数据
              this.orderList = this.orderList.filter(
                (order) => order.orderId != orderId
              );
              this.$toast.clear();
              this.$toast.success("小主，订单删除成功");
            }
          })
          .catch((err) => this.$toast.fail(err));
      }
    },

    // 页面有订单状态发生改变时重新发请求
    changeOrderState() {
      this.getOrderAllInfo();
    },

    // 跳转到预订单页
    toPreOrderDetail(preOrderId) {
      this.$router.push({
        name: "preOrderDatail",
        params: {
          preOrderId,
          isBuyAgain: true,
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
.nav-bar {
  height: 45px;
  line-height: 45px;
}
.tab-bar {
  padding: 0;
}
.container {
  li {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .goods {
    line-height: 35.5px;
    padding: 15px 0;
    box-sizing: border-box;

    a > div:first-child {
      overflow-x: auto;
      min-width: 80px;

      img {
        width: 70px;
        background-color: #ebebeb;
        margin-right: 10px;
        border-radius: 10px;
      }
    }
    a > div:nth-of-type(2) {
      p:first-child {
        max-width: 265px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .goods-num {
    height: 40px;
    justify-content: flex-end;
    line-height: 40px;
    border-top: 1px solid #eeee;
    border-bottom: 1px solid #eeee;
    span:last-child {
      color: #c03131;
      font-weight: bold;
    }
  }
  .orderState {
    height: 45px;
    line-height: 45px;
    div {
      height: 20px;
      line-height: 20px;
      span {
        padding: 5px;
        border: 1px solid #222;
        margin: 0 2px;
        border-radius: 2px;
      }
    }
  }
}
</style>