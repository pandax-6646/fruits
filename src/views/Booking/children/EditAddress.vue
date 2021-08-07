<template>
  <div class="booking-push-address-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="修改地址"
      left-arrow
      :border="true"
      @click-left="toAddressList"
    />

    <!-- 添加地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="$route.params"
    />
  </div>
</template>

<script>
import { preOrderRequest } from "@/api";
import { areaList } from "@vant/area-data";
export default {
  name: "editAddress",
  data() {
    return {
      areaList,
    };
  },
  methods: {
    // 保存按钮
    onSave(addressInfoObj) {
      preOrderRequest
        .editAddressInfo({ addressId: this.$route.params.addressId })
        .then((res) => {
          if (res.code == 666) {
            this.$toast.success("小主，地址修改成功！");
            this.$router.push({
              path: "/booking/address",
              query: {
                isBuyAgain: this.$route.params.isBuyAgain,
                preOrderId: this.$route.params.preOrderId,
              },
            });
          }
        })
        .catch((err) => this.$toast.fail("地址修改失败"));
    },

    // 删除按钮
    onDelete() {
      preOrderRequest
        .delAddressInfo({ addressId: this.$route.params.addressId })
        .then((res) => {
          if (res.code == 666) {
            this.$toast.success("小主，地址删除成功！");
            this.$router.push({
              path: "/booking/address",
              query: {
                isBuyAgain: this.$route.params.isBuyAgain,
                preOrderId: this.$route.params.preOrderId,
              },
            });
          }
        })
        .catch((err) => this.$toast.fail("地址删除失败"));
    },

    // 跳转回地址列表页
    toAddressList() {
      this.$router.push({
        path: "/booking/address",
        quary: {
          isBuyAgain: this.$route.query.isBuyAgain,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>