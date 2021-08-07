<template>
  <div class="booking-push-address-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="添加地址"
      left-arrow
      :border="true"
      @click-left="toAddressList"
    />

    <!-- 添加地址 -->
    <van-address-edit
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :area-list="areaList"
      @save="onSave"
    />
  </div>
</template>


<script>
import { areaList } from "@vant/area-data";
import { preOrderRequest } from "@/api";
export default {
  name: "pushAddress",
  data() {
    return {
      areaList,
    };
  },
  methods: {
    onSave(addressInfoObj) {
      preOrderRequest
        .pushAddressInfo(addressInfoObj)
        .then((res) => {
          if (res.code == 666) {
            this.$toast.success("地址添加成功");

            // 跳转回地址列表页
            this.$router.push({
              path: "/booking/address",
              query: {
                isBuyAgain: this.$route.query.isBuyAgain,
                preOrderId: this.$route.query.preOrderId,
              },
            });
          }
        })
        .catch((err) => this.$toast.fail(err));
    },

    // 跳转回地址列表页
    toAddressList() {
      this.$router.push({
        path: "/booking/address",
        quary: {
          isBuyAgain: this.$route.query.isBuyAgain,
          preOrderId: this.$route.query.preOrderId,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>