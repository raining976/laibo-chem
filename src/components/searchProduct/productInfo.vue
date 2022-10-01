<template>
  <div class="bg">
    <div class="solidLine1"></div>
    <div class="productInfo">
      <div class="productInfoBox">
        <div class="productPic"><img :src="productData.pic_url" alt="" /></div>
        <div class="info">
          <!-- 化学名 -->
          <div class="productName_zh">{{ productData.name }}</div>
          <div class="productName_en">{{ productData.enName }}</div>
          <!-- 浓度 -->
          <div class="concentration">{{ productData.guige }}</div>
          <div class="solidLine2"></div>
          <!-- 详细信息 -->
          <div class="details">
            <!-- 以下为 -->
            <div class="oneDetail">
              <div class="detailName">{{ $t("product.casNum") }}:&nbsp;</div>
              <div class="detailContent" :title="productData.cas">
                {{ productData.cas }}
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.wuhuaxingzhi") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.properties }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.fenzishi") }}:&nbsp;</div>
              <div
                class="detailContent"
                v-html="
                  productData.linear_formula.replace(/(\d+)/g, '<sub>$1</sub>')
                "
              ></div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.meltingPoint") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.melting }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.fenziliang") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.formula_weight }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.boilingPoint") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.boiling }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.einecsCode") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.EINECS }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.midu") }}:&nbsp;</div>
              <div class="detailContent">{{ productData.density }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.mdl") }}:&nbsp;</div>
              <div class="detailContent">{{ productData.mdl }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.storageCondition") }}:&nbsp;
              </div>
              <div class="detailContent">{{ productData.storage }}</div>
            </div>
          </div>
          <!-- 价格表格 -->
          <div class="prize">
            <table border="0" cellspacing="0">
              <thead>
                <tr class="tableHead">
                  <th style="width: 200px">{{ $t("product.itemNo") }}</th>
                  <th style="width: 170px">{{ $t("product.size") }}</th>
                  <!-- <th style="width: 215px">{{ $t("product.stock") }}</th> -->
                  <th style="width: 240px">{{ $t("product.price") }}</th>
                  <th style="width: 260px">{{ $t("product.count") }}</th>
                </tr>
              </thead>
              <el-scrollbar max-height="132px">
                <tbody>
                  <!--一行 -->
                  <tr
                    class="tableContent"
                    v-for="(item, index) in productData.params"
                    :key="index"
                  >
                    <td class="huohao">
                      <div>{{ productData.id + "-" + item.weight }}</div>
                    </td>
                    <td class="size">
                      <div>{{ productData.guige }}</div>
                    </td>

                    <!-- <td class="store">
                      <div>111{{ store }}</div>
                    </td> -->
                    <td class="rmb">
                      <div>{{ currency(item.price).format() }}</div>
                    </td>
                    <td class="count">
                      <!-- 计数器 -->
                      <div class="countBtnBox">
                        <el-input-number
                          v-model="item.count"
                          @change="handleChange"
                          @blur="numCheck(item)"
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
          </div>
        </div>
      </div>
      <div class="btn">
        <div class="addCart" @click="addCart()">{{ $t("product.add") }}</div>
        <div class="toBuy" @click="setOrder()">{{ $t("product.buy") }}</div>
      </div>

      <div class="toCustomize" @click="isShow = !isShow">
        {{ $t("product.personalTailor") }}>
      </div>
    </div>
    <private-order v-if="isShow" />
  </div>
</template>
<script>
import privateOrder from "../privateOrder/privateOrder.vue";
export default {
  name: "productInfo",
  components: {
    privateOrder,
  },
  data() {
    return {
      isShow: false, // 私人订制是否显示
      num: 0,
      infoBox: [],
      checkBox: [], // 用于储存传递商品的数组
      productData: [
        // {
        //   huohao: "B835581-25mg",
        //   size: "	95%,NMR",
        //   rmb: "220.00",
        //   store: "Los Angeles",
        //   num: 0,
        // },
        // {
        //   huohao: "B835581-100mg",
        //   size: "95%,NMR",
        //   rmb: "539",
        //   store: "Los Angeles",
        //   num: 0,
        // },
      ],
    };
  },
  created() {
    this.$http
      .get("/product/detail", {
        params: {
          id: this.$route.query.id,
        },
      })
      //回调函数
      .then((res) => {
        this.$data.productData = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
  watch: {
    productData: {
      handler() {
        this.$data.productData.params.forEach((item) => {
          Object.assign(item, { count: 0 });
        });
      },
    },
  },

  methods: {
    //ref数组
    info(el) {
      this.infoBox.push(el);
      //  console.log("ces",this.infoBox);
    },

    //
   async addCart() {
      if (!localStorage.getItem("token")) {
        this.$message({
          message: "请先登录",
          // type: "error",
        });
      } else {
        let isPost = false;
        // let length = this.$data.productData.params.length;

     for(let item of this.$data.productData.params) {
          if (item.count !== 0) {
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
                  isPost = true;
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
          } 
        }
        if (!isPost ) {
            this.$message({
              message: "未选择数量!",
              // type: "error",
            });
          }
      }
    },
    // 购买按钮
    setOrder() {
      if (!localStorage.getItem("token")) {
        this.$message({
          message: "请先登录",
          // type: "error",
        });
      } else {
        let isPost = false;
        let length = this.$data.productData.params.length;
        this.$data.productData.params.forEach((item, index) => {
          if (item.count !== 0) {
            this.$data.checkBox.splice(index, 0, {
              huohao: this.$data.productData.id + "-" + item.weight,
              count: item.count,
              product_id: this.$data.productData.id,
              product_params_id: item.id,
              pic_url: this.$data.productData.pic_url,
              guige: this.$data.productData.guige,
              cas: this.$data.productData.cas,
              name: this.$data.productData.name,
              price: item.price,
            });
            isPost = true;
          } else if ((index + 1) === length && isPost === false) {
            this.$message({
              message: "未选择数量!",
              // type: "error",
            });
          }
        });
        if (this.$data.checkBox.length !== 0) {
          localStorage.setItem("checkBox", JSON.stringify(this.$data.checkBox));
          this.$router.push({
            path: "/setOrder",
          });
        }
      }
    },

    //商品数量调节
    handleChange(value) {
      // console.log(value);
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
  },
};
</script>
<style scoped>
.bg {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.solidLine1 {
  width: 1410.05px;
  height: 1px;
  border-bottom: 1px solid #999999;
  margin: 0 auto;
}
.productInfo {
  width: 1410px;
  min-height: 749.95px;
  margin: 77px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.productInfoBox {
  width: 1410px;
  min-height: 556px;
  overflow: hidden;
  display: flex;
}
.productPic {
  width: 505px;
  /* min-height: 542.02px; */
  height: 98%;
  margin: 0 27.07px 0 0;
  border: 1px solid #999999;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.productPic > img {
  width: 504.96px;
  height: 542.02px;
  object-fit: contain;
}
.info {
  width: 874.94px;
  min-height: 542.02px;
  overflow: hidden;
}
.productName_zh {
  width: 100%;

  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 49.92px;
  margin: 0 0 12px 0;
}
.productName_en {
  width: 100%;

  font-size: 30px;
  line-height: 32px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.concentration {
  width: 100%;
  height: 24px;
  margin: 12.1px 0 0 5px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 24px;
}
.solidLine2 {
  width: 874.94px;
  height: 1px;
  margin: 24px 0 14px;
  border-bottom: 1px solid #999999;
}
.details {
  width: 100%;
  min-height: 190.08px;
  /* margin: 0 0 12px 0; */
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.oneDetail {
  width: 437px;
  min-height: 18px;
  margin: 10px 0;
  display: flex;
}
.detailName {
  min-width: 140px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  /* word-break: normal; */
}
.detailContent {
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* word-break: break-all; */
}

/* 以下是表格 */
.prize {
  width: 99.5%;
  height: 174px;
  border: 1px solid #999999;
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
  background-color: #eaebed;
}
.tableContent div {
  overflow: hidden;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
}
.tableContent {
  position: relative;
}
/* .shadow {
  display: none;
  position: absolute;
  pointer-events: auto;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #eaebed;
  opacity: 0.3;
  z-index: 999;
} */
.huohao {
  width: 200px;
  /* width: 145px; */
  color: #004ea2;
}
.size {
  width: 170px;
  /* width: 140px; */
  color: #171717;
}
.store {
  /* width: 215px; */
  color: #004ea2;
}
.rmb {
  width: 240px;
  /* width: 170px; */
  color: #ff4d4d;
}
/* 购买数量按钮 */
.count {
  /* width: 200px; */
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox >>> .el-input-number {
  width: 90%;
  height: 31.5px;
  line-height: 31.5px;
}
.countBtnBox >>> .el-input-number__decrease,
.count >>> .el-input-number__increase {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  background: #eaebed;
}
.count >>> [class*=" el-icon-"],
[class^="el-icon-"] {
  font-weight: 600;
}
.countBtnBox >>> .el-input-number__decrease {
  left: 0;
}
.countBtnBox >>> .el-input-number__increase {
  right: 0;
}
.countBtnBox >>> .el-input__inner {
  position: absolute;
  top: 1px;
  left: 31px;
  width: calc(100% - 62px);
  height: 29.5px;
  line-height: 29.5px;
  border: 2px solid #eaebed;
  padding: 0;
  /* background: #eaebed; */
}

/* ---- */
.btn {
  margin: 33.98px 0 0 0;
  display: flex;
}
.addCart,
.toBuy {
  cursor: pointer;
  width: 240px;
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  color: #004ea2;
  font-weight: 600;
  text-align: center;
  background: #e0f3fe;
  border-radius: 5px;
  transition: all 0.2s;
}
.addCart {
  margin: 0 16px 0 0;
}
.addCart:hover,
.toBuy:hover {
  color: #fff;
  background-color: #004ea2;
}
.toCustomize {
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  position: absolute;
  color: #004ea2;
  background-color: #e0f3fe;
  bottom: 38.02px;
  right: 0;
  font-size: 22px;
}
.toCustomize:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>