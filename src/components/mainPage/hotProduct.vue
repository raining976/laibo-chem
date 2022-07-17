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
  height: 57.4vw;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.title {
  width: 100%;
  height: 3.13vw;
  font-size: 3.13vw;
  padding: 4.17vw 0 2.6vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  line-height: 3.13vw;
  text-align: center;
}
.hotProductBox {
  width: 100%;
  height: 36.61vw;
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
  width: 49.9vw;
  height: 36.6vw;
}
.hotProduct:nth-of-type(1) .hotProductPic {
  width: 49.9vw;
  height: 31.46vw;
}
.hotProduct:nth-of-type(1) .hotProductPic > img {
  width: 49.9vw;
  height: 31.46vw;
}
.hotProduct:nth-of-type(1) .hotProductName {
  width: 49.9vw;
  height: 5vw;
  line-height: 5vw;
  font-size: 2.4vw;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
.hotProduct {
  width: 24.9vw;
  height: 18.23vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.05vw 0.1vw 0 0;
  overflow: hidden;
}
.hotProductPic {
  position: relative;
  width: 24.9vw;
  height: 15.73vw;
  overflow: hidden;
  cursor: pointer;
  /* ?? */
}
.hotProductPic > img {
  width: 24.9vw;
  height: 15.73vw;
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
  height: 2.5vw;
  font-size: 1.2vw;
  line-height: 2.5vw;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
.aboutIt {
  margin: 3.13vw 0 0 0;
  width: 11.56vw;
  height: 3.13vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1vw solid #004ea2;
  border-radius: 0.26vw;
  cursor: pointer;
}
.aboutIt:hover {
  border: 0.2vw solid #004ea2;
}
.aboutMore {
  position: relative;
  width: 6.77vw;
  height: 1.15vw;
  font-size: 1.15vw;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #004ea2;
  line-height: 1.15vw;
}
.aboutArrow {
  position: absolute;
  font-size: 0.73vw;
  top: 0px;
  animation: moveArrow 1s ease-out 0.5s infinite alternate;
}
@keyframes moveArrow {
  0% {
    right: 0vw;
  }
  50% {
    right: 0.42vw;
  }
  100% {
    right: 0.52vw;
  }
}
</style>