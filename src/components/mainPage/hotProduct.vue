// 热门产品
<template>
  <router-view></router-view>
  <div class="hotProducts">
    <div class="title">
      {{ $t("home.hot")
      }}<span style="color: #004ea2">{{ $t("home.product") }}</span>
    </div>
    <div class="hotProductBox">
      <div
        class="hotProduct"
        v-for="(item, index) in productList.slice(0,5)"
        :key="index"
        @click="toProductInfo(item.id)"
      >
        <div class="hotProductPic">
          <img :src="item.pic_url" alt="" />
          <div class="shadow"></div>
        </div>
        <div class="hotProductName">{{ item.name }}</div>
      </div>
    </div>
    <div class="aboutIt">
      <div class="aboutMore">{{ $t("home.learnMore") }}&nbsp;&nbsp;</div>
      <div class="aboutArrow">></div>
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
        { pic_url: require("../../assets/p3.png"), name: "染料" },
        { pic_url: require("../../assets/p3.png"), name: "染料" },
        { pic_url: require("../../assets/p3.png"), name: "染料" },
        { pic_url: require("../../assets/p3.png"), name: "染料" },
        { pic_url: require("../../assets/p3.png"), name: "染料" },
      ],
    };
  },
  created() {
      this.$http
        .get("/hotProducts", {
          params: {

          },
        })
        //回调函数
        .then((res) => {
          this.$data.productList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
  },
  methods: {
    toProductInfo(code) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: code,
        },
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
.title > span {
  margin-left: 10px;
}
.hotProductBox {
  max-width: 1920px;
  width:100%;
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
  /* width: 50%; */
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
  position: relative;
  margin: 60.1px 0 0 0;
  width: 221.95px;
  height: 60.1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.92px solid #004ea2;
  border-radius: 4.99px;
  cursor: pointer;
  transition: all 0.2s;
}
.aboutIt:hover {
  background-color: #004ea2;
}
.aboutIt:hover >div{
  color: #fff;
}
.aboutMore {
  font-size: 22.08px;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #004ea2;
 
}
.aboutArrow {
   position: absolute;
  font-size: 22px;
  animation: moveArrow 1s ease-out 0.3s infinite alternate;
}
@keyframes moveArrow {
  0% {
    right: 10px;
  }
  50% {
    right: 15px;
  }
  100% {
    right: 20px;
  }
}
</style>