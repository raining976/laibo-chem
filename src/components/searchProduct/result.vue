<template>
  <div class="resultPage">
    <div class="tip">查到一下几种结果：</div>
    <div class="resultBigBox">
      <!-- v-for模块 -->
      <div
        class="resultBox"
        v-for="(item, index) in resultBigBox.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="index"
      >
        <div class="result">
          <div class="resultPic"><img :src="item.pic" alt="" /></div>
          <div class="resultInfo">
            <div class="resultName_zh" @click="toProductInfo()">
              <span>{{ item.name_zh }}</span>
            </div>
            <div class="resultName_en">英文名：{{ item.name_en }}</div>
            <div class="resultDetail">
              <!-- v-for模块 -->

              <div class="huohao _data">{{$t('order.itemNo')+"："}}{{ item.huohao }}</div>
              <div class="jiegoushi _data">结构式：{{ item.jiegoushi }}</div>
              <div class="CAScode _data">{{$t('order.casNum')+"："}}{{ item.casCode }}</div>
              <div class="MDLcode _data">MDL号：{{ item.mdlCode }}</div>
            </div>
          </div>
        </div>
        <div class="solidLine"></div>
        <!-- 价格表格 -->
        <div class="prize">
          <table border="0" cellspacing="0">
            <thead>
              <tr class="tableHead">
                <th style="width: 145px">{{$t('order.itemNo')}}</th>
                <th style="width: 140px">{{$t('order.size')}}</th>
                <th style="width: 215px">{{$t('search.stock')}}</th>
                <th style="width: 170px">{{$t('search.price')}}（RMB）</th>
                <th style="width: 200px">{{$t('order.count')}}</th>
              </tr>
            </thead>
            <el-scrollbar max-height="132px">
              <tbody>
                <tr
                  class="tableContent"
                  v-for="(item1, index) in productData"
                  :key="index"
                >
                  <td class="huohao">
                    <div>{{ item1.huohao }}</div>
                  </td>
                  <td class="size">
                    <div>{{ item1.size }}</div>
                  </td>

                  <td class="store">
                    <div>{{ item1.store }}</div>
                  </td>
                  <td class="rmb">
                    <div>{{ item1.rmb }}</div>
                  </td>
                  <td class="count">
                    <div class="countBtnBox">
                      <el-input-number
                        v-model="item1.num"
                        @change="handleChange"
                        :min="0"
                      ></el-input-number>
                    </div>
                  </td>
                </tr>
              </tbody>
            </el-scrollbar>
          </table>
        </div>
        <div class="addCart">
          {{$t('search.add')}}<img src="../../assets/gouwuche.png" alt="" />
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background="#004ea2"
        layout="prev,pager,next"
        :total="resultBigBox.length"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "result",
  components: "",
  data() {
    return {
      // 分页器
      pagesize: 3, // 每页显示多少条
      currentPage: 1, // 当前页数
      resultBigBox: [
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
      ],
      productData: [
        {
          huohao: "2016-05-03",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          num: 0,
        },
        {
          huohao: "2016-05-02",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          num: 0,
        },
        {
          huohao: "2016-05-04",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          num: 0,
        },
        {
          huohao: "2016-05-04",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          num: 0,
        },
      ],
    };
  },
  methods: {
    toProductInfo() {
      this.$router.push({
        path: "/productInfo",
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
/* 下面是搜索结果的样式 */
.resultPage {
  margin: 0 160px 0 0;
}
.tip {
  width: 1120px;
  height: 20px;
  font-size: 16px;
  margin: 14px 0 24.96px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.resultBigBox {
  width: 1120px;
  height: 1240px;
  overflow: hidden;
}
.resultBox {
  position: relative;
  width: 100%;
  height: 390px;
  margin: 0 0 15px 0;
  background-color: #f7f7f7;
  overflow: hidden;
}
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 187px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f7f7f7;
}
.solidLine {
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: #e1e1e1;
}
.resultPic {
  width: 160px;
  height: 160px;
  margin: 0 64px 0 0;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}
.resultPic > img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}
.resultInfo {
  width: 860px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.resultName_zh {
  /* width: 100%; */
  height: 21px;
  margin: 0 0 13px 0;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #004ea2;
  line-height: 21px;
  cursor: pointer;
}
.resultName_zh > span:hover {
  border-bottom: 2px solid #004ea2;
}
.resultName_en {
  /* width: 100%; */
  height: 20px;
  margin: 0 0 17px 0;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.resultDetail {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
._data {
  width: 260px;
  height: 15px;
  margin: 8px 4px 8px 0;
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 15px;
}
/* 以下是表格 */
.prize {
  width: 77.5%;
  height: 174px;
  margin: 0 0 0 20px;
  /* border: 0.96px solid #999999; */
  border-radius: 5px;
  overflow: hidden;
}
table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
}
table thead tr {
  display: block;
}
tbody {
  display: block;
  height: 132px;
  /* overflow-x: hidden;
  overflow-y: overlay;
  -webkit-overflow-y: overlay;
 -webkit-overflow-scrolling: touch; */
}
/* table thead tr,
table tbody tr {
  display: table;
  table-layout: fixed;
  width: 100%;
} */

.tableHead > th {
  height: 42px;
  color: #333;
  background-color: transparent;
}
.tableContent div {
  overflow: hidden;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
}

.tableContent .huohao {
  width: 145px;
  color: #004ea2;
}
.tableContent .size {
  width: 140px;
  color: #171717;
}
.tableContent .store {
  width: 215px;
  color: #004ea2;
}
.tableContent .rmb {
  width: 170px;
  color: #ff4d4d;
}
/* 购买数量按钮 */
.tableContent .count {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tableContent .countBtnBox {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox /deep/ .el-input-number {
  width: 97%;
  height: 30px;
  line-height: 30px;
}
.countBtnBox /deep/ .el-input-number__decrease,
.count /deep/.el-input-number__increase {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  background: #eaebed;
}
.countBtnBox /deep/ .el-input-number__decrease {
  left: 0;
}
.countBtnBox /deep/.el-input-number__increase {
  right: 0;
}
.countBtnBox /deep/ .el-input__inner {
  position: absolute;
  top: 2px;
  left: 30px;
  width: calc(100% - 60px);
  height: 29px;
  line-height: 29px;
  border: 2px solid #eaebed;
  padding: 0;
  /* background: #eaebed; */
}
.addCart {
  position: absolute;
  width: 132px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004ea2;
  font-size: 14px;
  background: #ffffff;
  border-radius: 5px;
  bottom: 20px;
  right: 54px;
  cursor: pointer;
}
.addCart > img {
  margin: 0 0 0 8.06px;
  width: 23px;
  height: 20px;
}
.addCart:hover {
  background-color: #daeefe;
}
/* 分页器 */
.pagination {
  /* position: absolute;
  bottom: 43px; */
  margin: 0 0 20px 40%;
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
  min-width: 40px;
  border-radius: 5px;
}
.pagination /deep/ .el-icon {
  margin: 0 auto;
}
</style>