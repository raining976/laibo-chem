<template>
    <div class="solidLine"></div>
  <div class="siteNav">
    <div class="mainPage">&lt;返回首页&nbsp;</div>
    <div class="news">/公司新闻&nbsp;</div>
    <div class="article">/技术文章</div>
  </div>
</template>
<script>
export default {
   name: '',
   components: '',
   data () {
       return {

       }
   }
}
</script>
<style scoped>
.solidLine {
  width: 1410px;
  height: 0.96px;
  border-bottom: 0.96px solid #999999;
  margin: 0 auto;
}
.siteNav {
  display: flex;
  width: 1410px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  margin: 14px auto 0;
}
.mainPage,
.news,
.article {
  cursor: pointer;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}.solidLine {
  width: 1410px;
  height: 0.96px;
  border-bottom: 0.96px solid #999999;
  margin: 0 auto;
}
.siteNav {
  display: flex;
  width: 1410px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  margin: 14px auto 18px;
}
.mainPage,
.news,
.article {
  cursor: pointer;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
</style>