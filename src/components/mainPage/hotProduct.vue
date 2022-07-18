// 热门产品
<template>
  <router-view></router-view>
  <div class="hotProducts">
    <div class="title">热门<span style="color: #004ea2">产品</span></div>
    <div class="hotProductBox">
      <div
        class="hotProduct"
        v-for="(item, index) in productList"
        :key="index"
        @click="toProductInfo()"
      >
        <div class="hotProductPic">
          <img :src="item.img" alt="" />
          <div class="shadow"></div>
        </div>
        <div class="hotProductName">{{ item.name }}</div>
      </div>
    </div>
    <div class="aboutIt">
      <div class="aboutMore">
        了解更多&nbsp;&nbsp;
        <div class="aboutArrow">></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hotProduct",
  components: "",
  data() {
    return {
      productList: [
        { img: require("../../assets/p3.png"), name: "染料" },
        { img: require("../../assets/p3.png"), name: "染料" },
        { img: require("../../assets/p3.png"), name: "染料" },
        { img: require("../../assets/p3.png"), name: "染料" },
        { img: require("../../assets/p3.png"), name: "染料" },
      ],
    };
  },
  methods: {
    toProductInfo() {
      this.$router.push({
        path: "/productInfo",
      });
    },
  },
};
</script>
<style scoped>
.hotProducts {
  width: 100%;
  height: 1102.08px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.title {
  width: 100%;
  height: 60.1px;
  font-size: 60.1px;
  padding: 80.06px 0 49.92px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  line-height: 60.1px;
  text-align: center;
}
.hotProductBox {
  width: 1920px;
  height: 702.91px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
.hotProduct {
  overflow: hidden;
}
/* 大图片 */
.hotProduct:nth-of-type(1) {
  width: 958.08px;
height: 702.72px;

}
.hotProduct:nth-of-type(1) .hotProductPic {
  width: 958.08px;
  height: 604.03px;
}
.hotProduct:nth-of-type(1) .hotProductPic > img {
    width: 958.08px;
  height: 604.03px;
}
.hotProduct:nth-of-type(1) .hotProductName {
width: 958.08px;
  height: 96px;
  line-height: 96px;
  font-size: 46.08px;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
.hotProduct {
  width: 478.08px;
  height: 350.02px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.96px 1.92px 0 0;
  overflow: hidden;
}
.hotProductPic {
  position: relative;
  width: 478.08px;
  height: 302.02px;
  overflow: hidden;
  cursor: pointer;
  /* ?? */
}
.hotProductPic > img {
  width: 478.08px;
  height: 302.02px;
  object-fit: contain;
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s;
}
/*遮罩 */
.hotProductPic > img:hover + .shadow {
  opacity: 0.4;
}
.hotProductName {
  width: 100%;
  height: 48px;
font-size: 23.04px;
  line-height: 48px;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
.aboutIt {
  margin: 60.1px 0 0 0;
  width: 221.95px;
  height: 60.1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.92px solid #004ea2;
  border-radius: 4.99px;
  cursor: pointer;
  transition: all 0.8s;
}
.aboutIt:hover {

  background-color: #004EA2;
}
.aboutIt:hover .aboutMore {
    color: #fff;
}
.aboutMore {
  position: relative;
  width: 129.98px;
height: 22.08px;
font-size: 22.08px;
font-family: Source Han Sans SC VF;
font-weight: bold;
color: #004EA2;
line-height: 22.08px;
}
.aboutArrow {
  position: absolute;
  font-size: 22px;
  top: 0px;
  animation: moveArrow 1s ease-out 0.5s infinite alternate;
}
@keyframes moveArrow {
  0% {
    right: 0px;
  }
  50% {
    right: 8.06px;
  }
  100% {
    right: 9.98px;
  }
}
</style>