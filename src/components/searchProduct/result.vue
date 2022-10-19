<template>
  <div class="resultPage">
    <div class="tip">查到以下几种结果：</div>
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
              <span>{{ item.name + item.guige }}</span>
            </div>
            <div class="resultName_en">英文名：{{ item.enName }}</div>
            <div class="resultDetail">
              <!-- v-for模块 -->

              <div class="fenziliang _data">
                {{ $t("order.fenziliang") + "：" }}<span v-html="item.formula_weight != null ?item.formula_weight
                :'——'"></span>
              </div>
              <div class="jiegoushi _data">
                {{ $t("order.jiegoushi") + "：" }}<span
                  v-html="
                    item.linear_formula != null ?item.linear_formula.replace(/(\d+)/g, '<sub>$1</sub>'):'——'"
                ></span>
              </div>
              <div class="CAScode _data">
                {{ $t("order.casNum") + "：" }}<span v-html="item.cas != null ?item.cas:'——'"></span>
              </div>
              <div class="MDLcode _data">MDL号：<span v-html="item.mdl != null ?item.mdl:'——'"></span></div>
            </div>
          </div>
        </div>
        <!-- 价格表格 -->
        <div class="collapse">
          <!-- activeNames[index + (currentPage - 1) * pagesize].node -->
          <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :name="item.id">
              <template #title>
                <span class="textBox">价格与库存&nbsp;</span
                ><img
                  src="../../assets/价格预测.png"
                  style="width: 20px; height: 20px"
                  alt=""
                />
              </template>
              <div class="prize">
                <table border="0" cellspacing="0">
                  <thead>
                    <tr class="tableHead">
                      <th style="width: 200px">{{ $t("order.itemNo") }}</th>
                      <th style="width: 170px">{{ $t("order.size") }}</th>
                      <!-- <th style="width: 215px">{{ $t("search.stock") }}</th> -->
                      <th style="width: 240px">
                        {{ $t("search.price") }}（RMB）
                      </th>
                      <th style="width: 260px">{{ $t("order.count") }}</th>
                    </tr>
                  </thead>
                  <el-scrollbar max-height="132px">
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
  },
  components: "",
  data() {
    return {
      activeNames: [], //可折叠列表参数，控制展开--循环增加元素也可行
      // 分页器
      pagesize: 4, // 每页显示多少条
      currentPage: 1, // 当前页数
      pastId: 0, // 记录产品id
      _resultBox: [
        // {
        //   pic: require("../../assets/p22.png"),
        //   name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
        //   name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
        //   fenziliang: "",
        //   jiegoushi: "",
        //   casCode: "",
        //   mdlCode: "",
        // },
      ], // 承载 props的数据
      productData: [
        // {
        //   fenziliang: "2016-05-03",
        //   size: "Tom",
        //   rmb: "California",
        //   store: "Los Angeles",
        //   num: 0,
        // },
        // {
        //   fenziliang: "2016-05-02",
        //   size: "Tom",
        //   rmb: "California",
        //   store: "Los Angeles",
        //   num: 0,
        // },
      ],
      productDatas:{} , //字典 key为id 键为一个数组对象 productData
    };
  },
  created() {
  },
  mounted() {
  //  console.log(this.resultBox,"ffff")
    window.scrollTo(0, 0);
  },
  watch: {
   resultBox: {
      handler() {
      this._resultBox = JSON.parse(JSON.stringify(this.resultBox));
      console.log(this._resultBox,";llll")
        this.addCount()
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addCount() {
      for(let item of this._resultBox)
        for(let item1 of item.params) {
           Object.assign(item1, { count: 0 });
        }   
        
        
    },
    collapseChange(val){
      // console.log('val',val)
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
        this.$message({
          message: "请先登录",
          // type: "error",
        });
      } else {
        let isPost = false;
        let length = this.$data.productData.length;
        for(let item of this.$data._resultBox[index].params) {
          if (item.count !== 0) {
           await this.addCartReq(item);
            isPost = true;
          }
        };
        if (isPost === false) {
            console.log(index + 1, length, isPost, "fffff");
            this.$message({
              message: "未选择数量!",
              // type: "error",
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
                    message: "添加成功",
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
                  message: "未知错误!",
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
  margin: 0 10px;
}
.resultPage .el-collapse-item__header {
  justify-content: flex-end;
}
</style>
<style scoped>
/* 下面是搜索结果的样式 */
.resultPage {
  margin: 0 160px 0 0;
  /* padding-top: 100px; */
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
  /* min-height: 1240px; */
  min-height: 600px;
  overflow: hidden;
}
.resultBox {
  width: 100%;
  /* height: 390px; */
  margin: 0 0 15px 0;
  background-color: #f7f7f7;
  /* overflow: hidden; */
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
.jiegoushi {
  width: 330px;
}
/* 可折叠列表 */
.collapse {
  width: 97%;
  margin: 0 auto;
  /* height: 422px; */
  background: #f7f7f7;
  border-radius: 10px;
  overflow: hidden;
}

.collapse >>> .el-collapse-item__header {
  text-indent: 45px;
  font-size: 16px;
  color: #004ea2;
  background-color: transparent;
  border-bottom: 1px solid #eaeaec;
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
  font-size: 16px;
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

.tableContent .fenziliang {
  width: 200px;
  color: #004ea2;
}
.tableContent .size {
  width: 170px;
  color: #171717;
}
.tableContent .store {
  /* width: 215px; */
  color: #004ea2;
}
.tableContent .rmb {
  width: 240px;
  color: #ff4d4d;
}
/* 购买数量按钮 */
.tableContent .count {
  width: 260px;
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
.countBtnBox >>> .el-input-number {
  width: 90%;
  height: 32px;
  line-height: 32px;
}
.count >>> [class*=" el-icon-"],
[class^="el-icon-"] {
  font-weight: 600;
}
.countBtnBox >>> .el-input-number__decrease,
.count >>> .el-input-number__increase {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
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
  top: 2px;
  left: 31px;
  width: calc(100% - 62px);
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
  bottom: 14px;
  right: 36px;
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
.pagination >>> .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
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
  min-width: 40px;
  border-radius: 5px;
}
.pagination >>> .el-icon {
  margin: 0 auto;
}
</style>