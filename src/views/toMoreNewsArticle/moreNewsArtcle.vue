<template>
  <router-view name="textPage"></router-view>
  <div >
    <!-- <div class="solidLine"></div> -->
    <div class="siteNav">
      <div class="mainPage" @click="toMainPage()">首页</div>
      &nbsp;&nbsp;&gt;&nbsp;&nbsp;
      <div class="news" :class="{isClick: news == true}" @click="toNews()">公司新闻</div>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <div class="article" :class="{isClick: article == true}" @click="toArticle()">技术文章</div>
    </div>
    <div class="bg" :key = "reload">
      <div class="allTitles">
        <!-- v-for -->
        <div
          class="titleBox"
          v-for="(item, index) in titleBox.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <div class="title" @click="toTextPage(item.id)">{{ item.title }}</div>
          <div class="time">{{ item.update }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background="#004ea2"
          layout="prev,pager,next"
          :total="titleBox.length"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
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
      news: false, //
      article: false, //
      type: "",
      reload: 0, //控制全局刷新
      pagesize: 8, // 每页显示多少条
      currentPage: 1, // 当前页数
      titleBox: [
        // {
        //   title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
        //   time: "[2022-01-21]",
        // },
      ],
    };
  },
  created() {
     this.$data.type = localStorage.getItem("type");
    if (this.$data.type === "公司新闻") {
      this.$data.news = true;
      this.getNews();
    } //
    else if (this.$data.type === "技术文章") {
      this.$data.article = true;
      this.getArticle();
    }
  },
  mounted() {
    // 
    window.scrollTo(0, 0);
  },
  methods: {

    // 跳转文章详情页（需传参）
    getNews() {
      this.$http
        .get("/news", {
          params: {
            page: 1,
            limit: 20,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.titleBox = res.data.data;
          console.log("ceshi", this.$data.titleBox);
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
            limit: 20,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.titleBox = res.data.data;
          console.log("ceshi", this.$data.titleBox);
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
    toNews() {
      this.$data.news = true;
      this.$data.article = false;
      this.$data.type = "公司新闻"
      this.getNews();
      this.$data.reload += 1;  //无用
      this.$data.currentPage = 1;
    },
    toArticle() {
      this.$data.news = false;
      this.$data.article = true;
      this.$data.type = "技术文章"
      this.getArticle();
      this.$data.reload += 1;  //无用
      this.$data.currentPage = 1;
    },
    toTextPage(code) {
      localStorage.setItem("type",this.$data.type);
      this.$router.push({
        path: "/content/" + code,
      });
    },
    // 分页
    handleSizeChange(val) {
      this.$data.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$data.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style scoped>
.solidLine {
  width: 80%;
  height: 0.05vw;
  border-bottom: 0.05vw solid #999999;
  margin: 0 auto;
}
.siteNav {
  display: flex;
  width: 73.44vw;
  height: 1.25vw;
  font-size: 1.15vw;
  line-height: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  /* margin: 14px auto 0; */
  margin: 0 auto;
  padding-top: calc(5.21vw + 0.73vw);
}
.siteNav div:hover {
  text-decoration: underline;
}
.mainPage,
.news,
.article {
  cursor: pointer;
  height: 1.25vw;
  font-size: 1.15vw;
  line-height: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
/* 标题选中效果 */
.isClick {
   font-weight: 600;
}
/* .chooseBtn  */
.bg {
  position: relative;
  width: 100%;
  min-height: 35.33vw;
  margin: 2.6vw 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.allTitles {
  width: 73.44vw;
  overflow: hidden;
}
.titleBox {
  display: flex;
  margin: 0.52vw 0 0.52vw 4.27vw;
}
.title {
  cursor: pointer;
  margin: 0 1.56vw 0 0;
  height: 1.15vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #474949;
  line-height: 1.15vw;
}
.title:hover {
  color: #004ea2;
}
.time {
  height: 1.04vw;
  font-size: 0.89vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #323333;
  line-height: 1.04vw;
}
/* 分页器 */
.pagination {
  position: absolute;
  bottom: 2.24vw;
  margin: 0 auto;
}
.pagination /deep/ .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-size: 0.83vw;
}
.pagination
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.pagination /deep/.el-pagination.is-background .btn-next,
.pagination /deep/.el-pagination.is-background .btn-prev,
.pagination /deep/.el-pagination.is-background .el-pager li {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-size: 0.83vw;
}
.pagination
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.pagination /deep/.el-pagination.is-background .btn-next,
.pagination /deep/.el-pagination.is-background .btn-prev,
.pagination /deep/.el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.pagination /deep/ .el-icon {
  margin: 0 auto;
}
</style>