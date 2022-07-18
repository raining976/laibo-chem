<template>
  <div class="newsCenter">
    <div class="title"><span style="color: #004ea2">新闻</span>中心</div>
    <div class="newsBigBox">
      <!-- 下为v-for模块 -->
      <div class="newsBox" v-for="(item, index) in newsBox" :key="index">
        <div class="newsType">
          <div class="sign">
            <img src="../../assets/internet.png" alt="" />
          </div>
          <div class="type">{{ item.type }}</div>
        </div>

        <div class="dashedLine"></div>
        <!-- 图片（不知道要不要用轮播 -->
        <div class="newsPic"><img :src="item.pic" alt="" /></div>

        <!-- 下为-v-for模块 -->
        <div
          class="newsContent"
          v-for="(item1, index) in item.newsList"
          :key="index"
        >
          <!-- 内容 -->
          <div class="news">
            <div class="newsTitle">{{ item1.newsTitle }}</div>
            <div class="pubdate">{{ item1.pubdate }}</div>
          </div>
          <div class="dashedLine"></div>
        </div>
        <div class="newsMore" @click="toMoreNewsArticle()">查看更多&nbsp;></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsCenter",
  components: "",
  data() {
    return {
      newsBox: [
        {
          type: "公司新闻",
          pic: require("../../assets/p7.png"),
          newsList: [
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
          ],
        },
                {
          type: "公司新闻",
          pic: require("../../assets/p7.png"),
          newsList: [
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
            {
              newsTitle: "莱博斯威2022春节发货通知",
              pubdate: "01-20",
            },
          ],
        },
      ],
    };
  },
  methods:{
    toMoreNewsArticle() {
      this.$router.push({
        path: "/moreNewsArticle",
        // 传参
      });
    },
  }
};
</script>
<style scoped>
.newsCenter {
  width: 100%;
  height: 48.8vw;
  background: #e3f5ff;
  overflow: hidden;
}
.title {
  width: 100%;
  height: 3.13vw;
  font-size: 3.13vw;
  margin: 3.13vw 0 4.17vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #000;
  line-height: 3.13vw;
  text-align: center;
}
.newsBigBox {
  /* 固定一行两个 */
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
/* 单个新闻盒子的样式 */
.newsBox {
    position: relative;
  width: 30.21vw;
  height: 32.55vw;
  padding: 0 1.98vw;
  background: #ffffff;
  border-radius: 0.26vw;
  margin: 0 2.4vw;
  overflow: hidden;
}
/* 类别 ----问题width要不要改为100%*/
.newsType {
  width: 100%;
  height: 1.88vw;
  display: flex;
  align-items: center;
  margin: 1.88vw 0.78vw 0.94vw 0;
}
.sign {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.78vw 0 0;
}
.sign > img {
  width: 1.88vw;
  height: 1.88vw;
  object-fit: cover;
}
.type {
  /* width: 94px; */
  height: 1.25vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  line-height: 0.73vw;
}
.dashedLine {
  width: 30.21vw;
  height: 0.1vw;
   background-image: linear-gradient(to right, #e4e4e4 70%, rgba(255,255,255,0) 0%); /* 35%设置虚线点x轴上的长度 */
        background-position: bottom; /* top配置上边框位置的虚线 */
        background-size: 0.78vw 0.1vw; /* 第一个参数设置虚线点的间距；第二个参数设置虚线点y轴上的长度 */
        background-repeat: repeat-x;
}
.newsPic {
  width: 30.21vw;
  height: 13.23vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.41vw 0;
}
.newsPic > img {
  width: 30.21vw;
  height: 13.23vw;
  object-fit: cover;
}
.newsContent {
  width: 30.21vw;
  overflow: hidden;
}
.news {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30.21vw;
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
  line-height: 0.94vw;
  margin: 1.04vw 0 0.68vw;
}
.newsTitle {
    cursor: pointer;
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
  line-height: 0.94vw;
  transition: 0.8s;
}
.newsTitle:hover {
  color:blue;
}
.pubdate {
  /* width: 42px; */
  height: 0.83vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #323333;
  line-height: 0.83vw;
}
.newsMore {
    cursor: pointer;
  position: absolute;
  bottom: 1.25vw;
  right: 1.98vw;
  /* width: 75px; */
  height: 0.83vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 0.83vw;
  margin-left: auto;
  /* 让盒子要右靠 */
  /* transition: 1s; */
}
.newsMore:hover {
    font-weight: 600;
}
</style>