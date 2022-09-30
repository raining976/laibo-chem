// 我的订单部分
//createDate:2022-07-17
<template>
  <div class="myOrder" :key="reload">
    <div class="top">
      <div class="title">
        {{ $t("base.order") + "( " + $t("cart.total") + " : " + count + ")" }}
      </div>
      <div class="deleteBtn">
        <el-tooltip effect="light" content="删除选中商品" placement="top">
          <i class="el-icon-delete-solid" @click="delProduct()"></i>
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
        <div class="_shopId word">{{ $t("order.num") }}</div>
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
          </div>
          <!--  -->
          <div class="shopId">
            {{ item0.id }}
          </div>
          <div class="product">
            <div
              class="productName"
              v-for="(product, index) in item0.product"
              :key="index"
              :title="product.name"
            >
              {{ product.name }}&nbsp;
            </div>
          </div>
          <div class="type">{{ item0.type }}</div>
          <div class="unit">{{ item0.team == null ? "——" : item0.team }}</div>
          <div class="orderStatus">{{ item0.status }}</div>
          <!-- 关于金额的计算方式 ？-->
          <div class="payment">{{ currency(item0.payment).format() }}</div>
          <!--  折叠框 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              更多
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :disabled="item0.status == '待付款' ? false : true"
                  @click="toPay(item0.id, item0)"
                >
                  <div class="toOrderInfo">继续支付</div>
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
    await this.addChecked();
    this.$data.count = this.$data.orderList.length;
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
    delProduct() {
      if (this.$data.checkedOrder.length === 0) {
        this.$message({
          message: "未选择商品",
          // type: "success",
        });
      } else if (this.$data.checkedOrder.length !== 0) {
        this.$data.checkall = false;
        this.$data.checkedOrder = [];
        // this.delPost(this.orderList).then(() => {
        //   this.getOrders();
        // });
        this.delPost(this.orderList)
        //  this.getOrders()
        // this.$data.reload ++;
        // await this.getOrders();
        // await this.addChecked();
        // this.$data.count = this.$data.orderList.length;
      }
    },
     delPost(orderList) {
      orderList.forEach((item) => {
        if (item.checked === true) {
          this.$http
            .get("/delOrder", {
              params: {
                order_no: item.id,
              },
            })
            //回调函数
            .then((res) => {
              if (res.data.code == 20000) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });

                this.getOrders()
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
      });
      return 1
    },
    //复选框相关
    // 添加 checked属性
    async addChecked() {
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
  },
};
</script>
<style scoped>
.myOrder {
  overflow: hidden;
}
.top {
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.deleteBtn {
  margin: 0 48px 0 0;
  cursor: pointer;
  overflow: hidden;
}
.deleteBtn:hover {
  color: #ff4747;
}

.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin-right: 50px;
  margin-bottom: 30px;
}
/* 下为购物车样式 */
.orderList {
  /* position: relative; */
  width: 100%;
  min-width: 950px;
  min-height: 370px;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 44px;
  margin: 20px 0 0;
  display: flex;
  align-items: center;
}
.quanxuan {
  /* width: 60px; */
  /* top: 5px;
  position: absolute; */
  display: flex;
  align-items: center;
  margin: 0 0px 0 20px;
  flex: 0.6;
}
/* ！复选框 */
.checkAll {
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin: 0 6px 0 0px;
  border: 1px solid #999999;
  border-radius: 2px;
}
.word {
  /* width: 65px; */
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 18px;
  text-align: center;
}

._shopId {
  /* width: 85px; */
  flex: 1.2;
}
._product {
  /* margin: 0 0 0 264px; */
  /* width: 84px; */
  flex: 1.9;
}
._type {
  /* margin: 0 0 0 198px; */
  /* width: 145px; */
  flex: 1.9;
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
  /* margin: 0 0 0 102px; */
  /* width: 85px; */
  flex: 1;
}
/* 内容 */
.allOrder {
  position: relative;
  width: 100%;
  height: 711px;
  display: flex;
  flex-direction: column;
}

.order {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  min-width: 747px;
  height: 217px;
  margin: 0 0 20px 0;
  background: #f7f7f7;
  border-radius: 10px;
  overflow: hidden;
}
.checkOne {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 2px;
}
.radio {
  /* position: absolute;
  top: 20px;
  left: 28px; */
  /* width: 18px; */
  height: 18px;
  margin-left: 20px;
  flex: 0.6;
  /* border: 1px solid #999; */
  /* background-color: #fff; */
  /* border-radius: 2px; */
}
.shopId {
  /* width: 700px; */
  flex: 1.2;
  /* margin: 0 27px 0 52px; */
  text-align: center;
  word-break: break-all;
  /* overflow: hidden; */
}
.product {
  flex: 2;
  /* width: 700px; */
  height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-break: break-all;
}

.type {
  flex: 2;
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
  margin: 0 10px 0 0;
  color: #004ea2;
}

.payment {
  flex: 1;
  /* width: 150px; */
  text-align: center;
  font-weight: 600;
}
.myOrder >>> .el-dropdown {
  position: absolute;
  right: 24px;
  bottom: 30px;
}
.myOrder >>> .el-dropdown-link {
  cursor: pointer;

  color: #004ea2;
}
.toOrderInfo {
  /* cursor: pointer; */
  /* position: absolute;
  right: 24px;
  bottom: 30px;
  color: #004ea2; */
}
.toOrderInfo:hover {
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 20px 0 0 36%;
  overflow: hidden;
}
.myOrder /deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-type: 16px;
}
.myOrder
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.myOrder /deep/.el-pagination.is-background .btn-next,
.myOrder /deep/.el-pagination.is-background .btn-prev,
.myOrder /deep/.el-pagination.is-background .el-pager li {
  min-width: 40px;
  border-radius: 5px;
}
.myOrder /deep/ .el-icon {
  margin: 0 auto;
}
</style>