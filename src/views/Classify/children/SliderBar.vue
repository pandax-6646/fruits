<template>
  <ul class="classify-sliderbar fs-14">
    <li
      @click="getCategoryId(index, item.categoryId)"
      v-for="(item, index) in categoryIdTitles"
      :key="item.categoryId"
      :class="{ active: currIndex == index }"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "SliderBar",
  data() {
    return {
      currIndex: 0,
    };
  },

  props: {
    categoryIdTitles: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getCategoryId(index, id) {
      // 按钮不可重复点击
      if (this.currIndex == index) return;
      this.currIndex = index;
      this.$emit("getCategoryGoodsList", id);
    },
  },
};
</script>

<style lang='less' scoped>
.classify-sliderbar {
  min-width: 125px;
  height: 300px;
  overflow-y: auto;
  background-color: #f4f4f4;
  color: #323233;
  li {
    height: 45px;
    width: 100%;
    line-height: 45px;
    border-left: 4px solid transparent;
    padding-left: 10px;
    background-color: #fafafa;
    box-sizing: border-box;
    &.active {
      border-left-color: #d51e1f;
      background-color: #fff;
    }
  }
}
</style>