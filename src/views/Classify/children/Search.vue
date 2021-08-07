<template>
  <div class="search wp-100 bc-fff fixed">
    <div class="flex jc-sb ai-c">
      <a href="#" class="ml-10 mr-5">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <input
        type="text"
        class="wp-100"
        placeholder="请输入搜索关键字"
        @input="notifySearch"
        v-model="keyword"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      timer: null,
    };
  },
  methods: {
    notifySearch() {
      // 防抖
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("search", this.keyword);
      }, 1000);
    },
  },
};
</script>

<style lang='less' scoped>
// 顶部搜索框
.search {
  top: 0;
  height: 55px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  div {
    height: 100%;
    background-color: #f7f8fa;
    input {
      height: 100%;
      outline: none;
      border: 0;
      padding: 0;
      color: #222;
      font-size: 13px;
      background-color: transparent;
    }
    a {
      line-height: 35px;
      i {
        font-size: 15px;
      }
    }
  }
}
</style>