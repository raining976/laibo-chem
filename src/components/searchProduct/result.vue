<template>
  <div class="resultPage">
    <div class="tip"></div>
    <div class="resultBigBox">
      <!-- v-for模块 -->
      <div
        class="resultBox"
        v-for="(item, index) in _resultBox.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="index"
      >
        <div class="result">
          <div class="resultPic"><img :src="item.pic_url" alt="" /></div>
          <div class="resultInfo">
            <div class="resultName_zh" @click="toProductInfo(item.id)">
              <span>{{ item.name }}</span>
            </div>
            <div class="resultName_en">英文名：{{ item.enName }}</div>
            <div class="resultDetail" v-show="item.category != 0">
              <!-- v-for模块 -->
              <div class="fenziliang _data">
                {{ $t("order.fenziliang") + "："
                }}<span
                  v-html="
                    item.formula_weight != null ? item.formula_weight : '——'
                  "
                ></span>
              </div>
              <div class="jiegoushi _data">
                {{ $t("order.jiegoushi") + "："
                }}<span
                  v-html="
                    item.linear_formula != null
                      ? item.linear_formula.replace(/(\d+)/g, '<sub>$1</sub>')
                      : '——'
                  "
                ></span>
              </div>
              <div class="CAScode _data">
                {{ $t("order.casNum") + "："
                }}<span v-html="item.cas != null ? item.cas : '——'"></span>
              </div>
              <div class="MDLcode _data">
                MDL：<span v-html="item.mdl != null ? item.mdl : '——'"></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 价格表格 -->
        <div class="collapse">
          <!-- activeNames[index + (currentPage - 1) * pagesize].node -->
          <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :name="item.id">
              <template #title>
                <span class="textBox">{{ $t("search.storePrice") }}}&nbsp;</span
                ><img
                  src="../../assets/价格预测.png"
                  style="width: 1.04vw; height: 1.04vw"
                  alt=""
                />
              </template>
              <div class="prize">
                <table border="0" cellspacing="0">
                  <thead>
                    <tr class="tableHead">
                      <th style="width: 10.42vw">{{ $t("order.itemNo") }}</th>
                      <th style="width: 8.85vw">{{ $t("order.size") }}</th>
                      <!-- <th style="width: 215px">{{ $t("search.stock") }}</th> -->
                      <th style="width: 12.5vw">
                        {{ $t("search.price") }}（RMB）
                      </th>
                      <th style="width: 13.54vw">{{ $t("order.count") }}</th>
                    </tr>
                  </thead>
                  <el-scrollbar max-height="6.88vw">
                    <tbody>
                      <tr
                        class="tableContent"
                        v-for="(item1, index) in item.params"
                        :key="index"
                      >
                        <td class="fenziliang">
                          <div>{{ item.id + "-" + item1.weight }}</div>
                        </td>
                        <td class="size">
                          <div>{{ item.guige }}</div>
                        </td>
                        <!-- <td class="store">
                          <div>0{{ store }}</div>
                        </td> -->
                        <td class="rmb">
                          <div>{{ currency(item1.price).format() }}</div>
                        </td>
                        <td class="count">
                          <div class="countBtnBox">
                            <el-input-number
                              v-model="item1.count"
                              @change="handleChange"
                              @blur="numCheck(item1)"
                              :min="0"
                              @keydown="channelInputLimit"
                              oninput="this.value=this.value.replace(/\D/g,'')"
                            ></el-input-number>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </el-scrollbar>
                </table>
                <div class="addCart" @click="addCart(index)">
                  {{ $t("search.add")
                  }}<img src="../../assets/gouwuche.png" alt="" />
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        v-model="currentPage"
        background="#004ea2"
        layout="prev,pager,next"
        :total="_resultBox.length"
        :page-size="pagesize"
        :current-page="currentPage"
        @change="handleCurrentChange"
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
  props: {
    resultBox: {
      type: Array,
    },
    count: {
      type: Number,
    }
  },
  components: "",
  data() {
    return {
      activeNames: [], //可折叠列表参数，控制展开--循环增加元素也可行
      // 分页器
      pagesize: 4, // 每页显示多少条
      currentPage: 1, // 当前页码
      pastId: 0, // 记录产品id
      _resultBox: [], // 承载 props的数据
      productData: [],
      productDatas: {}, //字典 key为id 键为一个数组对象 productData
    };
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0);
  },
  watch: {
    resultBox: {
      handler() {
        this._resultBox = JSON.parse(JSON.stringify(this.resultBox));
        this.addCount();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addCount() {
      for (let item of this._resultBox)
        for (let item1 of item.params) {
          Object.assign(item1, { count: 0 });
        }
    },
    //
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: code,
        },
      });
    },
    // 加入购物车
    async addCart(index) {
      if (!localStorage.getItem("token")) {
        this.$root.openLogin();
      } else {
        let isPost = false;
        // let length = this.productData.length;
        for (let item of this._resultBox[index].params) {
          if (item.count !== 0) {
            await this.addCartReq(item);
            isPost = true;
          }
        }
        if (isPost === false) {
          // console.log(index + 1, length, isPost, "fffff");
          this.$message({
            message: this.$t("callback.selectNum"),
          });
        }
      }
    },
    async addCartReq(item) {
      await this.$http
        .post("/cart", {
          product_params_id: item.id,
          count: item.count,
        })
        //回调函数
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: this.$t("callback.addSuccess"),
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: this.$t("callback.error"),
            type: "error",
          });
          console.log("err", err);
        });
    },
    //商品数量调节
    handleChange(value) {
      // console.log(value);
    },
    // 分页
    handleSizeChange(val) {
      this.$data.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },

    channelInputLimit(e) {
      let key = e.key;
      // 不允许输入'e'和'.'
      if (key === "e" || key === ".") {
        e.returnValue = false;
        return false;
      }
      return true;
    },
    numCheck(obj) {
      if (obj.count === NaN || obj.count === undefined) obj.count = 0;
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
<style>
.resultPage .el-collapse-item__arrow {
  margin: 0 0.52vw;
}
.resultPage .el-collapse-item__header {
  justify-content: flex-end;
}
</style>
<style scoped>
/* 下面是搜索结果的样式 */
.resultPage {
  margin: 0 8.33vw 0 0;
  /* padding-top: 100px; */
}
.tip {
  width: 58.33vw;
  height: 1.04vw;
  font-size: 0.83vw;
  margin: 0.73vw 0 1.3vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 1.04vw;
}
.resultBigBox {
  width: 58.33vw;
  /* min-height: 1240px; */
  min-height: 31.25vw;
  overflow: hidden;
}
.resultBox {
  width: 100%;
  /* height: 390px; */
  margin: 0 0 0.78vw 0;
  background-color: #f7f7f7;
  /* overflow: hidden; */
}
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9.74vw;
  border-radius: 0.26vw;
  overflow: hidden;
  background-color: #f7f7f7;
}
.resultPic {
  width: 8.33vw;
  height: 8.33vw;
  margin: 0 3.33vw 0 0;
  background: #ffffff;
  border-radius: 0.26vw;
  overflow: hidden;
}
.resultPic > img {
  width: 8.33vw;
  height: 8.33vw;
  object-fit: contain;
}
.resultInfo {
  width: 44.79vw;
  height: 8.33vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.resultName_zh {
  width: 100%;
  height: 1.15vw;
  margin: 0 0 0.68vw 0;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #004ea2;
  line-height: 1.15vw;
  /* overflow: hidden; */
  cursor: pointer;
}
.resultName_zh > span:hover {
  border-bottom: 0.1vw solid #004ea2;
}
.resultName_zh > span {
  display: inline-block;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.resultName_en {
  width: 90%;
  height: 1.04vw;
  margin: 0 0 0.89vw 0;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 1.04vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.resultDetail {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
._data {
  width: 13.54vw;
  height: 0.78vw;
  margin: 0.42vw 0.21vw 0.42vw 0;
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.78vw;
}
.jiegoushi {
  width: 17.19vw;
}
/* 可折叠列表 */
.collapse {
  width: 97%;
  margin: 0 auto;
  /* height: 422px; */
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
}

.collapse >>> .el-collapse-item__header {
  text-indent: 2.34vw;
  font-size: 0.83vw;
  color: #004ea2;
  background-color: transparent;
  border-bottom: 0.05vw solid #eaeaec;
}
.collapse >>> .el-collapse-item__arrow,
.el-icon-arrow-right,
.is-active {
  text-indent: 0px;
  /* height: 1px;
*/
}
.collapse >>> .el-collapse-item__wrap {
  background-color: transparent;
}
.collapse >>> .el-collapse-item__content {
  position: relative;
}
/* 以下是表格 */
.prize {
  width: 76.5%;
  height: 9.06vw;
  margin: 0 0 0 1.04vw;
  /* border: 0.96px solid #999999; */
  border-radius: 0.26vw;
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
  height: 6.88vw;
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
  height: 2.19vw;
  font-size: 0.83vw;
  color: #333;
  background-color: transparent;
}
.tableContent div {
  overflow: hidden;
  height: 2.29vw;
  line-height: 2.29vw;
  font-size: 0.83vw;
  text-align: center;
}

.tableContent .fenziliang {
  width: 10.42vw;
  color: #004ea2;
}
.tableContent .size {
  width: 8.85vw;
  color: #171717;
}
.tableContent .store {
  /* width: 215px; */
  color: #004ea2;
}
.tableContent .rmb {
  width: 12.5vw;
  color: #ff4d4d;
}
/* 购买数量按钮 */
.tableContent .count {
  width: 13.54vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tableContent .countBtnBox {
  width: 8.33vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox >>> .el-input-number {
  width: 90%;
  height: 1.67vw;
  line-height: 1.67vw;
}
.count >>> [class*=" el-icon-"],
[class^="el-icon-"] {
  font-weight: 600;
}
.countBtnBox >>> .el-input-number__decrease,
.count >>> .el-input-number__increase {
  width: 1.56vw;
  height: 1.56vw;
  line-height: 1.56vw;
  border-radius: 0.1vw;
  background: #eaebed;
}
.countBtnBox >>> .el-input-number__decrease {
  left: 0;
}
.countBtnBox >>> .el-input-number__increase {
  right: 0;
}
.countBtnBox >>> .el-input__inner {
  position: absolute;
  top: 0.1vw;
  left: 1.61vw;
  width: calc(100% - 62px);
  height: 1.51vw;
  line-height: 1.51vw;
  border: 0.1vw solid #eaebed;
  padding: 0;
  /* background: #eaebed; */
}
.addCart {
  position: absolute;
  width: 6.88vw;
  height: 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004ea2;
  font-size: 0.73vw;
  background: #ffffff;
  border-radius: 0.26vw;
  bottom: 0.73vw;
  right: 1.88vw;
  cursor: pointer;
}
.addCart > img {
  margin: 0 0 0 0.42vw;
  width: 1.2vw;
  height: 1.04vw;
}
.addCart:hover {
  background-color: #daeefe;
}
/* 分页器 */
.pagination {
  /* position: absolute;
  bottom: 43px; */
  margin: 0 0 1.04vw 40%;
}
.pagination >>> .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-size: 0.83vw;
}
.pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.pagination >>> .el-pagination.is-background .btn-next,
.pagination >>> .el-pagination.is-background .btn-prev,
.pagination >>> .el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.pagination >>> .el-icon {
  margin: 0 auto;
}
</style>