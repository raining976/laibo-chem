<template>
  <div class="newsCenter">
    <div class="h">
      <div class="title">
        <span>新闻中心</span>
        <span class="line"></span>
        <span>NEWS</span>
      </div>
      <div class="contentBox">
        <!-- 公司新闻 -->
        <div class="newsBox">
          <div class="topBox">
            <h3>公司新闻</h3>
            <div class="moreBtn">更多新闻 +</div>
          </div>
          <ul class="newsList articleList">
            <li v-for="(news, index) in newsList" :key="index" data-aos="flip-up">
              <div class="timeBox">
                <div class="day">{{ news.day }}</div>
                <div class="yearMonth">{{ news.yearMonth }}</div>
              </div>
              <div class="articleInfo">
                <h4 class="articleTitle">
                  {{ news.title }}
                </h4>
                <p class="articleIntro">
                  {{ news.intro }}
                </p>
                <span class="detailBtn"> 查看详情 </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- /公司新闻 -->
        <!-- 技术文章 -->
        <div class="techArticleBox">
          <div class="topBox">
            <h3>技术文章</h3>
            <div class="moreBtn">更多新闻</div>
          </div>
          <ul class="newsList articleList">
            <li v-for="(news, index) in newsList" :key="index">
              <div class="timeBox">
                <div class="day">{{ news.day }}</div>
                <div class="yearMonth">{{ news.yearMonth }}</div>
              </div>
              <div class="articleInfo">
                <h4 class="articleTitle">
                  {{ news.title }}
                </h4>
                <p class="articleIntro">
                  {{ news.intro }}
                </p>
                <span class="detailBtn"> 查看详情 </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- /技术文章 -->
      </div>
    </div>
  </div>
</template>

<script >

export default {
  name: "newsCenter",
  components: "",
  data() {
    return {
      newsList: [
        {
          title: "莱博斯威2022春节发货通知",
          yearMonth: "2022-10",
          day: "10",
          intro:
            "一些内容一些内容一些内容一些内容一些内容一些内容一些一些内容一些内容一些内容一些内容一些内些内容一些内容一些内些内容一些内容一些内容一些内...",
        },
        {
          title: "莱博斯威2022春节发货通知",
          yearMonth: "2022-10",
          day: "10",
          intro:
            "一些内容一些内容一些内容一些内容一些内容一些内容一些一些内容一些内容一些内容一些内容一些内些内容一些内容一些内些内容一些内容一些内容一些内...",
        },
        {
          title: "莱博斯威2022春节发货通知",
          yearMonth: "2022-10",
          day: "10",
          intro:
            "一些内容一些内容一些内容一些内容一些内容一些内容一些一些内容一些内容一些内容一些内容一些内些内容一些内容一些内些内容一些内容一些内容一些内...",
        },
      ],
    };
  },
  created() {
    // this.$http
    //   .get("/news", {
    //     params: {
    //       page: 1,
    //       limit: 3,
    //     },
    //   })
    //   //回调函数
    //   .then((res) => {
    //     this.$data.newsBox[0].newsList = res.data.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // //
    // this.$http
    //   .get("/article", {
    //     params: {
    //       page: 1,
    //       limit: 3,
    //     },
    //   })
    //   //回调函数
    //   .then((res) => {
    //     this.$data.newsBox[1].newsList = res.data.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {
    // 去往新闻详情页
    toContent(code, name) {
      localStorage.setItem("type", name);
      this.$router.push({
        path: "/content/" + code,
      });
    },
    toMoreNewsArticle(name) {
      if (name === "company news") {
        name = "公司新闻";
      } else if (name === "technical article") {
        name = "技术文章";
      }
      localStorage.setItem("type", name);
      this.$router.push({
        path: "/moreNewsArticle",
        // 传参
      });
    },
  },
};
</script>
<style scoped>
.newsCenter {
  position: relative;
  background-image: url("../../assets/xinwen.png");
  background-size: cover;
}
.newsCenter::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.h {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 53.65vw;
}

.title {
  width: 100%;
  height: 3.13vw;
  font-size: 3.13vw;
  margin: 4.17vw 0 4.69vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #fff;
  line-height: 3.13vw;
  text-align: center;
}
.title > .line {
  display: inline-block;
  width: 0.52vw;
  height: 51px;
  background: #fff;
  margin: 0 1.56vw;
}
.contentBox {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 14.79vw);
  color: #fff;
}
.contentBox > div {
  width: 34.48vw;
  height: 35.52vw;
}
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.13vw;
}
.topBox h3 {
  font-size: 1.88vw;
  font-family: Microsoft YaHei UI;
  font-weight: 500;
  color: #ffffff;
}
.topBox .moreBtn {
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
}
.topBox .moreBtn:hover {
  font-weight: 700;
}
.articleList {
  display: flex;
  flex-direction: column;
}
.articleList li {
  display: flex;
  width: 34.48vw;
  justify-content: center;
  height: 9.58vw;
  background: #ffffff;
  border-radius: 0.26vw;
  margin: 0.36vw 0;
}
.articleList li .timeBox {
  height: 3.65vw;
  color: #2b6fb4;
  margin-top: 1.04vw;
  border-right: 0.1vw solid #999999;
  padding-right: 1.41vw;
}
.articleList .timeBox .day {
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
.articleList .timeBox .yearMonth {
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #2b6fb4;
}
.articleList .articleInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 19.53vw;
  padding: 1.98vw 0;
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  margin-left: 1.41vw;
}
.articleList .articleInfo h4 {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
}
.articleList .articleInfo p {
  text-overflow: ellipsis;
  white-space: wrap;
  overflow: hidden;
  height: 2vw;
}
.articleList .articleInfo .detailBtn {
  font-size: 0.78vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #999999;
  cursor: pointer;
}
.articleList .articleInfo .detailBtn:hover {
  color: #323333;
  font-weight: 700;
}
</style>