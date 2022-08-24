<template>
  <router-view name="textPage"></router-view>
  <div>
    <div class="solidLine"></div>
    <div class="siteNav">
      &lt;
      <div class="mainPage" @click="toMainPage()">返回首页&nbsp;</div>
      /
      <div class="news" @click="toNews()">公司新闻&nbsp;</div>
      /
      <div class="article" @click="toArticle()">技术文章</div>
    </div>
    <div class="bg" >
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
          <div class="title" @click="toTextPage()">{{ item.title }}</div>
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
  inject:['reload'],
  data() {
    return {
      news: false, //
      article: false, //
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
    if (this.$route.query.type === "公司新闻") {
      this.$data.news = true;
      this.getNews();
    } //
    else if (this.$route.query.type === "技术文章") {
      this.$data.article = true;
      this.getArticle();
    }
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
      this.reload();
      this.getNews();
    },
    toArticle() {
      this.$data.news = false;
      this.$data.article = true;
      this.reload();
      this.getArticle();
    },
    toTextPage() {
      this.$router.push({
        path: "",
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
  margin: 14px auto 0;
}
.siteNav div:hover {
  text-decoration: underline;
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
/* .chooseBtn  */
.bg {
  position: relative;
  width: 100%;
  height: 610px;
  margin: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
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
/* 分页器 */
.pagination {
  position: absolute;
  bottom: 43px;
  margin: 0 auto;
}
.pagination /deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
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
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
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
  min-width: 40px;
  border-radius: 5px;
}
.pagination /deep/ .el-icon {
  margin: 0 auto;
}
</style>