<template>
  <div class="solidLine"></div>
  <div class="siteNav">
    <div class="mainPage">返回首页&nbsp;</div>
    <div class="news">/公司新闻&nbsp;</div>
    <div class="article">/技术文章</div>
  </div>
  <div class="bg">
    <div class="allTitles">
      <!-- v-for -->
      <div class="titleBox" v-for="(item, index) in titleBox" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: "",
  data() {
    return {
      titleBox: [
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
      ],
    };
  },
};
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
}
.bg {
  width: 100%;
  margin: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.allTitles {
  width: 1410px;
  overflow: hidden;
}
.titleBox {
  display: flex;
  margin: 10px 0 10px 82px;
}
.title {
  cursor: pointer;
  margin: 0 30px 0 0;
  height: 22px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #323333;
  line-height: 22px;
}
.title:hover {
  color: #004ea2;
}
.time {
  height: 20px;
  font-size: 17px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #323333;
  line-height: 20px;
}
</style>