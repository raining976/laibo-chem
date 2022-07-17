<template>
  <div class="bg">
    <div class="solidLine1"></div>
    <div class="productInfo">
      <div class="productInfoBox">
        <div class="productPic"><img :src="pic" alt="" /></div>
        <div class="info">
          <!-- 化学名 -->
          <div class="productName">{{ name }}</div>
          <!-- 浓度 -->
          <div class="concentration">{{ concentration }}</div>
          <div class="solidLine2"></div>
          <!-- 详细信息 -->
          <div class="details">
            <!-- 以下为 不是-->
            <div class="oneDetail">
              <div class="detailName">CAS编号:</div>
              <div class="detailContent">{{ CAScode }}</div>
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
              <div class="detailContent">{{ EINECScode }}</div>
            </div>

            <div class="oneDetail">
              <div class="detailName">MDL:</div>
              <div class="detailContent">{{ MDLcode }}</div>
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
          <!-- 库存与预计交期 -->
          <div class="kucun_peisong">
            <div class="inventory">库存：{{ inventory }}</div>
            <div class="delivery">预计交期：{{ delivery }}</div>
          </div>
          <!-- 价格 -->
          <div class="aprize">
            <el-table :data="tableData" style="width: 100%" height="250">
              <el-table-column prop="date" label="Date" width="150" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="state" label="State" width="120" />
              <el-table-column prop="city" label="City" width="120" />
              <el-table-column prop="address" label="Address" width="150" />
              <el-table-column prop="zip" label="Zip" width="120" />
            </el-table>
          </div>
        </div>
      </div>
      <div class="addCart">加入购物车</div>
      <div class="toCustomize">联系客服私人订制></div>
    </div>
  </div>
</template>
<script>

export default {
  name: "productInfo",
  components: "",
  data() {
    return {
      pic: require("../../assets/p11.png"),
      name: "T826255 2-(三丁基锡)-5-三氟甲基吡啶",
      concentration: ">95%",
  tableData : [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
   {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
    };
  },
};
</script>
<style scoped>
.bg {
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
.productName {
  width: 100%;
  height: 49.92px;
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 49.92px;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.oneDetail {
  width: 436.99px;
  height: 18.05px;
  margin: 9.98px 0;
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
.kucun_peisong {
  width: 100%;
  height: 18.05px;
  display: flex;
  font-size: 18.05px;
  margin: 13.06px 0 13.06px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  line-height: 18.05px;
}
.inventory {
  width: 157.06px;
  height: 18.05px;
  line-height: 18.05px;
}
.delivery {
  height: 18.05px;
  line-height: 18.05px;
}
.prize {
  width: 99.5%;
  height: 173.95px;
  border: 0.96px solid #999999;
  border-radius: 4.99px;
  overflow: hidden;
}
.addCart {
  cursor: pointer;
  margin: 33.98px 0 0 0;
  width: 258.05px;
  height: 77px;
  line-height: 77px;
  font-size: 30px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  background: #004ea2;
  border-radius: 4.99px;
  transition: all 0.4s;
}
.addCart:hover {
  box-shadow: 0 2px 8px 1px #000;
}
.toCustomize {
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  position: absolute;
  color: #004ea2;
  bottom: 38.02px;
  right: 0;
  font-size: 22px;
}
.toCustomize:hover {
  font-weight: 600;
}
</style>