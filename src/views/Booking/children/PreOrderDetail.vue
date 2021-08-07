<template>
  <div class="booking-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      :border="true"
      @click-left="$router.push('/my/order')"
    />
    <!-- 收货地址 -->
    <van-cell
      is-link
      icon="location-o"
      class="flex ai-c address"
      @click="uesAddress"
    >
      <template #title>
        <div class="ml-10 bc-fff">
          <p>
            <span class="fs-16">{{ shippingInfo.name }}</span>
            <span class="fs-12 ml-15">{{
              shippingInfo.phone.replace(/(\d{4})(\d{4})(\d{3})/, "$1****$3")
            }}</span>
          </p>
          <p>{{ shippingInfo.address }}</p>
        </div>
      </template>
    </van-cell>

    <div class="decorate wp-100"></div>
    <div class="goods-list">
      <van-card
        v-for="item in preGoodsList"
        :key="item.productId"
        :num="item.buyNum"
        :price="(item.price / 100).toFixed(2)"
        :desc="item.slaveName"
        :title="item.masterName"
        :thumb="item.imgUrl"
      />
    </div>
    <van-cell-group class="price-info">
      <van-cell title="商品总价格" :value="`￥${totalMoney}`" />
      <van-cell title="运费" :value="`￥${freight}`" />
    </van-cell-group>

    <!-- 优惠券部分 -->
    <div class="order-info-coupons mt-10">
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="availableCoupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
        icon="coupon-o"
      />

      <!-- 优惠券列表 -->
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px"
      >
        <van-coupon-list
          :coupons="availableCoupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      <van-cell title="余额" icon="shop-o">
        <template #right-icon>
          <span>￥0.00</span>
        </template>
      </van-cell>
      <van-cell title="发票" icon="shop-o">
        <template #right-icon>
          <span>不可开发票</span>
        </template>
      </van-cell>

      <!-- 提交订单 -->
      <van-submit-bar
        :loading="loding"
        :price="Number(costPay)"
        button-text="提交订单"
        @submit="onSubmit"
      />

      <!-- 动作面板 -->
      <van-action-sheet v-model="show" title="支付">
        <div class="content">
          <van-radio-group v-model="payType">
            <!-- 微信支付 -->
            <van-cell>
              <van-icon
                slot="title"
                name="wechat-pay"
                color="rgb(9, 187, 7)"
                size="30"
              />
              <van-radio slot="right-icon" name="wx" />
            </van-cell>

            <!-- 支付宝 -->
            <van-cell>
              <van-icon
                slot="title"
                name="alipay"
                color="rgb(18, 150, 219)"
                size="30"
              />
              <van-radio slot="right-icon" name="pay" />
            </van-cell>
          </van-radio-group>

          <!-- 支付按钮 -->
          <van-button type="danger" class="paying" @click="payMoneyBtn"
            >立即支付</van-button
          >
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
// 所有优惠券列表
const couponAllList = [
  {
    condition: "满5元可用",
    value: 15,
    name: "有女朋友者使用",
    startAt: new Date().getTime() - 1000,
    endAt: new Date().getTime() + 24 * 3600 * 3 * 1000,
    valueDesc: "0.15",
    unitDesc: "元",
  },
  {
    condition: "满5元可用",
    value: 1500,
    name: "气质男子使用",
    startAt: new Date().getTime() - 1000,
    endAt: new Date().getTime() + 24 * 3600 * 3 * 1000,
    valueDesc: "15",
    unitDesc: "元",
  },
  {
    condition: "无使用门槛",
    value: 100,
    name: "气质并且帅的男子使用",
    startAt: new Date().getTime(),
    endAt: new Date().getTime() + 24 * 3600 * 3 * 1000,
    valueDesc: "1",
    unitDesc: "折",
  },
  {
    condition: "无使用门槛",
    value: 100,
    name: "就是不给与你用的优惠券",
    startAt: new Date().getTime() - 24 * 3600 * 3 * 1000,
    endAt: new Date().getTime() - 10000,
    valueDesc: "100",
    unitDesc: "元",
  },
];

