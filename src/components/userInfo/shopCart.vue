// 购物车
//createDate:2022-07-17
<template>
  <div>
    <div class="top">
      <div class="title">购物车（共{{ allProducts }}件）</div>
      <div class="deleteBtn" @click="delProduct()">删除</div>
    </div>
    <!-- 以下是购物车信息 -->
    <div class="shopCart">
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
            <label class="word" for="checkAll">全选
          </label>
          <!-- <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选
          </el-checkbox> -->
        </div>
        <div class="_productInfo word">产品信息</div>
        <div class="_size word">规格</div>
        <div class="_price word">单价</div>
        <div class="_count word">数量</div>
        <div class="_payment word">金额</div>
      </div>
      <div class="allCommodity">
        <!-- 以下v-for一个商品 -->

        <!-- <el-checkbox-group
          v-model="checkedCommodities"
          @change="handleCheckedCommoditiesChange"
        > -->
        <div
          v-for="(item0, index) in commodityList.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
          :laber="item0"
        >
          <div class="commodity" :ref="setCommodityBox">
            <!-- 复选框 -->
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
            <div class="productInfo">
              <div class="productPic">
                <img src="" alt="" />
              </div>
              <div class="infoBox">
                <div class="name_zh" @click="toProductInfo()">
                  {{ item0.name }}
                </div>
                <div class="infoWord">货号：{{ item0.huohao }}</div>
                <div class="infoWord">CAS编号：{{ item0.shopCart_id }}</div>
              </div>
            </div>
            <div class="size">{{ item0.guige }}</div>
            <div class="price">{{ item0.price }}</div>
            <div class="count">
              <el-input-number v-model="item0.num" @change="handleChange" :min="0"  ></el-input-number>
            </div>
            <!-- 关于金额的计算方式 -->
            <div class="payment">{{ item0.price* item0.num }}</div>
          </div>
        </div>
        <!-- </el-checkbox-group> -->
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
    <!-- 底部购买 -->
    <div class="footer">
      <div class="submitMy" @click="submitMy()">
        <div
          class="submitMyBtn"
          :class="{ agree_submitMy: isSubmitMy == true }"
        ></div>
        提交到个人账单
      </div>
      <div class="allMoney">
        合计（不含运费）&nbsp;&nbsp;
        <div>{{ money }}</div>
      </div>
      <div class="toPay" @click="toPay()">去结算</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shopCart",
  components: {},
  data() {
    return {
      allProducts: 0, //所有商品数
      pagesize: 3, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号
      isSubmitMy: false, //判断是否提交个人订单
      num: 1, //计数器
      //
      checkall: false,
      checkedCommodities: [], //复选框有关
      money: 0,
      commodityBox: [], //v-for get
      commodityList: [
        {
          name: "1111",
          huohao: "2",
          shopCart_id: 3,
          guige: "95%",
          num: 0,
          price: 5,
          payment: 666,
        },
        {
          name: "2222",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 0,
          price: 10,
          payment: 666,
        },
        {
          name: "3333",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 0,
          price: 50,
          payment: 666,
        },
        {
          name: "4444",
          huohao: "2",
          shopCart_id: 3,
          guige: "%",
          num: 0,
          price: 100,
          payment: 666,
        },
      ],
    };
  },
  created() {
        // this.$http
        // .get("/cart", {
        //   params: {

        //   },
        // })
        // //回调函数
        // .then((res) => {
        //   this.$data.commodityList = res.data.productList;
        //   console.log("ceshi", this.$data.commodityList);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
        this.addChecked();
        

  },
  // beforeUpdate() {
  //   this.commodityBox = [];
  // },
  // updated() {
  //   console.log(this.commodityBox);
  // },
  computed: {
    // 总计
money() {
  let _money = this.$data.money
     this.$data.checkedCommodities.forEach((item) => {
      _money += item.num * item.price;
     })
     return _money;
}
  },
  methods: {
   
    // setCommodityBox(el) {
    //   if (el) {
    //     this.commodityBox.push(el);
    //   }
    // },
    // 跳转产品详情页（需传参）
    toProductInfo() {
      this.$router.push({
        path: "/productInfo",
      });
    },
    toPay() {
      this.$router.push({
        path: "/payment",
      });
    },
    //删除按钮
    delProduct() {
      console.log(this.$data.commodityList,"删除前");
      this.$data.checkall = false;
      this.$data.checkedCommodities = [];
       this.$data.commodityList = this.$data.commodityList.filter((item) => {
            return item.checked === false;
      })
           console.log(this.$data.commodityList,"删除后");
    },
    //复选框相关
     addChecked() {
              //  function(){}      
    this.$data.commodityList.forEach((item) => {
        Object.assign(item, {checked: false});
        });
    },
    // 多选val: boolean
    checkAll() {
      // 数组为空时无法点击
      if(this.$data.commodityList.length === 0) {
        this.$data.checkall = false;
      }
      // 实现全选
      if( this.$data.checkall === true)
      {
        this.$data.checkedCommodities = this.$data.commodityList;
        this.$data.commodityList.forEach(function(item){
          item.checked = true;
          if(item.num === 0)item.num ++;
        })
      }
      // 实现反选
      else if( this.$data.checkall === false) {
        this.$data.checkedCommodities = [];
        this.$data.commodityList.forEach(function(item){
          item.checked = false;
        })
      }
     
    },
    checkOne(item) {
      console.log(item,"aaaa");
      var _this = this;
      console.log(_this.$data.checkedCommodities,"改变前");
      //选中时操作
         if(item.checked === true){
          if(item.num === 0)item.num ++;
          _this.$data.checkedCommodities.push(item);
         }
          //取消选中操作
         else if(item.checked ===false) {
          _this.$data.checkedCommodities = _this.$data.checkedCommodities.filter((ele) => {
            return ele.name !== item.name; 
          })
         }
     console.log(_this.$data.checkedCommodities,"改变后");
       //取消全选状态
       if(_this.$data.checkedCommodities.length === _this.$data.commodityList.length){
          _this.$data.checkall = true;
       }else {
        _this.$data.checkall = false;
       }
    },
    
    //商品数量调节
    handleChange(value) {
        console.log(value);
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
    //提交到个人订单
    submitMy() {
      if (this.$data.isSubmitMy == false) {
        this.$data.isSubmitMy = true;
      } else if (this.$data.isSubmitMy == true) {
        this.$data.isSubmitMy = false;
      }
    },
  },
};
</script>
<style scoped>
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
/* ---以下为购物车样式 */
.shopCart {
  width: 100%;
  height: 820px;
  overflow: hidden;
}
/* 表头 ------*/
.listHead {
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
}
.quanxuan {
  width: 230px;
  position: absolute;
  display: flex;
  align-items: center;
  margin: 0 0px 0 28px;
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
/* .checked {
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin: 0 6px 0 0px;
  border: 1px solid #999999;
  border-radius: 2px;
} */
.word {
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 18px;
} 
._productInfo {
  /* width: 565px; */
  flex: 4.5;
  text-align: center;
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
.allCommodity {
  width: 100%;
  height: 665px;
  display: flex;
  flex-direction: column;
}

.commodity {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  min-width: 1080px;
  height: 207px;
  margin: 0 0 20px 0;
  background: #f7f7f7;
  border-radius: 10px;
  overflow: hidden;
}
.checkOne {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
    border-radius: 2px;
}
.radio {
  position: absolute;
  top: 20px;
  left: 28px;
  width: 18px;
  height: 18px;
  /* border: 1px solid #999; */
  /* background-color: #fff; */
  /* border-radius: 2px; */
}
.productInfo {
  flex: 4.1;
  /* width: 700px; */
  height: 165px;
  display: flex;
  align-items: center;
  margin: 0 27px 0 68px;
}
.productPic {
  width: 165px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 33px 0 0;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}
.productPic img {
  object-fit: contain;
}
.infoBox {
  height: 165px;
}
.name_zh {
  cursor: pointer;
  height: 20px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 20px;
  padding: 0 0 2px 0;
  margin: 20px 0 15px;
}
.name_zh:hover {
  /* border-bottom: 2px solid #004EA2; */
  text-decoration: underline;
}
.infoWord {
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  margin: 8px 0;
}
.size {
  flex: 1;
  /* width: 110px; */
  /* margin: 0 50px 0 0; */
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
  margin: 0 5px;
}
.count /deep/ .el-input-number {
  width: 90%;
  height: 30px;
  line-height: 30px;
}
.count /deep/ .el-input-number__decrease, .count /deep/.el-input-number__increase {

  width: 30px;
  height: 30px;  
  line-height: 30px;
  border-radius: 2px;
  background: #eaebed;
}
.count /deep/ .el-input-number__decrease {
  left: 0;
}
.count /deep/.el-input-number__increase {
  right: 0;
}
.count /deep/ .el-input__inner {
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

.payment {
  flex: 1;
  /* width: 150px; */
  text-align: center;
  font-weight: 600;
}
/* 分页器 */
.pagination {
  margin: 20px 0 0 36%;
  overflow: hidden;
}
.shopCart /deep/ .el-pagination {
  --el-pagination-button-height: 40px;
  --el-pagination-font-size: 16px;
}
.shopCart >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #004ea2;
}
.shopCart /deep/.el-pagination.is-background .btn-next,
.shopCart /deep/.el-pagination.is-background .btn-prev,
.shopCart /deep/.el-pagination.is-background .el-pager li {
  min-width: 40px;
  border-radius: 5px;
}
.shopCart /deep/ .el-icon {
  margin: 0 auto;
}
/* 以下为底部 */
.footer {
  width: 95%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  border: 1px solid #eaeaec;
  border-radius: 10px;
}
.submitMy {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 160px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #004ea2;
}
.submitMyBtn {
  width: 18px;
  height: 18px;
  margin: 0 11px 0 0px;
  border: 1px solid #999999;
  border-radius: 2px;
}
.agree_submitMy {
  background-color: #004ea2;
}
.allMoney {
  display: flex;
  align-items: center;
  min-width: 220px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  margin: 0 0 0 42px;
}
.allMoney div {
  font-size: 26px;
  color: #ff4747;
}
.toPay {
  cursor: pointer;
  padding: 0 23px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  margin: 0 24px 0 26px;
  color: #004ea2;
  background-color: #e0f3fe;
  border-radius: 26px;
}
.toPay:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>