<template>
  <div>
    {{ num }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
    };
  },
  created() {
    this.msg();
  },
  methods: {
    msg() {
      setInterval(() => {
        this.num++;
      }, 500);
    },
  },
};
</script>

<style>
</style>