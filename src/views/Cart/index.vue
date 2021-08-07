<template>
  <div class="cart-container">
    <!-- 顶部导航栏 -->
    <div class="nav-top-bar wp-100 bc-fff flex jc-sb ai-c fixed">
      <div class="fs-14 flex ml-15 back" @click="$router.go(-1)">
        <i class="iconfont icon-zuojiantou mr-5"></i>
        <span>返回</span>
      </div>
      <span>购物车</span>
      <span class="fs-14 mr-15" @click="editing = !editing">{{
        editing ? "完成" : "编辑"
      }}</span>
    </div>

    <CartGoodsLIst
      :isEdit="editing"
      :cartListData="cartList"
      @checkSelectAll="checkSelectAll"
      @updataGoodsNum="updataGoodsNum"
    />

    <!-- 支付部分 -->
    <div class="payment wp-100 bc-fff fixed flex jc-sb ai-c">
      <div @click="selectAllHandle()">
        <span class="ml-15 mr-10" :class="{ checked: isCheckedAll }"></span>
        <span>全选</span>
      </div>
      <div class="fs-14">
        <span>合计:</span>
        <span>
          <span>￥</span>
          <span class="fs-18">{{ getPriceAll }}</span>
        </span>
        <span class="fc-fff ml-15 fs-16 btn" @click="delBtn" v-if="editing"
          >删除</span
        >
        <span class="fc-fff ml-15 fs-16 btn" @click="payBtn" v-else>结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import CartGoodsLIst from "./children/CartGoodsList";
import { cartRequest } from "@/api";
import { preOrderRequest } from "@/api";
export default {
  name: "cart",
  data() {
    return {
      editing: false,
      cartList: [],
      isCheckedAll: true,
    };
  },
  components: {
    CartGoodsLIst,
  },

  created() {
    // 检测到用户没有登录
    if (!this.$store.state.isLogin) {
      this.$router.push("/login");
    } else {
      this.getGoodsList();
    }

    // 第一次进入页面时，没有商品取消全选按钮
    if (this.$store.state.cart.goodsListNum <= 0) {
      this.isCheckedAll = false;
    }
  },

  computed: {
    // 计算商品总价格
    getPriceAll() {
      let priceAll = 0;
      this.cartList.forEach((goods) => {
        if (goods.isChecked) {
          priceAll += +((goods.buyNum * goods.price * 1) / 100).toFixed(1);
        }
      });
      return priceAll.toFixed(1);
    },
  },

  methods: {
    // 获取购物车列表
    getGoodsList() {
      cartRequest
        .getCartGoodsList()
        .then((res) => {
          let newList = res.list.map((val) => {
            return { ...val, isChecked: true };
          });
          this.$store.state.goodsList = this.cartList = newList;
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 每次选中一个商品,都去检测是否触发全选
    checkSelectAll() {
      // 只有当每个商品都选中才去触发全选按钮，否则全选按钮不选中
      this.isCheckedAll = this.cartList.every((goods) => goods.isChecked);
    },

    // 全选按钮
    selectAllHandle() {
      if (this.isCheckedAll) {
        this.cartList.map((val) => (val.isChecked = false));
      } else {
        this.cartList.forEach((val) => (val.isChecked = true));
      }
      this.isCheckedAll = !this.isCheckedAll;
    },

    // 修改商品数量的自定义函数
    updataGoodsNum(id) {
      let goods = this.cartList.filter((goods) => goods.cartId == id);
      cartRequest
        .changeCartGoods({
          cartId: goods[0].cartId,
          buyNum: goods[0].buyNum,
        })
        .then((res) => this.$toast.success("修改成功"))
        .catch((err) => this.$toast.fail(err));
    },

    // 结算按钮，跳转到预订单页面
    payBtn() {
      // 拿到选中商品的数组列表
      let selectGoodsIdList = this.cartList
        .filter((goods) => goods.isChecked)
        .map((selectGoods) => selectGoods.cartId);

      // 判断是否有提交商品
      if (selectGoodsIdList.length == 0)
        return this.$toast.fail("小主没有选中商品呢");

      // 发送提交预订单请求，并跳转到预订单页面
      preOrderRequest
        .addPreOrder({
          totalMoney: this.getPriceAll,
          cartId: selectGoodsIdList,
        })
        .then((res) =>
          this.$router.push({
            name: "preOrderDatail",
            params: {
              preOrderId: res.result.preOrderId,
            },
          })
        )
        .catch((err) => this.$toast.fail(err));
    },

    // 删除按钮
    delBtn() {
      // 拿到选中商品的数组列表
      let selectGoodsCartList = this.cartList.filter(
        (goods) => goods.isChecked
      );

      // 拿到选中的商品的cartId的数组
      let selectGoodsCartIds = selectGoodsCartList.map(
        (selectGoods) => selectGoods.cartId
      );

      // 拿到未选中的商品列表
      let notSelectGoodsList = this.cartList.filter(
        (goods) => !goods.isChecked
      );

      if (selectGoodsCartIds.length == 0)
        return this.$toast.fail("小主，请选中要删除的商品");

      // 发送删除商品的请求
      cartRequest
        .delCartGoods({ cartId: selectGoodsCartIds })
        .then((res) => {
          if (res.code == 666) {
            this.$toast.success("删除成功");

            // 拿到未选中的商品去渲染页面
            this.cartList = notSelectGoodsList;

            // 删除选中的商品后，更新 state 里总的商品数量
            let delGoodsListNum = 0;
            selectGoodsCartList.forEach(
              (goods) => (delGoodsListNum += goods.buyNum)
            );

            // 更新商品数量
            this.$store.commit("updataGoodsListNum", -delGoodsListNum);

            // 购物车里没有商品
            if (this.$store.state.cart.goodsListNum <= 0) {
              this.isCheckedAll = false;
              this.editing = false;
              this.$toast.fail("小主，没有东西了呢");
            }
          }
        })
        .catch((err) => this.$toast.fail(err));
    },
  },
};
</script>

<style lang='less' scoped>
// 顶部导航栏
.nav-top-bar {
  height: 45px;
  top: 0;
  border-bottom: 1px solid #f5f6f8;
  box-sizing: border-box;
  .back {
    color: #d51e1f;
    height: 100%;
    line-height: 45px;
    i {
      font-size: 18px;
      height: 15px;
      width: 15px;
    }
  }
  span:last-child {
    color: #d51e1f;
  }
}

// 支付部分
.payment {
  height: 50px;
  bottom: 0px;
  div:first-child {
    span:first-child {
      float: left;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: 1px solid #ebebeb;
      background: #fff url("~assets/images/duigou.svg") no-repeat;
      background-size: 100% 100%;
      &.checked {
        background-color: #c03131;
      }
    }
    span:last-child {
      color: #323233;
    }
  }
  div:last-child {
    height: 100%;
    line-height: 50px;
    span:nth-of-type(2) {
      color: #d51e1f;
    }
    & > span.btn {
      float: right;
      width: 110px;
      height: 100%;
      text-align: center;
      background-color: #d51e1f;
    }
  }
}
</style>