// 兑换可使用优惠券
const addAvailableCoupon = {
  condition: "满5元使用",
  value: 10000,
  name: "兑换的可用优惠券",
  startAt: new Date().getTime(),
  endAt: new Date().getTime() + 24 * 3600 * 3 * 1000,
  valueDesc: "100",
  unitDesc: "元",
};

// 兑换不可使用优惠券
const addDisabledCoupon = {
  condition: "满500元使用",
  value: 100,
  name: "兑换的不可用优惠券",
  startAt: new Date().getTime(),
  endAt: new Date().getTime() + 5000,
  valueDesc: "100",
  unitDesc: "元",
};

import { preOrderRequest } from "@/api";
import { orderRequest } from "@/api";
import { cartRequest } from "@/api";
import { toast } from "@/mixin";

export default {
  name: "PreOrderDetail",
  data() {
    return {
      // 动作面板
      show: false,

      // 提交订单
      loding: false,

      // 优惠券面板
      showList: false,

      // 支付方式
      payType: "wx",

      // 当前选中的优惠券的索引
      chosenCoupon: -1,

      // 所有优惠券
      couponAllList,

      // 预订单的商品列表
      preGoodsList: [],

      // 预订单里所有商品的总价格(不使用优惠券、不加运费)
      totalMoney: "",

      // 运费
      freight: 10,

      // 预订单号
      preOrderId: this.$route.params.preOrderId,

      // 送货地址信息
      shippingInfo: {
        name: this.$route.params.name
          ? this.$route.params.name
          : "请选择收货地址",
        phone: this.$route.params.tel ? this.$route.params.tel : "",
        address: this.$route.params.addressDetail
          ? this.$route.params.addressDetail
          : "",
      },

      // 订单号
      orderId: "",

      // 预订单里商品的 cartId 的数组
      orderCartIdList: [],

      // 由于提交订单前必须要有地址页面从路由传过来的地址信息，所以原页面跳转带过来判断是否
      // 是重复购买的参数或被删除，所以第一次跳转过来的判断是否是重复购买的参数要在之后的路由跳转都要带上
      isBuyAgain: this.$route.params
        ? this.$route.params.isBuyAgain
        : this.$route.quary.isBuyAgain,
    };
  },

  mixins: [toast],
  created() {
    this.getPreOrderList();
  },
  computed: {
    // 可使用的优惠券列表
    availableCoupons() {
      let currTime = new Date().getTime();
      let reg = /\d+/g;
      return this.couponAllList.filter(
        (coupon) =>
          (coupon.startAt < currTime &&
            coupon.endAt > currTime &&
            coupon.condition.match(reg) != null &&
            coupon.condition.match(reg)[0] < +this.totalMoney) ||
          (coupon.condition.match(reg) == null && coupon.unitDesc === "折")
      );
    },

    // 不可使用的优惠券列表
    disabledCoupons() {
      let currTime = new Date().getTime();
      let reg = /\d+/g;
      return this.couponAllList.filter(
        (coupon) =>
          coupon.startAt > currTime ||
          coupon.endAt < currTime ||
          (coupon.condition.match(reg) != null &&
            coupon.condition.match(reg)[0] > +this.totalMoney) ||
          (coupon.condition.match(reg) == null && coupon.unitDesc !== "折")
      );
    },

    // 使用优惠券的逻辑
    useCoupon() {
      // 打折后的总价
      let totalCouponPrice = this.totalMoney;

      // 获取到当前使用的优惠券
      let useCoupon = this.availableCoupons[this.chosenCoupon];
      if (!useCoupon) return totalCouponPrice;

      // 以何种方式进行优惠
      if (useCoupon.unitDesc == "折") {
        totalCouponPrice = (
          (useCoupon.valueDesc * this.totalMoney) /
          10
        ).toFixed(2);
        useCoupon.value = ((this.totalMoney - totalCouponPrice) * 100).toFixed(
          2
        );
      } else {
        totalCouponPrice = (this.totalMoney - useCoupon.valueDesc).toFixed(2);
      }

      // 返回商品优惠的价格
      return totalCouponPrice;
    },

    // 最终支付的总价(优惠后的价格 + 运费)
    costPay() {
      return ((this.freight + +this.useCoupon) * 100).toFixed(2);
    },
  },

  methods: {
    // 切换优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },

    // 优惠券的兑换码回调
    onExchange(code) {
      if (code.match(/^\d/)) {
        this.couponAllList.push(addAvailableCoupon);
      } else if (code.match(/^\D/)) {
        this.couponAllList.push(addDisabledCoupon);
      } else {
        this.$toast.fail("没有这条兑换码");
      }
    },

    // 提交订单按钮
    onSubmit() {
      if (this.shippingInfo.name == "请选择收货地址")
        return this.$toast.fail("小主，请先选择收货地址");

      let data = {
        // 送货地址信息
        addressInfo: this.shippingInfo,

        // 使用优惠后的价格
        allFee: this.costPay,

        // 优惠的价格
        discount: this.availableCoupons[this.chosenCoupon]
          ? this.availableCoupons[this.chosenCoupon].value
          : 0,

        // 预订单号
        preOrderId: this.preOrderId,
      };

      // 添加订单
      orderRequest
        .addOrder(data)
        .then((res) => {
          this.orderId = res.result.orderId;
          this.show = !this.show;
          this.createdOrderTime = res.result.createTime;
        })
        .catch((err) => this.$toast.fail("小主，订单提交失败了"));
    },

    // 获取预订单列表信息
    getPreOrderList() {
      // 获取商品信息
      preOrderRequest
        .preOrderList({ preOrderId: this.preOrderId })
        .then((res) => {
          this.preGoodsList = res.result.carts;
          this.totalMoney = res.result.totalMoney;
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 支付按钮
    payMoneyBtn() {
      // 正在加载弹窗
      this.showLoading();
      orderRequest
        .payOrder({ orderId: this.orderId, allFee: this.costPay })
        .then((res) => {
          // 跳转到支付页面
          this.$router.push({
            name: "pay",
            params: {
              qrCode: res.result.qrcode,
              orderId: this.orderId,
              allFee: this.costPay,
              createdOrderTime: this.createdOrderTime,
              payType: this.payType,
            },
          });

          // 如果是从订单页重新购买跳转过来的就不需要让购物车里的数量减去预订单里的商品数量
          if (this.isBuyAgain) return;

          // 删除掉购物车里的选中的商品
          this.orderCartIdList = this.preGoodsList.map((goods) => goods.cartId);
          cartRequest.delCartGoods({ cartId: this.orderCartIdList });

          // 更新 state 里总的商品数量
          let delGoodsListNum = 0;
          this.preGoodsList.forEach(
            (goods) => (delGoodsListNum += goods.buyNum)
          );

          // 更新购物车里商品数量
          this.$store.commit("updataGoodsListNum", -delGoodsListNum);
        })
        .catch((err) => this.$toast.fail("小主，支付失败了"));
    },

    // 选择接收快递的地址
    uesAddress() {
      this.$router.push({
        path: "/booking/address",
        query: {
          preOrderId: this.preOrderId,
          chosenAddressId: this.$route.params.chosenAddressId,
          isBuyAgain: this.isBuyAgain,
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
.address {
  padding: 0 16px;
  height: 70px;
}
.decorate {
  height: 3px;
  background: rgb(255, 255, 255) url("~assets/images/decorate-img.png") 0% 0% /
    100% no-repeat;
}
.van-cell__value--alone {
  line-height: 0;
}
.goods-list {
  .van-card {
    margin: 0;
    margin-bottom: 1px;
  }
}
.price-info {
  .van-cell__value {
    color: red;
  }
}
.content {
  padding: 16px;
  .paying {
    display: block;
    width: 90%;
    margin: 10px auto;
  }
}
.order-info-coupons {
  margin-bottom: 55px;
}
</style>