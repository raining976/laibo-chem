<template>
<router-view name="textPage"></router-view>
  <div class="solidLine"></div>
  <div class="siteNav">
    <div class="mainPage">&lt;返回首页&nbsp;</div>
    <div class="news">/公司新闻&nbsp;</div>
    <div class="article">/技术文章</div>
  </div>
  <div class="bg">
    <div class="allTitles">
      <!-- v-for -->
      <div class="titleBox" v-for="(item, index) in titleBox.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
        <div class="title" @click="toTextPage()">{{ item.title }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
    </div>
    <div class="pagination">
    <el-pagination background="#004ea2" layout="prev,pager,next" :total="titleBox.length" :page-size="pagesize" :pager-count="pagerCount" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange">
     </el-pagination>
    </div>
  </div>
</template> 
<script>
export default {
  name: "",
  components: "",
  data() {
    return {
        pagesize: 8, // 每页显示多少条
        currentPage: 1, // 当前页数
        pagerCount: 5,
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
          time: "[2022-01-21]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-20]",
        },
        {
          title: "莱博斯威2022春节发货通知莱博斯威2022春节发货通知",
          time: "[2022-01-21]",
        },

      ],
    };
  },
  methods: {
    // 跳转文章详情页（需传参）
     toTextPage() {
      this.$router.push({
        path: "",
      });
    },
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.currentPage = val
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
/deep/ .el-pagination {
   --el-pagination-button-height: 40px;
   --el-pagination-font-size: 16px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #004ea2;
} 
/deep/.el-pagination.is-background .btn-next, /deep/.el-pagination.is-background .btn-prev, /deep/.el-pagination.is-background .el-pager li  {
  min-width: 40px;
  border-radius: 5px;
}
/deep/ .el-icon {
  margin: 0 auto;
}
</style>