// 订单详情部分
//createDate:2022-07-17
<template>
  <div class="orderInfoPage">
    <div class="top">
      <div class="title">{{$t('order.detail')}}</div>
      <div class="Btn">
      <div class="returnBtn" @click="toMyOrder()">{{$t('base.back')}}</div>
      <!-- <div class="deleteBtn" @click="func()">{{$t('base.dele') + $t('base.order')}}</div> -->
      </div>
      
    </div>
    <div class="orderInfo">
      <div class="detail"><strong>{{$t('order.num')+'：'}}</strong>{{orderId}}</div>
      <div class="detail"><strong>{{$t('order.logistic')+'：'}}</strong>{{}}</div>
      <div class="detail"><strong>{{$t('order.shipping')+'：'}}</strong>{{}}</div>
      <div class="detail"><strong>{{$t('order.receive')+'：'}}</strong>{{}}</div>
    </div>
    <!-- 可折叠列表 物流信息--><!-- 时间线 -->
    <!-- <div class="collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="已签收" name="1">
          <div class="process">
            
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                type="primary"
                :color="color"
                :size="size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <!-- 商品统计 -->
    <div class="shopCart">
      <div class="listHead">
        <div class="_productInfo word">{{$t('order.productInfo')}}</div>
        <div class="_size word">{{$t('order.size')}}</div>
        <div class="_price word">{{$t('order.price')}}</div>
        <div class="_count word">{{$t('order.count')}}</div>
        <div class="_payment word">{{$t('order.money')}}</div>
      </div>
      <div class="allCommodity">
        <!-- 以下v-for一个商品 -->
        <div
          class="commodity"
          v-for="(item0, index) in commodityList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <div class="productInfo">
            <div class="productPic">
              <img src="" alt="" />
            </div>
            <div class="infoBox">
              <div class="name_zh" @click="toProductInfo(item0.product.id)">
                {{ item0.product.name }}
              </div>
              <div class="infoWord">{{$t('order.itemNo')+'：'}}{{ item0.huohao }}</div>
              <div class="infoWord">{{$t('order.casNum')+'：'}}{{ item0.shopCart_id }}</div>
            </div>
          </div>
          <div class="size">{{ item0.product.guige }}</div>
          <div class="price">{{ currency(item0.price).format() }}</div>
          <div class="count">
            <div class="num">{{ item0.count }}</div>
          </div>
          <!-- 关于金额的计算方式  num * price -->
          <div class="payment">{{ currency(item0.price * item0.count).format() }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background="#004ea2"
          layout="prev,pager,next"
          :total="commodityList.length"
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
import { ref } from "vue";

export default {
  name: "orderInfo",
  data() {
    return {
      pagesize: 2, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      // 时间线
      orderId: "",
      color: "#004ea2",
      size: "large",
      activities: [
        {
          content: "jjjjjjjjjjjjjjj",
          timestamp: "3333333333333333.333",
        },
        {
          content: "jjjjjjjjjjjjjjj",
          timestamp: "3333333333333333.333",
        },
        {
          content: "jjjjjjjjjjjjjjj",
          timestamp: "3333333333333333.333",
        },
        {
          content: "jjjjjjjjjjjjjjj",
          timestamp: "3333333333333333.333",
        },
      ],
      commodityList: [
        // {
        //   name: "1",
        //   huohao: "2",
        //   shopCart_id: 3,
        //   guige: "95%",
        //   num: 2,
        //   price: 5,
        //   payment: 666,
        // },
        // {
        //   name: "1",
        //   huohao: "2",
        //   shopCart_id: 3,
        //   guige: "%",
        //   num: 2,
        //   price: 10,
        //   payment: 666,
        // },
      ],
    };
  },
  created() {
      this.getOrderInfo();
 },
 methods: {
     getOrderInfo() {
        this.$http
        .get("/order/detail", {
          params: {
             order_id: this.$route.params.id, // 暂定
          }
         
        })
        //回调函数
        .then((res) => {
           if(!res.data.data){
             this.$data.commodityList = [];
          }
          else {
          this.$data.orderId = this.$route.params.id;
          this.$data.commodityList = res.data.data.product_params_count;
          }     
        })
        .catch((err) => {
          console.log(err);
        });
     },
     toMyOrder() {
      this.$router.go(-1);
     },
     toProductInfo(code) {
      this.$router.push({
           path: "/productInfo",
           query: {
            id: code,
           }
      })
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
.top {
  width: 100%;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.Btn {
  font-size: 0.83vw;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.returnBtn {
  margin: 0 1.56vw 0 0;
  cursor: pointer;
  font-weight: 600;
}
.returnBtn:hover {
  color:#004ea2;
}
.deleteBtn {
  margin: 0 2.5vw 0 0;
  cursor: pointer;
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
.detail {
  margin: 0 0 1.15vw 0;
  height: 0.94vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  line-height: 0.94vw;
}
/* 可折叠列表 */
.collapse {
  width: 60%;
  /* height: 422px; */
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
}
.process {
  margin-top: 0.94vw;
  overflow: hidden;
}
.orderInfoPage /deep/ .el-collapse-item__header {
  text-indent: 2.34vw;
  font-size: 1.04vw;
  color: #004ea2;
  background-color: transparent;
  border-bottom: 0.05vw solid #eaeaec;
}
.orderInfoPage /deep/ .el-collapse-item__arrow,
.el-icon-arrow-right,
.is-active {
  text-indent: 0px;
  /* height: 1px;
*/
}
.orderInfoPage /deep/ .el-collapse-item__wrap {
  background-color: transparent;
}
/* 时间线 */
.process /deep/ .el-timeline {
  margin-left: 3.28vw;
}
/* 下为购物车样式 */
.shopCart {
  width: 100%;
  min-height: 19.27vw;
  overflow: hidden;
  margin-top: 2.19vw;
    border-top: 0.1vw solid #eaeaec; 
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 2.29vw;
  display: flex;
  align-items: center;
}

._productInfo {
  /* width: 565px; */
  text-align: center;
  flex: 4.5;
  /* margin: 0 0 0 262px; */
}
._size {
  /* width: 195px; */
  text-align: center;
  flex: 1;
}
._price {
  /* width: 165px; */
  text-align: center;
  flex: 1;
}
._count {
  /* width: 165px; */
  text-align: center;
  flex: 1;
}
._payment {
  /* width: 130px; */
  text-align: center;
  flex: 1;
}
/* 内容 */
.allcommodity {
  width: 100%;
  height: 23.7vw;
  display: flex;
  flex-direction: column;
}

.commodity {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 48.96vw;
  height: 10.78vw;
  margin: 0 0 1.04vw 0;
  background: #f7f7f7;
  border-radius: 0.52vw;
  overflow: hidden;
}
.word {
  /* width: 65px; */
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.94vw;
}
.productInfo {
  flex: 4.1;
  /* width: 700px; */
  height: 8.59vw;
  display: flex;
  align-items: center;
  margin: 0 1.41vw 0 3.54vw;
}
.productPic {
  width: 8.59vw;
  height: 8.59vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.72vw 0 0;
  background: #ffffff;
  border-radius: 0.26vw;
  overflow: hidden;
}
.productPic img {
  object-fit: contain;
}
.infoBox {
  height: 8.59vw;
}
.name_zh {
  cursor: pointer;
  height: 1.04vw;
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
.size {
  flex: 1;
  /* width: 110px; */
  text-align: center;
}
.price {
  flex: 1;
  /* width: 165px; */
  text-align: center;
  font-weight: 600;
}
.count {
  flex: 1;
  /* width: 165px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.52vw 0 0;
}

.num {
  width: 2.6vw;
  height: 1.46vw;
  line-height: 1.46vw;
  text-align: center;
  margin: 0 0.1vw;
}
.payment {
  flex: 1;
  /* width: 150px; */
  text-align: center;
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 1.04vw 0 0 36%;
  overflow: hidden;
}
.orderInfoPage /deep/ .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-type: 0.83vw;
}
.orderInfoPage
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.orderInfoPage /deep/.el-pagination.is-background .btn-next,
.orderInfoPage /deep/.el-pagination.is-background .btn-prev,
.orderInfoPage /deep/.el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.orderInfoPage /deep/ .el-icon {
  margin: 0 auto;
}
</style>