<template>
  <div class="bg">
    <div class="solidLine1"></div>
    <div class="productInfo">
      <div class="productInfoBox">
        <div class="productPic"><img :src="pic" alt="" /></div>
        <div class="info">
          <!-- 化学名 -->
          <div class="productName_zh">{{ name }}</div>
          <div class="productName_en">{{ name }}</div>
          <!-- 浓度 -->
          <div class="concentration">{{ concentration }}</div>
          <div class="solidLine2"></div>
          <!-- 详细信息 -->
          <div class="details">
            <!-- 以下为 不是-->
            <div class="oneDetail">
              <div class="detailName">CAS编号:</div>
              <div class="detailContent">{{ casCode }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">分子式:</div>
              <div class="detailContent">{{ fenzishi }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">分子量:</div>
              <div class="detailContent">{{ fenziliang }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">EINECS编号:</div>
              <div class="detailContent">{{ einecsCode }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">MDL:</div>
              <div class="detailContent">{{ mdlCode }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">物化性质:</div>
              <div class="detailContent">{{ property }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">熔点:</div>
              <div class="detailContent">{{ fusionPoint }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">沸点:</div>
              <div class="detailContent">{{ boilingPoint }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">密度:</div>
              <div class="detailContent">{{ midu }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">储存条件:</div>
              <div class="detailContent">{{ storageCondition }}</div>
            </div>
          </div>
          <!-- 价格 -->
          <div class="prize">
            <table border="0" cellspacing="0">
              <thead>
                <tr class="tableHead">
                  <th style="width: 145px">货号</th>
                  <th style="width: 140px">规格</th>
                  <th style="width: 215px">库存</th>
                  <th style="width: 170px">售价（RMB）</th>
                  <th style="width: 200px">数量</th>
                </tr>
              </thead>
              <el-scrollbar max-height="132px">
                <tbody>
                  <tr
                    class="tableContent"
                    v-for="(item, index) in productData"
                    :key="index"
                  >
                    <td class="huohao">
                      <div>{{ item.huohao }}</div>
                    </td>
                    <td class="size">
                      <div>{{ item.size }}</div>
                    </td>
                    <td class="store">
                      <div>{{ item.store }}</div>
                    </td>
                    <td class="rmb">
                      <div>{{ item.rmb }}</div>
                    </td>
                    <td class="count">
                      <div class="countBtn">
                        <div>-</div>
                        <div>0{{ la }}</div>
                        <div>+</div>
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
        <div class="addCart">加入购物车</div>
        <div class="toBuy">购买</div>
      </div>

      <div class="toCustomize" @click="isShow = !isShow">联系客服私人订制></div>
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
      pic: require("../../assets/p11.png"),
      name: "T826255 2-(三丁基锡)-5-三氟甲基吡啶",
      concentration: ">95%",
      productData: [
        {
          huohao: "2016-05-03",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          count: 0,
        },
        {
          huohao: "2016-05-02",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          count: 0,
        },
        {
          huohao: "2016-05-04",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          count: 0,
        },
        {
          huohao: "2016-05-04",
          size: "Tom",
          rmb: "California",
          store: "Los Angeles",
          count: 0,
        },
      ],
    };
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
  height: 0.96px;
  border-bottom: 0.96px solid #999999;
  margin: 0 auto;
}
.productInfo {
  width: 1410px;
  height: 749.95px;
  margin: 76.99px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; */
  position: relative;
}
.productInfoBox {
  width: 1410px;
  height: 556px;
  display: flex;
}
.productPic {
  width: 505px;
  height: 542.02px;
  margin: 0 27.07px 0 0;
  border: 0.96px solid #999999;
  border-radius: 4.99px;
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
  height: 542.02px;
  overflow: hidden;
}
.productName_zh {
  width: 100%;
  height: 49.92px;
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 49.92px;
  margin: 0 0 12px 0;
}
.productName_en {
  width: 100%;
  height: 32px;
  font-size: 30px;
  line-height: 32px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.concentration {
  width: 100%;
  height: 24px;
  margin: 12.1px 0 0 4.99px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 24px;
}
.solidLine2 {
  width: 874.94px;
  height: 0.96px;
  margin: 28.03px 0 14.02px;
  border-bottom: 0.96px solid #999999;
}
.details {
  width: 100%;
  height: 190.08px;
  /* margin: 0 0 12px 0; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.oneDetail {
  width: 436.99px;
  height: 18.05px;
  margin: 9.98px 0;
  display: flex;
}
.detailName {
  width: 157.06px;
  height: 18.05px;
  font-size: 18.05px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18.05px;
}
.detailContent {
  /* width: ; */
  height: 18.05px;
  font-size: 18.05px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18.05px;
}

/* 以下是表格 */
.prize {
  width: 99.5%;
  height: 174px;
  border: 0.96px solid #999999;
  border-radius: 4.99px;
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

.huohao {
  width: 145px;
  color: #004ea2;
}
.size {
  width: 140px;
  color: #171717;
}
.store {
  width: 215px;
  color: #004ea2;
}
.rmb {
  width: 170px;
  color: #ff4d4d;
}
/* 购买数量按钮 */
.count {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countBtn {
  display: flex;
  align-items: center;
  justify-content: center;
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
  transition: all 0.4s;
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