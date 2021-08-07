<template>
  <div>
    <h3>父组件</h3>
    {{ msg }}
    <Son :msg="msg" @launchEvent="getMsg" />
    {{emitMsg}}
  </div>
</template>

<script>
import Son from "./Test-Son.vue";
export default {
  data() {
    return {
      msg: "lift is shit!!!",
      emitMsg: "",
    };
  },
  components: {
    Son,
  },
  methods: {
    getMsg(msg) {
      this.emitMsg = msg;
    },
  },
};
</script>

<style>
</style>