// 公司简介
<template>
  <div class="profileBox">
    <div class="h">
      <div class="title">
        <span>公司介绍</span>
        <span class="line"></span>
        <span>COMPANY PROFILE</span>
      </div>
      <div class="subTitle">{{ $t('companyInfo.name') }}</div>
      <div class="info">
        <p>
          {{ $t("companyInfo.p1") }}
        </p>
        <p>
          {{ $t("companyInfo.p2") }}
        </p>
        <p>
          {{ $t("companyInfo.p3") }}
        </p>
        <p>
          {{ $t("companyInfo.p4") }}
        </p>
      </div>
    </div>
  </div>
  <div class="regionDistribution">
    <div class="title">
      <span>业务覆盖图</span>
      <span class="line"></span>
      <span>OUR BUSINESS MAP</span>
    </div>
    <div class="map"><img :src="map" alt="" /></div>
  </div>
</template>
<script>
export default {
  name: "companyProfile",
  components: "",
  data() {
    return {
      map: require("../../assets/view.webp"),
    };
  },
};
</script>
<style scoped>
.profileBox {
  position: relative;
  background-image: url("../../assets/laibo.webp");
  background-size: cover;
  background-repeat: no-repeat;
}
.profileBox::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.h {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 44.79vw;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  padding: 4.17vw 0;
}
.title > .line {
  display: inline-block;
  width: 0.52vw;
  height: 2.66vw;
  background: #ffffff;
  margin: 0 1.56vw;
}
.subTitle {
  font-size: 3.75vw;
  font-family: Source Han Serif CN;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2.86vw;
}
.info {
  width: 46.15vw;
  height: 21.09vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 300;
  color: #ffffff;
  line-height: 1.56vw;
}
.info > p {
  text-indent: 2em;
}

/* ----地图 */
.regionDistribution {
  width: 100%;
  height: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.regionDistribution .title {
  color: #333;
}
.regionDistribution .line {
  background: #333;
}
.map {
  width: 73.39vw;
  height: 42.01vw;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.map > img {
  width: 73.39vw;
  height: 39.01vw;
  object-fit: cover;
}
</style>