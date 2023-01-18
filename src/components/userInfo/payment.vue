//订单（支付部分）
<template>
  <div class="paymentPage" v-if = "info">
    <!-- 收获地址 -->
    <div class="amount">
      <div class="top">
        <div class="title">{{ $t("cart.settlement") }}</div>
        <div class="returnBtn" @click="back()">{{ $t("base.back") }}</div>
      </div>

      <div class="orderInfo">
      <div class="detail"><strong>{{$t('order.num')+'：'}}</strong>{{orderNo}}</div>
      <div class="detail"><strong>{{ $t("address.name")+'：' }}</strong>{{info[0].name}}</div>
      <div class="detail"><strong>{{$t("base.phone")+'：'}}</strong>{{info[0].phone}}</div>
      <div class="detail"><strong>{{$t("base.address")+'：'}}</strong>{{info[0].address}}</div>
    </div>

      <div class="freight">
        {{ $t("cart.fright") + "：" }}<strong>{{ currency(orderList.post_fee).format() }}</strong>
      </div>
    </div>
    <!-- 商品统计 -->
    <div class="shopCart">
      <div class="listHead">
        <div class="_productInfo word">{{ $t("order.productInfo") }}</div>
        <div class="_size word">{{ $t("order.size") }}</div>
        <div class="_price word">{{ $t("order.price") }}</div>
        <div class="_count word">{{ $t("order.count") }}</div>
        <div class="_payment word">{{ $t("order.money") }}</div>
      </div>
      <div class="allCommodity">
        <!-- 以下v-for一个商品 -->
        <div
          class="commodity"
          v-for="(item0, index) in orderInfo.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <div class="productInfo">
            <div class="productPic">
              <img :src="item0.product.pic_url" alt="" />
            </div>
            <div class="infoBox">
              <div class="name_zh" @click="toProductInfo(item0.product.id)">
                {{ item0.product.name }}
              </div>
              <div class="infoWord">
                {{ $t("order.itemNo") + "：" }}{{ item0.huohao }}
              </div>
              <div class="infoWord">
                {{ $t("order.casNum") + "：" }}{{ item0.product.cas }}
              </div>
            </div>
          </div>
          <div class="size">{{ item0.product.guige }}</div>
          <div class="price">{{ item0.price }}</div>
          <div class="count">
            <div class="num">{{ item0.count }}</div>
          </div>
          <!-- 关于金额的计算方式 -->
          <div class="payment">{{ currency(orderList.payment).format() }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background="#004ea2"
          layout="prev,pager,next"
          :total="orderInfo.length"
          :page-size="pagesize"
          :pager-count="pagerCount"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- <address-form v-if="formIsShow" /> -->
    <!-- 以下为支付方式-------------->
    <div class="payType">
      <div class="typeTitle">{{ $t("cart.payType") }}</div>
      <div class="typeBox">
        <!-- <div
          class="type"
          :class="{ type_checked: wechar == true }"
          @click="payType('wx')"
        >
          <div class="typeSign">
            <img src="../../assets/weixinzhifu.png" alt="" />
          </div>
          <div class="typeName">
            {{ $t("cart.weChat") + " " + $t("cart.payment") }}
          </div>
        </div> -->

        <div
          class="type"
          :class="{ type_checked: zhifubao == true }"
          @click="payType('alipay')"
        >
          <div class="typeSign">
            <img src="../../assets/zhifubao.png" alt="" />
          </div>
          <div class="typeName">
            {{ $t("cart.paypal") + " " + $t("cart.payment") }}
          </div>
        </div>
        <div
          class="type"
          :class="{ type_checked: geren == true }"
          @click="payType('pic')"
        >
          <div class="typeSign">
            <img src="../../assets/gerenzhifu.png" alt="" />
          </div>
          <div class="typeName">{{ $t("cart.bills") + $t("cart.person") }}</div>
        </div>
        <div
          class="type"
          :class="{ type_checked: gongsi == true }"
          @click="payType('gongsi')"
        >
          <div class="typeSign">
            <img src="../../assets/gongsi.png" alt="" />
          </div>
          <div class="typeName">{{ $t("cart.bills") + $t("cart.firm") }}</div>
        </div>
      </div>
      <div class="upload" v-if="showBills">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          action=""
          :multiple="false"
          accept=".jpeg, .jpg, .png"
          :on-change="onUploadChange"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :show-file-list="true"
          :auto-upload="false"
          :limit="1"
        >
          <!-- 要改下面 -->
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或 <em>点击选取文件</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">只能选取jpg/png文件，且不超过5M</div>
          </template>
        </el-upload>
        <!--  -->
        <el-button @click="submitForm()" >提交到服务器</el-button>
      </div>
    </div>
    <!-- 以下为底部 -->
    <div class="footer">
      <div class="allMoney">
        {{ $t("cart.total") }}&nbsp;&nbsp;&nbsp;
        <div>{{ currency(allmoney).format() }}</div>
      </div>
      <el-button :disabled="showBills == true? true:false" class="pay" @click="pay()">{{ submitBtn }}</el-button>
    </div>
  </div>
</template>
<script>
import handleAddress from "../../js/handlerAddress";
// import addressForm from "../address/addressForm.vue";
export default {
  name: "payment",
  components: {
    // addressForm,
  },
  data() {
    return {
      pagesize: 2, // 每页显示多少条
      currentPage: 1, // 当前页数
      pagerCount: 5, //五个以上加省略号

      // formIsShow: false, // 地址表单是否展示
      
      wechar: false,
      zhifubao: false,
      geren: false,
      gongsi: false,
      payWay: "",
      addressId: 0, // 地址id
      freight: 0, //运费
      allmoney: 0, //总计
      orderId: 0,
      curAddress: {}, // 当前地址对象
      pushProduct: {
        product_params_id: 0,
        count: 0,
      }, //单个货物
      fileList: [], // 上传的图片数组
      isLt2k: "", // 上传文件大小判断
      isImg: "",
      submitBtn: this.$t("cart.settlement"),
      showBills: false,
      orderBox: [], //订单汇总传参--按照后端格式
      addresses: {}, // 获取的地址键值对
      addressArray: [], // 将键值对对象放入地址数组传参进行翻译
      info: "", //存储转换后的地址数组  ---以字符串形式定义，防止DOM节点挂载完成时判断初始化的数据还未存在的冲突（异步）
      orderList: [],
      orderInfo: [
        // {
        //   name: "S915939 碳化硅, 99.9% metals basis,100目",
        //   huohao: "S915939-5g",
        //   shopCart_id: 409 - 21 - 2,
        //   guige: "99.9% metals basis,100目",
        //   num: 1,
        //   price: 39,
        //   payment: 666,
        // },
      ],
    };
  },
  created() {
    this.$data.orderList = JSON.parse(localStorage.getItem("oneOrder"));
    this.orderNo = localStorage.getItem("orderNo")
    this.getOrderInfo()
    this.$data.orderInfo = this.$data.orderList.product;
  },
  watch: {
    isReloadAddress(val) {
      if (val) {
        this.getAddress();
        this.isReloadAddress = false;
      }
    },
    orderInfo: {
      handler() {
        this.$nextTick(() => {
          let obj;
          this.$data.orderInfo.forEach((item) => {
            this.$data.pushProduct.product_params_id = item.id;
            this.$data.pushProduct.count = item.count;
            obj = JSON.stringify(this.$data.pushProduct); //深拷贝
            //  console.log(JSON.parse(obj),"ccccc")
            this.$data.orderBox.push(JSON.parse(obj)); //一个一个存
            //  console.log(this.$data.orderBox,"ceshi1111");
            this.$data.pushProduct.product_params_id = 0;
            this.$data.pushProduct.count = 0;
          });
        });
      },
    },
  },
  computed: {
    allmoney() {
      let _allmoney = this.$data.allmoney;
      // _allmoney += this.$data.orderList.post_fee;
      // this.$data.orderList.forEach((item) => {
      //   _allmoney += item.payment;
            
      // });
       _allmoney += this.$data.orderList.payment;
      this.$data.allmoney = _allmoney;
      return _allmoney;
    },
  },
  methods: {
    // 获取信息
     getOrderInfo() {
        this.$http
        .get("/order/detail", {
          params: {
             order_id: localStorage.getItem("orderNo"), // 暂定
          }
         
        })
        //回调函数
        .then((res) => {
          // console.log("ceess", res.data.data);
           if(!res.data.data){
             this.$data.info = [];
          }
          else {
          Object.assign(this.$data.addresses, { dz:res.data.data.dz, gj: res.data.data.gj, id: res.data.data.id, name: res.data.data.name, phone: res.data.data.phone, sx: res.data.data.sx });
          this.$data.addressArray.push(this.$data.addresses);
          this.$data.info = handleAddress(this.$data.addressArray);

          // console.log("ceshi,shuzu ", this.$data.info);
          }     
        })
        .catch((err) => {
          console.log(err);
        });
     },
    
    back() {
      this.$router.go(-1)
    },
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: code,
        },
      });
    },
    
    // 文件上传相关--------------
    //上传之前
    onUploadChange(file) {
      var FileExt = file.name.replace(/.+\./, "");
      if (["jpg", "png"].indexOf(FileExt.toLowerCase()) === -1) {
        this.isImg = "0";
        this.$message({
          type: "warning",
          message: this.$t('payment.uploadMsg'),
        });
        file.status = "error";
      }
      this.isLt2k = file.size / 1024 / 1024 < 5 ? "1" : "0";
      if (this.isLt2k === "0") {
        this.$message({
          message: this.$t('payment.uploadSize'),
          type: "error",
        });
        file.status = "error";
      }
      return this.isImg === "1"
        ? true
        : false && this.isLt2k === "1"
        ? true
        : false;
    },
    // 支付----上传单据
    submitForm() {
      console.log("ff22", this.$refs.upload.uploadFiles.length);
      if(this.$refs.upload.uploadFiles.length !== 0) {
      let file = this.$refs.upload.uploadFiles.pop().raw; //这里获取上传的文件对象
      console.log("ff", file);
      let formData = new FormData();
      formData.append("order_no", localStorage.getItem("orderNo"));
      formData.append("type", this.$data.payWay);
      formData.append("image", file);
      console.log(formData.get("type"));
      // this.$axios.post("/upload", formData).then((res) => {
      //   console.log(res.data);
      // }); {
      if (this.$data.payWay) {
        this.$http({
            headers: { "Content-Type": "multipart/form-data" },
            method: 'post',
            url: "/pay",
            data: formData,
            })
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: this.$t('callback.paySuccess'),
                type: "success",
              });
              // this.$router.push({
              //   path: "/payCompleted/" + this.$data.orderId,
              // });
              //上传单据成功的跳转回上一页
              this.$router.go(-1)
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
      } else {
        this.$message({
          message: this.$t('payment.selectBills'),
          type: "error",
        });
      }

    },
    // 上传成功---不用
    upSuccess(res) {
      this.$message({
        type: "success",
        message: this.$t('callback.uploadSuccess'),
        showClose: true,
        offset: 80,
      });
    },
    // 上传失败---不用
    upError() {
      this.$message({
        type: "error",
        message: this.$t('callback.uploadError'),
        showClose: true,
        offset: 80,
      });
    },
    //上传的文件改变时（覆盖原来的文件）
    upChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    // 移除列表
    upRemove(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(this.$t('payment.selectLimit'));
      // ，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
    },
    beforeRemove(file, fileList) {
      return this.$confirm(this.$t('payment.sure')+`${file.name}` + '?', this.$t('base.tip'), {
        confirmButtonText: this.$t('base.sure'),
        cancelButtonText: this.$t('base.cancel'),
        type: "warning",
      });
    },
    // 分页---
    handleSizeChange(val) {
      this.$data.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$data.currentPage = val;
      // console.log(`当前页: ${val}`);
    },

    payType(str) {
      this.$data.payWay = str;
      switch (str) {
        case "wx":
          this.$data.wechar = true;
          this.$data.zhifubao = false;
          this.$data.geren = false;
          this.$data.gongsi = false;
          this.$data.showBills = false;
          this.$data.submitBtn = this.$t("cart.settlement");
          break;
        case "alipay":
          this.$data.wechar = false;
          this.$data.zhifubao = true;
          this.$data.geren = false;
          this.$data.gongsi = false;
          this.$data.showBills = false;
          this.$data.submitBtn = this.$t("cart.settlement");
          break;
        case "pic":
          this.$data.wechar = false;
          this.$data.zhifubao = false;
          this.$data.geren = true;
          this.$data.gongsi = false;
          this.$data.showBills = true;
          this.$data.submitBtn = "---";
          break;
        case "gongsi":
          this.$data.wechar = false;
          this.$data.zhifubao = false;
          this.$data.geren = false;
          this.$data.gongsi = true;
          this.$data.showBills = true;
          this.$data.submitBtn = "---";
          break;
      }
    },
    // 支付----
    pay() {
      // 判断是否选择支付方式
      if (!this.$data.payWay) {
        this.$message({
          message: this.$t('payment.selectType'),
          type: "error",
        });
      } else if (this.$data.payWay) {
        this.$http
          .post("/pay", {
            order_no: localStorage.getItem("orderNo"),
            type: this.$data.payWay,
            // image: "",
          })
          .then((res) => {
            if (res.data.code == 20000) {
              // this.$message({
              //   message: this.$t('callback.paySuccess'),
              //   type: "success",
              // });
              window.location.href = res.data.data.url;
              // this.$router.push({
              //   path: "/payCompleted/" + this.$data.orderId,
              // });
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
    },
  },
};
</script>
<style scoped>
.paymentPage {
  position: relative;
}
.top {
  width: 100%;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.returnBtn {
  margin: 0 2.5vw 0 0;
  height: 1.04vw;
  line-height: 1.04vw;
  font-size: 0.83vw;
  margin-bottom: 1.56vw;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
  font-family: Microsoft YaHei UI;
}
.returnBtn:hover {
  color: #004ea2;
}

.title {
  height: 1.04vw;
  line-height: 1.04vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  /* margin-right: 50px; */
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

.freight {
  /* width: 142px; */
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 0.94vw;
  padding-bottom: 1.56vw;
  border-bottom: 0.1vw solid #eaeaec;
  margin: 0 0 0.78vw 0;
  overflow: hidden;
}

/* 下为购物车样式 */
.shopCart {
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
  width: calc(100% - 10.31vw);
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
.paymentPage /deep/ .el-pagination {
  --el-pagination-button-height: 2.08vw;
  --el-pagination-font-size: 0.83vw;
}
.paymentPage
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #004ea2;
}
.paymentPage /deep/.el-pagination.is-background .btn-next,
.paymentPage /deep/.el-pagination.is-background .btn-prev,
.paymentPage /deep/.el-pagination.is-background .el-pager li {
  min-width: 2.08vw;
  border-radius: 0.26vw;
}
.paymentPage /deep/ .el-icon {
  margin: 0 auto;
}
/* 以下为支付类型 */
.payType {
  overflow: hidden;
}
.typeTitle {
  margin: 2.08vw 0 1.56vw;
  height: 1.04vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  line-height: 1.04vw;
}
.typeBox {
  display: flex;
  flex-wrap: wrap;
}
.type {
  /* width: 200px; */

  height: 2.92vw;
  line-height: 3.02vw;
  border: 0.05vw solid #999999;
  border-radius: 0.26vw;
  margin: 0 2.4vw 0.26vw 0;
  padding: 0.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 0.78vw;
}
.type:hover,
.type_checked {
  border: 0.16vw solid #004ea2;
  height: 2.71vw;
  padding: 0 0.68vw;
}
/* .type_checked {
  border: 3px solid #004ea2;
  padding: 0;
} */
.typeSign {
  width: 1.98vw;
  height: 1.98vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.73vw 0 0;
  overflow: hidden;
}
.typeSign img {
  object-fit: contain;
  width: 1.98vw;
  height: 1.98vw;
}
.typeName {
  height: 0.83vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 0.83vw;
}
/* 上传文件相关 */
.upload >>> .el-upload-dragger {
  width: 36.46vw;
  height: 4.17vw;
}
.upload >>> .el-upload-dragger .el-upload__text em {
  color: var(--color);
}
.upload >>> .el-upload-dragger:hover {
  color: var(--color);
}
.upload >>> .el-upload-list__item {
  width: 70%;
}
.upload >>> .is-error .el-upload-list__item-name {
  color: red !important;
}
.upload >>> .el-button {
  margin-top: 1.04vw;
}
.upload >>> .el-button:focus, .el-button:hover {
  background-color: var(--color);
  color: #fff;
}
/* 以下为底部 */
.footer {
  width: 95%;
  height: 5.21vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  border: 0.05vw solid #eaeaec;
  border-radius: 0.52vw;
  margin: 4.69vw 0 0 0;
  overflow: hidden;
}
.allMoney {
  display: flex;
  align-items: center;
  min-width: 11.46vw;
  height: 0.94vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
  margin: 0 0 0 2.19vw;
}
.allMoney div {
  font-size: 1.35vw;
  color: #ff4747;
}
.pay {
  cursor: pointer;
  padding: 0 1.2vw;
  height: 2.71vw;
  line-height: 2.71vw;
  font-size: 0.94vw;
  letter-spacing: 0.1vw;
  text-align: center;
  margin: 0 1.25vw 0 1.35vw;
  color: #004ea2;
  background-color: #e0f3fe;
  border-radius: 1.35vw;
}
.pay:hover {
  color: #fff;
  background-color: #004ea2;
}
</style>
