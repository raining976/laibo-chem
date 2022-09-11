// 我的订单部分
//createDate:2022-07-17
<template>
  <div class="myOrder">
    <div class="title">{{$t('base.order')}}</div>
    <div class="orderList">
      <div class="listHead">
        <div class="_shopId word">{{$t('order.num')}}</div>
        <div class="_product word">{{$t('order.product')}}</div>
        <div class="_type word">{{$t('order.type')}}</div>
        <div class="_unit word">{{$t('order.unit')}}</div>
        <div class="_orderStatus word">{{$t('order.state')}}</div>
        <div class="_payment word">{{$t('order.sum')}}</div>
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
          <div class="shopId">
            {{ item0.id }}
          </div>
          <div class="product">
            <div
              class="productName"
              title=""
            >
              {{ name }}1111&nbsp;
            </div>
          </div>
          <div class="type">{{ item0.type }}</div>
          <div class="unit">{{ item0.team }}</div>
          <div class="orderStatus">{{item0.status}}</div>
          <!-- 关于金额的计算方式 ？-->
          <div class="payment">{{ item0.payment }}</div>
          <div class="toOrderInfo" @click="toOrderInfo(item0.id)">{{$t('order.checkDetail')}}></div>
        </div>
      </div>
      <div class="pagination">
<el-pagination background="#004ea2" layout="prev,pager,next" :total="orderList.length" :page-size="pagesize" :pager-count="pagerCount" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="handleSizeChange">
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
      orderList: [
      //   {
      //     name: ["hh","ww","ee"],
      //     status: "已签收",
      //     shopId: "22222222222222",
      //     type: "个人",
      //     unit: "个人",
      //     payment: 666,
      //   },
      //  {
      //     name: ["hh","ww","ee"],
      //     status: "已签收",
      //     shopId: "22222222222222",
      //     type: "个人",
      //     unit: "个人",
      //     payment: 666,
      //   },
      //   {
      //     name: ["hh","ww","ee"],
      //     status: "已签收",
      //     shopId: "22222222222222",
      //     type: "个人",
      //     unit: "个人",
      //     payment: 666,
      //   },
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
  created() {
   this.getOrders();

  },
  methods: {
    // 获取订单
    getOrders() {
       this.$http
        .get("/order", {
          page: 1,
        })
        //回调函数
        .then((res) => {
          if(!res.data.data){
             this.$data.orderList = [];
          }
          // this.$data.count = res.data.data.count;
          else {
            this.$data.orderList = res.data.data.orders;
          console.log("ceshi", res.data.data);
          console.log("ceshi,shuzu ", this.$data.orderList); 
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
    toOrderInfo(id) {
      this.$router.push({
        path: "/orderInfo/" + id,
      })
    }
  },
};
</script>
<style scoped>
.myOrder {
  overflow: hidden;
}
.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
}
/* 下为购物车样式 */
.orderList {
  width: 100%;
  min-height: 370px;
  overflow: hidden;
}
/* 表头 --*/
.listHead {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
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
.toOrderInfo {
  cursor: pointer;
  position: absolute;
  right: 24px;
  bottom: 30px;
  color: #004ea2;
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
.myOrder /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
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