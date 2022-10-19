// 热门产品
<template>
  <div class="hotProduct">
    <h3 class="title">
      <span class="title_zh">热门产品</span>
      <span class="line"></span>
      <span class="title_en">HOT PRODUCTS </span>
    </h3>
    <div class="carouselBox">
      <ul class="move">
        <li v-for="(p, index) in products" :key="index">
          <img :src="p.pic" alt="" />
          <span class="proName">{{ p.name }}</span>
        </li>
      </ul>
      <div class="btnLeft btn" @click="move(0)">&lt;</div>
      <div class="btnRight btn" @click="move(1)">&gt;</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hotProduct",
  components: "",
  data() {
    return {
      products: [
        { pic: require("../../assets/111.jpg"), name: "111" },
        { pic: require("../../assets/111.jpg"), name: "222" },
        { pic: require("../../assets/111.jpg"), name: "333" },
        { pic: require("../../assets/111.jpg"), name: "444" },
        { pic: require("../../assets/111.jpg"), name: "555" },
        { pic: require("../../assets/111.jpg"), name: "222" },
        { pic: require("../../assets/111.jpg"), name: "222" },
      ],
    };
  },
  created() {
    // this.$http
    //   .get("/hotProducts", {
    //     // params: {
    //     // },
    //   })
    //   //回调函数
    //   .then((res) => {
    //     this.products = res.data.data.products;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    toLearnMore() {
      this.$router.push({
        path: "/searchResult",
        query: {
          whichType: 4,
        },
      });
    },
    move(val) {
      if(val){
        // 右
      }else{
        // 左
      }
    },
  },
};
</script>
<style scoped>
.hotProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f4f5;
}
.title {
  display: flex;
  align-items: center;
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 140px 0 70px 0;
}
.title .line {
  display: inline-block;
  width: 10px;
  height: 51px;
  background: #333333;
  margin: 0 36px;
}
.carouselBox {
  position: relative;
  width: 100%;
  height: 500px;
  /* overflow: hidden; */
  margin-bottom: 180px;
}
.btn {
  position: absolute;
  top: 50%;
  font-size: 50px;
  color: #ffffff;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background: rgba(0, 0, 0, 0.47);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover{
  font-size: 60px;
  
}
.btn.btnLeft {
  left: 100px;
}
.btn.btnRight {
  right: 100px;
}
.carouselBox .move {
  display: flex;
  margin-left: -225px;
}
.carouselBox .move li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: 400px;
  background: #f6f8fc;
  box-shadow: 6px 6px 24px 0px rgba(0, 12, 52, 0.13);
  border-radius: 5px;
  margin: 0 20px;
  transition: 0.3s;
  cursor: pointer;
}
.carouselBox .move li img {
  width: 350px;
  height: 190px;
}
.proName {
  font-size: 30px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333;
  margin-top: 80px;
}
.carouselBox .move li:hover {
  background: rgb(41, 116, 184);
  background: linear-gradient(
    0deg,
    rgba(41, 116, 184, 1) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  color: #ffffff;
}
</style>