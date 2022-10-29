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
            <div class="moreBtn" @click="toMoreNewsArticle('公司新闻')">
              {{ $t("home.readMore") }} +
            </div>
          </div>
          <ul class="newsList articleList">
            <li
              v-for="(news, index) in newsList"
              :key="index"
              data-aos="flip-up"
            >
              <div class="timeBox">
                <div class="day">{{ news.day }}</div>
                <div class="yearMonth">{{ news.yearMonth }}</div>
              </div>
              <div class="articleInfo">
                <h4 class="articleTitle">
                  {{ news.title }}
                </h4>
                <p class="articleIntro">
                  {{ news.short_description }}
                </p>
                <span class="detailBtn">
                  <span @click="toContent(news.id, '公司新闻')">
                    {{ $t('home.learnMore') }}
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- /公司新闻 -->
        <!-- 技术文章 -->
        <div class="techArticleBox">
          <div class="topBox">
            <h3>技术文章</h3>
            <div class="moreBtn" @click="toMoreNewsArticle('技术文章')">
              {{ $t("home.readMore") }}+
            </div>
          </div>
          <ul class="newsList articleList">
            <li
              v-for="(article, index) in articleList"
              :key="index"
              data-aos="flip-up"
            >
              <div class="timeBox">
                <div class="day">{{ article.day }}</div>
                <div class="yearMonth">{{ article.yearMonth }}</div>
              </div>
              <div class="articleInfo">
                <h4 class="articleTitle">
                  {{ article.title }}
                </h4>
                <p class="articleIntro">
                  {{ article.short_description }}
                </p>
                <span class="detailBtn">
                  <span @click="toContent(article.id, '技术文章')"
                    >  {{ $t('home.learnMore') }}</span
                  >
                </span>
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
      newsList: [],
      articleList: [],
    };
  },
  mounted() {
    this.getNews();
    this.getArticle();
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
    getNews() {
      this.$http
        .get("/news", {
          params: {
            page: 1,
            limit: 3,
          },
        })
        .then((res) => {
          this.newsList = this.handleTime(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticle() {
      this.$http
        .get("/article", {
          params: {
            page: 1,
            limit: 3,
          },
        })
        //回调函数
        .then((res) => {
          this.articleList = this.handleTime(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTime(arr) {
      arr.forEach((ele) => {
        let time = ele.update.split("-");
        ele.day = time[2];
        ele.yearMonth = time[0] + "-" + time[1];
        if (ele.short_description)
          ele.short_description =
            ele.short_description
              .replace(
                /(\t|\r|\n|\s|\b|\f|\"|\u|&nbsp;|&nbsp|&nbs|&nb|&n|&)/gi,
                ""
              )
              .replace(/(\\)/gi, "") + "...";
      });
      return arr;
    },
    //   checkDetail(id, type) {
    //     this.$router.push({
    //       name: "content",
    //       params: {
    //         id: id,
    //         type: type,
    //       },
    //     });
    //   },
  },
};
</script>
<style scoped>
.newsCenter {
  position: relative;
  background-image: url("../../assets/xinwen.webp");
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
.articleList .articleInfo .detailBtn > span {
  font-size: 0.78vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #999999;
  cursor: pointer;
}
.articleList .articleInfo .detailBtn > span:hover {
  color: #323333;
  font-weight: 700;
}
</style>