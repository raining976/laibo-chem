<template>
  <div class="bg">
    <div class="solidLine"></div>
    <div class="tip">查到一下几种结果：</div>
    <div class="resultBox">
      <!-- v-for模块 -->
      <div class="result">
        <div class="resultPic"><img :src="pic" alt="" /></div>
        <div class="resultInfo">
          <div class="resultName_zh" @click="toProductInfo() "><span>{{ Name_zh }}</span></div>
          <div class="resultName_en">英文名：{{ Name_en }}</div>
          <div class="resultDetail">
            <!-- v-for模块 -->

            <div class="huohao _data">货号：{{ huohao }}</div>
            <div class="jiegoushi _data">结构式：{{ jiegoushi }}</div>
            <div class="CAScode _data">CAS编码：{{ CAScode }}</div>
            <div class="MDLcode _data">MDL号：{{ MDLcode }}</div>
          </div>
        </div>
        <div class="addCart">
          加入购物车<img src="../../assets/gouwuche.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: "",
  data() {
    return {
      pic: require("../../assets/p22.png"),
      Name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
      Name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
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
.bg {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.solidLine {
  width: 73.44vw;
  height: 0.05vw;
  border-bottom: 0.05vw solid #999999;
  margin: 0 auto;
}
.tip {
  width: 73.44vw;
  height: 1.25vw;
  font-size: 1.25vw;
  margin: 1.56vw 0 1.3vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 1.25vw;
}
.resultBox {
  width: 73.44vw;
  overflow: hidden;
}
.result {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 73.44vw;
  height: 15.63vw;
  margin: 0 0 1.04vw 0;
  border-radius: 0.26vw;
  overflow: hidden;
  background-color: #f7f7f7;
}
.resultPic {
  width: 15.42vw;
  height: 12.81vw;
  margin: 0 2.4vw 0 0;
  background: #ffffff;
  border-radius: 0.26vw;
  overflow: hidden;
}
.resultPic > img {
  width: 15.42vw;
  height: 12.81vw;
  object-fit: contain;
}
.resultInfo {
  width: 53.54vw;
  height: 12.81vw;
  display: flex;
  flex-direction: column;
}
.resultName_zh {
  /* width: 100%; */
  height: 1.61vw;
  margin: 0 0 1.35vw 0;
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #004ea2;
  line-height: 1.61vw;
  cursor: pointer;
}
.resultName_zh>span:hover {
    border-bottom: 3px solid #004ea2;
}
.resultName_en {
  width: 100%;
  height: 1.41vw;
  margin: 0 0 1.15vw 0;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 1.41vw;
}
.resultDetail {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
._data {
  width: 20.63vw;
  height: 0.94vw;
  margin: 0.83vw 0.21vw 0.83vw 0;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 0.94vw;
}
.addCart {
  position: absolute;
  width: 9.69vw;
  height: 2.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004ea2;
  font-size: 1.04vw;
  background: #ffffff;
  border-radius: 0.26vw;
  bottom: 1.56vw;
  right: 4.9vw;
  cursor: pointer;
}
.addCart > img {
  margin: 0 0 0 0.42vw;
  width: 1.72vw;
  height: 1.56vw;
}
.addCart:hover {
  text-decoration: underline;
}
</style>