<template>
  <div class="bg">
    <!-- <div class="solidLine1"></div> -->
    <div class="productInfo">
      <div class="productInfoBox">
        <div class="productPic"><img :src="productData.pic_url" alt="" /></div>
        <div class="info">
          <!-- 化学名 -->
          <div class="productName_zh">{{ productData.name }}</div>
          <div class="productName_en">{{ productData.enName }}</div>
          <!-- 浓度 -->
          <div class="concentration">
            <span
              v-html="productData.guige != null ? productData.guige : '——'"
            ></span>
          </div>
          <div class="solidLine2"></div>
          <!-- 详细信息 -->
          <div class="details"  v-show="productData.category != 0">
            <!-- 以下为 -->
            <div class="oneDetail">
              <div class="detailName">{{ $t("product.casNum") }}:&nbsp;</div>
              <div class="detailContent" :title="productData.cas">
                <span
                  v-html="productData.cas != null ? productData.cas : '——'"
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.wuhuaxingzhi") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.properties != null
                      ? productData.properties
                      : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.fenzishi") }}:&nbsp;</div>
              <div
                class="detailContent"
                v-html="
                  productData.linear_formula != null
                    ? productData.linear_formula.replace(
                        /(\d+)/g,
                        '<sub>$1</sub>'
                      )
                    : '——'
                "
              ></div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.meltingPoint") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.melting != null ? productData.melting : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.fenziliang") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.formula_weight != null
                      ? productData.formula_weight
                      : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.boilingPoint") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.boiling != null ? productData.boiling : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.einecsCode") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.EINECS != null ? productData.EINECS : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.midu") }}:&nbsp;</div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.density != null ? productData.density : '——'
                  "
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">{{ $t("product.mdl") }}:&nbsp;</div>
              <div class="detailContent">
                <span
                  v-html="productData.mdl != null ? productData.mdl : '——'"
                ></span>
              </div>
            </div>

            <div class="oneDetail">
              <div class="detailName">
                {{ $t("product.storageCondition") }}:&nbsp;
              </div>
              <div class="detailContent">
                <span
                  v-html="
                    productData.storage != null ? productData.storage : '——'
                  "
                ></span>
              </div>
            </div>
          </div>
          <!-- 价格表格 -->
          <div class="prize">
            <table border="0" cellspacing="0">
              <thead>
                <tr class="tableHead">
                  <th style="width: 10.42vw">{{ $t("product.itemNo") }}</th>
                  <th style="width: 8.85vw">{{ $t("product.size") }}</th>
                  <!-- <th style="width: 215px">{{ $t("product.stock") }}</th> -->
                  <th style="width: 12.5vw">{{ $t("product.price") }}</th>
                  <th style="width: 13.54vw">{{ $t("product.count") }}</th>
                </tr>
              </thead>
              <el-scrollbar max-height="6.88vw">
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

      <div class="toCustomize" @click="openOrder()">
        {{ $t("nav.customization") }}>
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
    // 打开私人订单
    openOrder() {
      this.$root.isShowOrder = !this.$root.isShowOrder;
    },
    //ref数组
    info(el) {
      this.infoBox.push(el);
      //  console.log("ces",this.infoBox);
    },

    //
    async addCart() {
      if (!localStorage.getItem("token")) {
        this.$root.openLogin();
      } else {
        let isPost = false;
        // let length = this.$data.productData.params.length;

        for (let item of this.$data.productData.params) {
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
                    message: this.$t('callback.addSuccess'),
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
                  message: this.$t('callback.error'),
                  type: "error",
                });
                console.log("err", err);
              });
          }
        }
        if (!isPost) {
          this.$message({
            message: this.$t('callback.selectNum'),
            // type: "error",
          });
        }
      }
    },
    // 购买按钮
    setOrder() {
      if (!localStorage.getItem("token")) {
        this.$root.openLogin();
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
          } else if (index + 1 === length && isPost === false) {
            this.$message({
              message:  this.$t('callback.selectNum'),
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
  padding-top: 5.21vw;
}
.solidLine1 {
  width: 73.44vw;
  height: 0.05vw;
  border-bottom: 0.05vw solid #999999;
  margin: 0 auto;
}
.productInfo {
  width: 73.44vw;
  min-height: 39.06vw;
  margin: 4.01vw 0 1.04vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.productInfoBox {
  width: 73.44vw;
  min-height: 28.96vw;
  overflow: hidden;
  display: flex;
}
.productPic {
  width: 26.3vw;
  /* min-height: 542.02px; */
  height: 98%;
  margin: 0 1.41vw 0 0;
  border: 0.05vw solid #999999;
  border-radius: 0.26vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.productPic > img {
  width: 26.3vw;
  height: 28.23vw;
  object-fit: contain;
}
.info {
  width: 45.57vw;
  min-height: 28.23vw;
  overflow: hidden;
}
.productName_zh {
  width: 100%;

  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 2.6vw;
  margin: 0 0 0.63vw 0;
}
.productName_en {
  width: 100%;

  font-size: 1.56vw;
  line-height: 1.67vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.concentration {
  width: 100%;
  height: 1.25vw;
  margin: 0.63vw 0 0 0.26vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 1.25vw;
}
.solidLine2 {
  width: 45.57vw;
  height: 0.05vw;
  margin: 1.25vw 0 0.73vw;
  border-bottom: 0.05vw solid #999999;
}
.details {
  width: 100%;
  min-height: 9.9vw;
  /* margin: 0 0 12px 0; */
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.oneDetail {
  width: 22.76vw;
  min-height: 0.94vw;
  margin: 0.52vw 0;
  display: flex;
}
.detailName {
  min-width: 7.29vw;
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  /* word-break: normal; */
}
.detailContent {
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* word-break: break-all; */
}

/* 以下是表格 */
.prize {
  width: 99.5%;
  height: 9.06vw;
  border: 0.05vw solid #999999;
  border-radius: 0.26vw;
  overflow: hidden;
}
table {
  width: 100%;
  border-spacing: 0vw;
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
  color: #333;
  background-color: #eaebed;
  font-size: .8333vw;
}
.tableContent div {
  overflow: hidden;
  height: 2.29vw;
  line-height: 2.29vw;
  font-size: 0.83vw;
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
  width: 10.42vw;
  /* width: 145px; */
  color: #004ea2;
}
.size {
  width: 8.85vw;
  /* width: 140px; */
  color: #171717;
}
.store {
  /* width: 215px; */
  color: #004ea2;
}
.rmb {
  width: 12.5vw;
  /* width: 170px; */
  color: #ff4d4d;
}
/* 购买数量按钮 */
.count {
  /* width: 200px; */
  width: 13.54vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox {
  width: 8.33vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtnBox >>> .el-input-number {
  width: 90%;
  height: 1.64vw;
  line-height: 1.64vw;
}
.countBtnBox >>> .el-input-number__decrease,
.count >>> .el-input-number__increase {
  width: 1.56vw;
  height: 1.56vw;
  line-height: 1.56vw;
  border-radius: 0.1vw;
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
  top: 0.05vw;
  left: 1.61vw;
  width: calc(100% - 3.23vw);
  height: 1.54vw;
  line-height: 1.54vw;
  border: 0.1vw solid #eaebed;
  padding: 0;
  /* background: #eaebed; */
}

/* ---- */
.btn {
  margin: 1.77vw 0 0 0;
  display: flex;
}
.addCart,
.toBuy {
  cursor: pointer;
  width: 12.5vw;
  height: 3.33vw;
  line-height: 3.33vw;
  font-size: 1.25vw;
  color: #004ea2;
  font-weight: 600;
  text-align: center;
  background: #e0f3fe;
  border-radius: 0.26vw;
  transition: all 0.2s;
}
.addCart {
  margin: 0 0.83vw 0 0;
}
.addCart:hover,
.toBuy:hover {
  color: #fff;
  background-color: #004ea2;
}
.toCustomize {
  height: 1.25vw;
  line-height: 1.25vw;
  cursor: pointer;
  position: absolute;
  color: #004ea2;
  background-color: #e0f3fe;
  bottom: 1.98vw;
  right: 0;
  font-size: 1.15vw;
}
.toCustomize:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>