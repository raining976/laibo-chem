<template>
  <router-view v-if="isReloadData"></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},

  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
      return {
        isReloadData: true, //控制全局刷新
      }
  },
  methods: {
        // 全局刷新
    reload() {
      this.$data.isReloadData = false;
      this.$nextTick(() => {
        this.$data.isReloadData = true;
      });
    },
  },
  created() {
    let nowTime = new Date().getTime() / 1000;
    if (localStorage.getItem("refresh_exp") - nowTime < 60) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    }
    // 测试用,开始先清除token
    // localStorage.removeItem("token");
    // localStorage.removeItem("refresh")
  },
  unmounted() {
    window.localStorage.removeItem("lang");
    console.log("已移除");
  },
};
</script>

<style>
:root {
  /* 字体颜色 */
  --text--color: #666666;
  /* 主题色 */
  --color: #004ea2;
  /* 判定通过颜色 */
  --check-color: #1c6905;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
a {
  color: black;
  text-decoration-line: none;
}
li {
  list-style: none;
}
input,
textarea {
  resize: none;
}
</style>
