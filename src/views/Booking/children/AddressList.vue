<template>
  <div class="booking-address-container">
    <!-- 头部导航栏 -->
    <van-nav-bar title="地址列表" :border="true" />

    <!-- 地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="toPushAddress"
      @edit="toEditAddress"
      add-button-text="新增地址"
    >
    </van-address-list>
  </div>
</template>

<script>
import { preOrderRequest } from "@/api";
export default {
  name: "address-list",
  data() {
    return {
      chosenAddressId: this.$route.query.chosenAddressId
        ? +this.$route.query.chosenAddressId
        : -1,
      list: [],
      isBuyAgain:
        Object.keys(this.$route.params).length != 0
          ? this.$route.params.isBuyAgain
          : this.$route.query.isBuyAgain,
      preOrderId:
        Object.keys(this.$route.params).length != 0
          ? this.$route.params.preOrderId
          : this.$route.query.preOrderId,
    };
  },
  created() {
    this.getAddressListInfo();
  },

  watch: {
    chosenAddressId(newVal, oldVal) {
      // 只要切换了地址，就使用这个地址作为收货地址
      if (newVal != oldVal) {
        this.$router.push({
          name: "preOrderDatail",
          params: {
            ...this.list[newVal],
            ...this.$route.query,
            chosenAddressId: newVal,
            isBuyAgain: this.isBuyAgain,
          },
        });
      }
    },
  },
  methods: {
    // 获取地址列表信息
    getAddressListInfo() {
      let self = this;
      preOrderRequest
        .getAddressList()
        .then((res) => {
          // 给返回的每个子数据添加一个 id
          this.list = res.list.map((address, index) => {
            return { ...address, id: index };
          });

          // 如果后台没有数据就去添加新地址
          if (res.list.length == 0) {
            if (window.confirm("是否去添加一个新地址")) {
              this.$router.push({
                path: "/booking/pushAddress",
                query: {
                  isBuyAgain: this.isBuyAgain,
                },
              });
            } else {
              this.$toast.fail("可选地址为空，小主赶快去添加吧");
            }
          }
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 跳转到修改地址页面
    toEditAddress(address) {
      this.$router.push({
        name: "editAddress",
        params: {
          ...this.$route.query,
          ...address,
          isBuyAgain: this.isBuyAgain,
          preOrderId: this.preOrderId,
        },
      });
    },

    // 跳转到添加地址页面
    toPushAddress() {
      this.$router.push({
        path: "/booking/pushAddress",
        query: {
          isBuyAgain: this.isBuyAgain,
          preOrderId: this.preOrderId,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>