<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>

:root {
  /* 字体颜色 */
  --text--color: #666666;
  /* 主题色 */
  --color:#004EA2; 
  /* 判定通过颜色 */
  --check-color:#1c6905;
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
textarea{
  resize: none;
}

</style>
