// 公司简介
<template>
  <div class="profileBox">
    <div class="title">
      <span style="color: #004ea2">{{ $t("home.corp") }}</span
      >{{ $t("home.info") }}
    </div>
    <div class="profile">
      <div class="companyPic"><img :src="companyPic" alt="" /></div>
      <div class="companyInfo">
        <h3 class="companyName">{{ companyName }}</h3>
        <p class="companyMessage">{{ companyMessage }}</p>
      </div>
    </div>
  </div>
  <div class="regionDistribution">
    <div class="mapName">{{ $t("home.map") }}</div>
    <div class="map"><img :src="map" alt="" /></div>
  </div>
</template>
<script>
export default {
  name: "companyProfile",
  components: "",
  data() {
    return {
      companyName: "青岛莱博斯威仪电科技有限公司",
      companyMessage:
        "青岛莱博斯威仪电科技有限公司，成立于2008-04-07，注册地址为山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A,经营范围包括一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；机械设备研发；海洋生物活性物质提取、纯化、合成技术研发；实验分析仪器销售；玻璃仪器销售；电子产品销售；化工产品销售（不含许可类化工产品）；金属材料销售；专用化学产品销售（不含危险化学品）；合成材料销售；制冷、空调设备销售；涂料销售（不含危险化学品）；计算机软硬件及辅助设备零售；五金产品批发；计算机软硬件及辅助设备批发；电子元器件批发；计量技术服务；货物进出口。（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）",
      companyPic: require("../../assets/p5.png"),
      map: require("../../assets/map.png"),
    };
  },
};
</script>
<style scoped>
.profileBox {
  width: 100%;
  height: 759.94px;
  background: #e3f5ff;
  overflow: hidden;
}
.title {
  width: 100%;
  height: 60.1px;
  margin: 52.03px 0 43.97px 0;
  font-size: 60.1px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #000;
  line-height: 60.1px;
  text-align: center;
}
.title > span {
  margin-right: 10px;
}
.profile {
  width: 100%;
  display: flex;
  justify-content: center;
}
.companyPic {
  width: 700.03px;
  height: 494.98px;
  background: transparent;
  border-radius: 4.99px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.companyPic > img {
  width: 700.03px;
  height: 494.98px;
  object-fit: cover;
}
.companyInfo {
  width: 700.03px;
  height: 494.98px;
  background: #333333;
  border-radius: 5px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.companyName {
  width: 523.97px;
  height: 36.1px;
  margin: 60.1px 0 46.08px 0;
  font-size: 36.1px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #323333;
  line-height: 36.1px;
}
.companyMessage {
  width: 528.96px;
  font-size: 14.02px;
  font-family: Microsoft YaHei UI;
  font-weight: 300;
  color: #4a4a4a;
}
/* ----地图 */
.regionDistribution {
  width: 100%;
  height: 907.97px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.mapName {
  width: 100%;
  height: 48px;
  font-size: 48px;
  margin: 70.08px 0 43.97px 0;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 48px;
}
.map {
  width: 1409.09px;
  height: 748.99px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.map > img {
  width: 1409.09px;
  height: 748.99px;
  object-fit: cover;
}
</style>