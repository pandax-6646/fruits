<template>
  <div>
    <h3>子组件</h3>
    <div @click="handle">点我啊！！</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
    },
  },
  methods: {
    handle() {
      this.$emit("launchEvent", this.msg);
    },
  },
};
</script>

<style>
</style>