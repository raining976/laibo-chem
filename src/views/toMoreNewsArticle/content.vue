<template>
  <router-view name="textPage"></router-view>
  <!-- <div class="solidLine"></div> -->
  <div class="siteNav">
    <div class="mainPage" @click="toMainPage()">首页</div>
    &nbsp;&nbsp;&gt;&nbsp;&nbsp;
    <div class="type" @click="toType()">{{ typeName }}</div>
    &nbsp;&nbsp;&gt;&nbsp;&nbsp;
    <div class="navTitle">{{ contentBox.title }}</div>
  </div>
  <div class="allContent">
    <div class="title">{{ contentBox.title }}</div>
    <div class="update">{{ contentBox.update }}</div>
    <div class="content" v-html="contentBox.content"></div>
  </div>
</template>
<script>
export default {
  name: "content",
  components: "",
  data() {
    return {
      typeName: "",
      contentBox: {},
    };
  },
  created() {
    this.$data.typeName = localStorage.getItem("type");
    if (this.$data.typeName === "公司新闻") {
      // this.$data.news = true;
      this.getNewsContent();
    } //
    else if (this.$data.typeName === "技术文章") {
      // this.$data.article = true;
      this.getArticleContent();
    }
  },
  methods: {
    // 获取内容
    getNewsContent() {
      this.$http
        .get("/news/detail", {
          params: {
            id: this.$route.params.id,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.contentBox = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticleContent() {
      this.$http
        .get("/article/detail", {
          params: {
            id: this.$route.params.id,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.contentBox = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toMainPage() {
      this.$router.push({
        path: "/mainPage",
      });
    },
    // 返回上一级
    toType() {
       this.$router.push({
        path: "/moreNewsArticle",
        // 传参
      });
    },
  },
};
</script>
<style scoped>
/* .solidLine {
  width: 80%;
  height: 1px;
  border-bottom: 1px solid #999999;
  margin: 0 auto;
} */
.siteNav {
  display: flex;
  width: 80%;
  height: 1.25vw;
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  /* margin: 14px auto 0; */
  margin: 0 auto;
  padding-top: calc(5.21vw + 0.73vw);

}
.mainPage:hover,
.type:hover {
  text-decoration: underline;
}

.mainPage,
.type {
  cursor: pointer;
  height: 1.25vw;
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
.navTitle {
  color: #6b6f72;
}
/* 标题选中效果 */
.isClick {
  font-weight: 600;
}
/* 内容部分 */
.allContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73.44vw;
  margin: 2.6vw auto 0;
  overflow: hidden;
  min-height: 90vh;
}
.title {
  width: 100%;
  text-align: center;
  font-size: 1.88vw;
  font-weight: 600;
  margin: 0 0 1.04vw 0;
}
.update {
  width: 80%;
  font-size: 0.94vw;
  margin: 0 0 1.04vw 0;
  color: #999;
  border-bottom: 0.1vw solid #999999;
}
.content{
  width: 80%;
}
/* .content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  font-size: 0.94vw;
}
.content > p,
.content > span {
  text-align: center;
} */
</style>