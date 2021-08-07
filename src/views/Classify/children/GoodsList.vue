<template>
  <ul class="list-goods fg-1 flex jc-sa fw-w bc-fff fs-12">
    <router-link
      class="item"
      :to="`/product/detail/${item.productId}`"
      v-for="item in list"
      :key="item.productId"
    >
      <img :src="item.imgUrl" alt="" />
      <p>{{ item.masterName }}</p>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "GoodsList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang='less' scoped>
.list-goods {
  height: calc(100vh - 100px);
  overflow: auto;
  .item {
    width: 100px;
    margin-bottom: 5px;
    img {
      width: 100%;
    }
  }
}
</style>