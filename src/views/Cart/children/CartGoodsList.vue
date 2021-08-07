<template>
  <div class="cart-goods-container">
    <ul v-if="cartListData.length != 0">
      <li
        class="bc-fff flex ai-c"
        v-for="goods in cartListData"
        :key="goods.cartId"
      >
        <i :class="{ checked: goods.isChecked }" @click="selectGoods(goods)" />
        <div
          @click="
            !isEdit ? $router.push(`/product/detail/${goods.productId}`) : ''
          "
          class="fg-1 flex jc-sa ml-15"
        >
          <img :src="goods.imgUrl" alt="" />
          <div class="cart-goods-info flex jc-sa fw-w ac-sb ml-20">
            <p>{{ goods.masterName }}</p>
            <div class="flex jc-sb wp-100">
              <span>￥ {{ (goods.price / 100).toFixed(1) }}</span>
              <div class="flex" v-if="isEdit">
                <span
                  @click="changeBuyNum(goods, -1)"
                  :class="{ desabled: goods.buyNum == 1 }"
                  >-</span
                >
                <span>{{ goods.buyNum }}</span>
                <span @click="changeBuyNum(goods, 1)">+</span>
              </div>
              <span v-else>X {{ goods.buyNum }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <i class="iconfont icon-gouwuche"></i>
      <p class="fc-999">去挑些喜欢的东西吧</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示减商品数量按钮
      isDesabled: "",

      // 节流函数的延迟时间
      firstTime: 0,
    };
  },
  props: {
    // 购物车里的商品列表
    cartListData: {
      type: Array,
    },

    // 控制添加商品数量的按钮
    isEdit: {
      type: Boolean,
    },
  },
  methods: {
    // 修改商品数量，并作节流
    changeBuyNum(goods, num) {
      let lastTime = new Date().getTime();
      if (lastTime - this.firstTime >= 1500) {
        goods.buyNum = goods.buyNum + num;
        if (goods.buyNum == 0) {
          goods.buyNum = 1;
        } else {
          //向父组件提交修改购物车商品数量请求
          this.$emit("updataGoodsNum", goods.cartId);
          this.$store.commit("updataGoodsListNum", num);
        }
        this.firstTime = lastTime;
      }
    },

    // 选中商品按钮
    selectGoods(goods) {
      goods.isChecked = !goods.isChecked;
      this.$emit("checkSelectAll");
    },
  },
};
</script>

<style lang='less' scoped>
.cart-goods-container {
  position: relative;
  height: calc(100vh - 95px);
  top: 45px;
  overflow-y: auto;
  ul {
    display: block;
    width: 100%;
    li {
      height: 130px;
      padding: 15px 15px 20px 15px;
      border-bottom: 1px solid #f5f6f8;
      box-sizing: border-box;
      i {
        height: 15px;
        min-width: 15px;
        border-radius: 50%;
        background: #fff url(~assets/images/duigou.svg) no-repeat;
        background-size: 100% 100%;
        border: 1px solid rgb(64, 64, 64);
        &.checked {
          background-color: #c03131;
          border-color: #fff;
        }
      }

      img {
        height: 95px;
        width: 95px;
        background-color: #f8f8f8;
      }
      .cart-goods-info {
        p {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        & > div > span:first-child {
          color: #d51e1f;
        }
        & > div {
          height: 30px;
          line-height: 30px;
          div {
            height: 30px;
            width: 90px;
            background-color: #f2f3f5;
            border-radius: 5px;
            span {
              display: block;
              width: 30px;
              height: 100%;
              text-align: center;
              line-height: 30px;
            }
            span:nth-of-type(2) {
              border-left: 2px solid #fff;
              border-right: 2px solid #fff;
            }
            span:not(span:nth-of-type(2)) {
              font-size: 25px;
            }
            .desabled {
              color: #bbb;
            }
          }
        }
      }
    }
  }

  & > div {
    text-align: center;
    margin-top: 150px;
    i {
      font-size: 100px;
      color: #d4d7d9;
    }
  }
}
</style>