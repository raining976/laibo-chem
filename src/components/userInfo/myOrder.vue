// 我的订单部分
//createDate:2022-07-17
<template>
  <div class="myOrder" :key="reload">
    <div class="top">
      <div class="title">
        {{ $t("userMenu.myOrder") + "( " + $t("cart.total") + " : " + count + ")" }}
      </div>
      <div class="deleteBtn">
        <el-tooltip effect="light" content="删除选中订单" placement="top">
          <i
            class="el-icon-delete"
            style="font-size: 1.3vw"
            @click="delProduct()"
          ></i>
        </el-tooltip>
      </div>
    </div>
    <!-- 以下为订单 -->
    <div class="orderList">
      <!-- 全选 -->

      <div class="listHead">
        <div class="quanxuan">
          <input
            class="checkAll"
            id="checkall"
            name="commodity"
            type="checkbox"
            v-model="checkall"
            @change="checkAll()"
          />
          <label class="word" for="checkAll">{{ $t("cart.allCheck") }} </label>
        </div>
        <!--  -->
        <!-- <div class="_shopId word">{{ $t("order.num") }}</div> -->
        <div class="_product word">{{ $t("order.product") }}</div>
        <div class="_type word">{{ $t("order.type") }}</div>
        <div class="_unit word">{{ $t("order.unit") }}</div>
        <div class="_orderStatus word">{{ $t("order.state") }}</div>
        <div class="_payment word">{{ $t("order.sum") }}</div>
      </div>
      <div class="allOrder">
        <!-- 以下v-for一个商品 -->
        <div
          class="order"
          v-for="(item0, index) in orderList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <div class="radio">
            <label>
              <input
                class="checkOne"
                name="commodity"
                type="checkbox"
                @change="checkOne(item0)"
                v-model="item0.checked"
              />
            </label>
            &nbsp;
            <div class="shopId">
              <!-- _shopId -->
              <div class="word">{{ $t("order.num") }}：{{ item0.id }}</div>
            </div>
          </div>
          <!--  -->
          <div class="product">
            <div
              class="productBox"
              v-for="(item1, index) in item0.product"
              :key="index"
            >
              <div class="productInfo" :title="item1.product.name">
                <div class="productPic">
                  <img :src="item1.product.pic_url" alt="" />
                </div>
                <div class="infoBox">
                  <div class="name_zh" @click="toProductInfo(item1.product.id)">
                    {{ item1.product.name }}
                  </div>
                  <div class="infoWord">
                    {{ $t("order.itemNo") + "：" }}{{ item1.huohao }}
                  </div>
                  <div class="infoWord">
                    {{ $t("order.casNum") + "：" }}{{ item1.product.cas }}
                  </div>
                </div>
              </div>

              <div class="productCount">X&nbsp;{{ item1.count }}</div>
            </div>
          </div>
          <div class="type">{{ item0.type }}</div>
          <div class="unit">{{ item0.team == null ? "——" : item0.team }}</div>
          <div class="orderStatus">{{ item0.status }}</div>
          <!-- 关于金额的计算方式 -->
          <div class="payment">
            <div>
              {{ currency(item0.payment).format() }}
            </div>
            <div style="color: #928f8f; font-weight: 400">
              （{{ $t("order.includingFreight") }}：{{
                currency(item0.post_fee).format()
              }}）
            </div>
          </div>
          <!--  折叠框 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ $t("order.more") }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  class="dropdown"
                  :disabled="(item0.status == '待付款' && item0.type == '个人') ? false : true"
                  @click="toPay(item0.id, item0)"
                  placement="bottom"
                  v-if="item0.type == '团队'? false : true"
                >
                  <div class="toOrderInfo">{{ $t("order.toPay") }}</div>
                </el-dropdown-item>
                <el-dropdown-item @click="toOrderInfo(item0.id)">
                  <div class="toOrderInfo">
                    {{ $t("order.checkDetail") }}
                  </div>
                </el-dropdown-item>
                <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          :hide-on-single-page="true"
          background="#004ea2"
          layout="prev,pager,next"
          :total="orderList.length"
          :page-size="pagesize"
          :pager-count="pagerCount"
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
  name: "myOrder",
  components: "",
  data() {
    return {
      pagesize: 3, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      reload: 0, // 更新页面
      //
      count: 0,
      checkall: false,
      checkedOrder: [], //复选框有关 存放选择商品
      orderList: [
        //   {
        //     name: ["hh","ww","ee"],
        //     status: "已签收",
        //     shopId: "22222222222222",
        //     type: "个人",
        //     unit: "个人",
        //     payment: 666,
        //   },
      ],
    };
  },
  async created() {
    await this.getOrders();
    this.addChecked();
    this.$data.count = this.$data.orderList.length;
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
  methods: {
    // 获取订单
    async getOrders() {
      await this.$http
        .get("/order", {
          params: {
            page: 1,
          },
        })
        //回调函数
        .then((res) => {
          if (!res.data.data) {
            this.$data.orderList = [];
          } else {
            this.$data.orderList = res.data.data.orders;
            // this.$data.count = res.data.data.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 远端修改，后重新获取
    async delProduct() {
      if (this.$data.checkedOrder.length === 0) {
        this.$message({
          message: this.$t("callback.selectTip"),
          // type: "success",
        });
      } else if (this.$data.checkedOrder.length !== 0) {
        this.$data.checkall = false;
        this.$data.checkedOrder = [];
        // this.delPost(this.orderList).then(() => {
        //   this.getOrders();
        // });
        await this.delPostReq(this.orderList);
        await this.getOrders();
        this.$data.reload++;
        // await this.getOrders();
        this.addChecked();
        this.$data.count = this.$data.orderList.length;
      }
    },
    async delPostReq(orderList) {
      for (let item of orderList) {
        if (item.checked === true) {
          await this.$http
            .get("/delOrder", {
              params: {
                order_no: item.id,
              },
            })
            //回调函数
            .then((res) => {
              if (res.data.code == 20000) {
                this.$message({
                  message: this.$t("callback.deleSuccess"),
                  type: "success",
                });
                // this.getOrders()
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
        }
      }
    },
    //复选框相关
    // 添加 checked属性
    addChecked() {
      this.$data.orderList.forEach((item) => {
        Object.assign(item, { checked: false });
      });
    },
    // 多选
    checkAll() {
      // 数组为空时无法点击
      if (this.$data.orderList.length === 0) {
        this.checkall = false;
      }
      // 实现全选
      if (this.$data.checkall === true) {
        this.$data.checkedOrder = this.$data.orderList;
        this.$data.orderList.forEach((item) => {
          item.checked = true;
        });
      }
      // 实现反选
      else if (this.$data.checkall === false) {
        this.$data.checkedOrder = [];
        this.$data.orderList.forEach((item) => {
          item.checked = false;
        });
      }
    },
    checkOne(item) {
      //选中时操作
      if (item.checked === true) {
        this.$data.checkedOrder.push(item);
      }
      //取消选中操作
      else if (item.checked === false) {
        this.$data.checkedOrder = this.$data.checkedOrder.filter((ele) => {
          return ele.id !== item.id;
        });
      }
      //取消全选状态
      if (this.$data.checkedOrder.length === this.$data.orderList.length) {
        this.$data.checkall = true;
      } else {
        this.$data.checkall = false;
      }
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
    toPay(id, obj) {
      localStorage.setItem("oneOrder", JSON.stringify(obj));
      localStorage.setItem("orderNo", id);
      this.$router.push({
        path: "/payment",
      });
    },
    toOrderInfo(id) {
      this.$router.push({
        path: "/orderInfo/" + id,
      });
    },
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: code,
        },
      });
    },
  },
};
</script>
<style scoped>
.myOrder {
  overflow: hidden;
}
.top {
  width: 100%;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.deleteBtn {
  margin: 0 2.5vw 0 0;
  cursor: pointer;
  overflow: hidden;
}
.deleteBtn:hover {
  color: #ff4747;
}

.title {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin-right: 2.6vw;
  margin-bottom: 1.56vw;
}
/* 下为购物车样式 */
.orderList {
  /* position: relative; */
  width: 100%;
  min-width: 49.48vw;
  min-height: 19.27vw;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 2.29vw;
  margin: 1.04vw 0 0;
  display: flex;
  align-items: center;
}
.quanxuan {
  /* width: 60px; */
  /* top: 5px;
  position: absolute; */
  display: flex;
  height: 100%;
  align-items: center;
  margin: 0 0px 0 1.04vw;
  flex: 0.8;
}
/* ！复选框 */
.checkAll {
  cursor: pointer;
  width: 0.94vw;
  height: 0.94vw;
  line-height: 0.94vw;
  margin: 0 0.31vw 0 0px;
  border: 0.05vw solid #999999;
  border-radius: 0.1vw;
}
.word {
  /* width: 65px; */
  /* height: 18px; */
  /* height: 100%; */
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.94vw;
  text-align: center;
}

/* ._shopId {
  width: 85px;
  flex: 1.2;
} */
._product {
  /* margin: 0 0 0 264px; */
  /* width: 84px; */
  flex: 2;
}
._type {
  margin: 0 0 0 8vw;
  /* width: 145px; */
  flex: 1;
}
._unit {
  /* margin: 0 0 0 109px; */
  /* width: 85px; */
  flex: 1;
}
._orderStatus {
  /* margin: 0 0 0 100px; */
  /* width: 85px; */
  flex: 1;
}
._payment {
  /* margin: 0 40px 0 0; */
  /* width: 85px; */
  flex: 1.3;
}
/* 内容 */
.allOrder {
  position: relative;
  width: 100%;
  min-height: 40.03vw;
  display: flex;
  flex-direction: column;
}
/* 一件商品 */
.order {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  min-width: 38.91vw;
  min-height: 11.3vw;
  padding: 1.82vw 0;
  margin: 0 0 1.04vw 0;
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
  font-size: 0.94vw;
}
.order > div {
  font-size: 0.94vw;
}
.checkOne {
  cursor: pointer;
  width: 0.94vw;
  height: 0.94vw;
  border: 0.05vw solid #999;
  border-radius: 0.1vw;
}
.radio {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0.52vw;
  /* left: 28px; */
  /* width: 18px; */
  height: 1.04vw;
  margin-left: 1.04vw;
  /* flex: 0.6; */
}
.shopId {
  /* width: 700px; */
  /* flex: 1.2; */
  /* margin: 0 27px 0 52px; */
  text-align: center;
  word-break: break-all;
  /* overflow: hidden; */
}
.product {
  flex: 3.5;
  /* width: 700px; */
  min-height: 8.59vw;
  margin-left: 2.34vw;
}
.productBox {
  display: flex;
  align-items: center;
}
.productInfo {
  display: flex;
  width: 88%;
  height: 8.59vw;
  align-items: center;
  margin: 0 0 0 0.54vw;
  font-size: 0.9375vw;
}
.productPic {
  width: 7.59vw;
  height: 7.59vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.7vw 0 0;
  background: #ffffff;
  border-radius: 0.26vw;
  overflow: hidden;
}
.productPic img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.infoBox {
  width: calc(100% - 9.31vw);
  height: 8.59vw;
  overflow: hidden;
}
.name_zh {
  cursor: pointer;
  min-height: 1.04vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 1.04vw;
  padding: 0 0 0.1vw 0;
  margin: 1.04vw 0 0.78vw;
}
.name_zh:hover {
  /* border-bottom: 2px solid #004EA2; */
  text-decoration: underline;
}
.infoWord {
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  margin: 0.42vw 0;
}
.productCount {
  color: #5b5959;
}
.type {
  flex: 1;
  /* width: 110px; */
  /* margin: 0 50px 0 0; */
  text-align: center;
}
.unit {
  flex: 1;
  /* width: 165px; */
  text-align: center;
  font-weight: 600;
}
.orderStatus {
  flex: 1;
  /* width: 165px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.52vw 0 0;
  color: #004ea2;
}

.payment {
  flex: 1.1;
  /* width: 150px; */
  text-align: center;
  font-weight: 600;
  margin-right: 1vw;
}
.myOrder >>> .el-dropdown {
  position: absolute;
  right: 1.25vw;
  bottom: 1.56vw;
}
.myOrder >>> .el-dropdown-link {
  cursor: pointer;
  font-size: 0.94vw;
  color: #004ea2;
}
/* .toOrderInfo {
  cursor: pointer;
  position: absolute;
  right: 24px;
  bottom: 30px;
  color: #004ea2;
} */
.toOrderInfo:hover {
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 1.04vw 0 0 36%;
  overflow: hidden;
}
.myOrder >>> .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-type: 0.83vw;
}
.myOrder >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #004ea2;
}
.myOrder >>> .el-pagination.is-background .btn-next,
.myOrder >>> .el-pagination.is-background .btn-prev,
.myOrder >>> .el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.myOrder >>> .el-icon {
  margin: 0 auto;
}

.myOrder >>> .dropdown span {
  font-size: 0.94vw;
}
</style>