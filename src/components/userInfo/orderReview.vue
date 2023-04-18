// 团队订单部分
//createDate:2022-07-17
<template>
  <div class="orderReview">
    <div class="title">
      {{ $t("base.order") + "( " + $t("cart.total") + " : " + count + ")" }}
    </div>
    <div class="orderList">
      <div class="listHead">
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
          <div class="orderHead">
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
          <div class="review" :class="{ showBtn: item0.status == '待审核' }">
            <div class="agree" @click="reviewOrder('1', item0.id)">
              <img src="../../assets/勾勾.png" alt="" title="同意" />
            </div>
            <div class="disagree" @click="reviewOrder('2', item0.id)">
              <img src="../../assets/叉.png" alt="" title="拒绝" />
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
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
  name: "orderReview",
  components: "",
  data() {
    return {
      pagesize: 3, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      noReview: -1,
      count: 0, //商品数
      orderList: [
        // {
        //   name: ["hh","ww","ee"],
        //   status: "已签收",
        //   shopId: "22222222222222",
        //   type: "个人",
        //   unit: "个人",
        //   payment: 666,
        // },
        //  {
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
  },
  methods: {
    // 获取订单
    async getOrders() {
      await this.$http
        .get("/teamOrder", {})
        //回调函数
        .then((res) => {
          if (!res.data.data) {
            this.$data.orderList = [];
          }
          // this.$data.count = res.data.data.count;
          else {
            this.$data.count = res.data.data.count;
            this.$data.orderList = res.data.data.orders;
          }
        })
        .catch((err) => {
          console.log(err);
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
    reviewOrder(isAgree, id) {
      this.$http
        .post("/auditOrder", {
          agree: isAgree,
          order_no: id,
        })
        //回调函数
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.orderReview {
  overflow: hidden;
}
.title {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 1.56vw;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
}
/* 下为购物车样式 */
.orderList {
  width: 100%;
  min-height: 19.27vw;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 2.29vw;
  display: flex;
  align-items: center;
}
.word {
  /* width: 65px; */
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.94vw;
  text-align: center;
}
._shopId {
  /* width: 85px; */
  flex: 1.2;
}
._product {
  /* margin: 0 0 0 264px; */
  /* width: 84px; */
  flex: 2;
}
._type {
  /* margin: 0 0 0 198px; */
  /* width: 145px; */
  flex: 2;
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
  height: 37.03vw;
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
  height: 11.3vw;
  padding: 1.82vw 0;
  margin: 0 0 1.04vw 0;
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
}
.orderHead {
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
.review {
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 2.6vw;
  bottom: 1.04vw;
  color: #004ea2;
  transition: all 0.6;
  display: none;
}
.agree img {
  width: 1.67vw;
  height: 1.15vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.disagree img {
  width: 1.15vw;
  height: 1.15vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.agree {
  margin: 0 1.04vw 0 0;
}
.agree img:hover {
  transform: scale(1.25);
}
.disagree img:hover {
  transform: scale(1.25);
}
.showBtn {
  display: block;
}
/* 分页器 */
.pagination {
  margin: 1.04vw 0 0 36%;
  overflow: hidden;
}
.orderReview /deep/ .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-type: 0.83vw;
}
.orderReview
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.orderReview /deep/.el-pagination.is-background .btn-next,
.orderReview /deep/.el-pagination.is-background .btn-prev,
.orderReview /deep/.el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.orderReview /deep/ .el-icon {
  margin: 0 auto;
}
</style>