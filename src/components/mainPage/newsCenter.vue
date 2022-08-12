<template>
  <div class="newsCenter">
    <div class="title"><span style="color: #004ea2">{{$t('home.news')}}</span>{{$t('home.center')}}</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 936.96px;
  background: #e3f5ff;
  overflow: hidden;
}
.title {
  width: 100%;
  height: 60.1px;
  font-size: 60.1px;
  margin: 60.1px 0 80.06px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #000;
  line-height: 60.1px;
  text-align: center;
}
.title > span{
  margin-right: 10px;
}
.newsBigBox {
  /* 固定一行两个 */
  width: 1920px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
/* 单个新闻盒子的样式 */
.newsBox {
    position: relative;
  width: 580.03px;
  height: 624.96px;
  padding: 0 38.02px;
  background: #ffffff;
  border-radius: 4.99px;
  margin: 0 46.08px;
  overflow: hidden;
}
/* 类别 ----问题width要不要改为100%*/
.newsType {
  width: 100%;
  height: 36.1px;
  display: flex;
  align-items: center;
  margin: 36.1px 14.98px 18.05px 0;
}
.sign {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 14.98px 0 0;
}
.sign > img {
  width: 36.1px;
  height: 36.1px;
  object-fit: cover;
}
.type {
  /* width: 94px; */
  height: 24px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  line-height: 14.02px;
}
.dashedLine {
  width: 580.03px;
  height: 1.92px;
   background-image: linear-gradient(to right, #e4e4e4 70%, rgba(255,255,255,0) 0%); /* 35%设置虚线点x轴上的长度 */
        background-position: bottom; /* top配置上边框位置的虚线 */
        background-size: 14.98px 1.92px; /* 第一个参数设置虚线点的间距；第二个参数设置虚线点y轴上的长度 */
        background-repeat: repeat-x;
}
.newsPic {
  width: 580.03px;
  height: 254.02px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 27.07px 0;
}
.newsPic > img {
  width: 580.03px;
  height: 254.02px;
  object-fit: cover;
}
.newsContent {
  width: 580.03px;
  overflow: hidden;
}
.news {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 580.03px;
  height: 18.05px;
  font-size: 18.05px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
  line-height: 18.05px;
  margin: 19.97px 0 13.06px;
}
.newsTitle {
    cursor: pointer;
  height: 18.05px;
  font-size: 18.05px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
  line-height: 18.05px;
  transition: 0.8s;
}
.newsTitle:hover {
  color:blue;
}
.pubdate {
  /* width: 42px; */
  height: 15.94px;
  font-size: 15.94px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #323333;
  line-height: 15.94px;
}
.newsMore {
    cursor: pointer;
  position: absolute;
  bottom: 24px;
  right: 38.02px;
  /* width: 75px; */
  height: 15.94px;
  font-size: 15.94px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 15.94px;
  margin-left: auto;
  /* 让盒子要右靠 */
  /* transition: 1s; */
}
.newsMore:hover {
    font-weight: 600;
}
</style>