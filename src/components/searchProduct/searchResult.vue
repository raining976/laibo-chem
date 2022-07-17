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
  width: 1410.05px;
  height: 0.96px;
  border-bottom: 0.96px solid #999999;
  margin: 0 auto;
}
.tip {
  width: 1410.05px;
  height: 24px;
  font-size: 24px;
  margin: 29.95px 0 24.96px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 24px;
}
.resultBox {
  width: 1410.05px;
  overflow: hidden;
}
.result {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1410.05px;
  height: 300.1px;
  margin: 0 0 19.97px 0;
  border-radius: 4.99px;
  overflow: hidden;
  background-color: #f7f7f7;
}
.resultPic {
  width: 296.06px;
  height: 245.95px;
  margin: 0 46.08px 0 0;
  background: #ffffff;
  border-radius: 4.99px;
  overflow: hidden;
}
.resultPic > img {
  width: 296.06px;
  height: 245.95px;
  object-fit: contain;
}
.resultInfo {
  width: 1027.97px;
  height: 245.95px;
  display: flex;
  flex-direction: column;
}
.resultName_zh {
  /* width: 100%; */
  height: 30.91px;
  margin: 0 0 25.92px 0;
  font-size: 29.95px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #004ea2;
  line-height: 30.91px;
  cursor: pointer;
}
.resultName_zh>span:hover {
    border-bottom: 3px solid #004ea2;
}
.resultName_en {
  width: 100%;
  height: 27.07px;
  margin: 0 0 22.08px 0;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 27.07px;
}
.resultDetail {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
._data {
  width: 396.1px;
  height: 18.05px;
  margin: 15.94px 4.03px 15.94px 0;
  font-size: 18.05px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 18.05px;
}
.addCart {
  position: absolute;
  width: 186.05px;
  height: 49.92px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004ea2;
  font-size: 19.97px;
  background: #ffffff;
  border-radius: 4.99px;
  bottom: 29.95px;
  right: 94.08px;
  cursor: pointer;
}
.addCart > img {
  margin: 0 0 0 8.06px;
  width: 33.02px;
  height: 29.95px;
}
.addCart:hover {
  text-decoration: underline;
}
</style>