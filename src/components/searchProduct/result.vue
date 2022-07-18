<template>
    <div>
      <div class="tip">查到一下几种结果：</div>
      <div class="resultBox">
        <!-- v-for模块 -->
        <div class="result" v-for="(item, index) in resultBox" :key="index">
          <div class="resultPic"><img :src="item.pic" alt="" /></div>
          <div class="resultInfo">
            <div class="resultName_zh" @click="toProductInfo()">
              <span>{{ item.name_zh }}</span>
            </div>
            <div class="resultName_en">英文名：{{ item.name_en }}</div>
            <div class="resultDetail">
              <!-- v-for模块 -->

              <div class="huohao _data">货号：{{ item.huohao }}</div>
              <div class="jiegoushi _data">结构式：{{ item.jiegoushi }}</div>
              <div class="CAScode _data">CAS编码：{{ item.casCode }}</div>
              <div class="MDLcode _data">MDL号：{{ item.mdlCode }}</div>
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
  name: "result",
  components: "",
  data() {
    return {
      resultBox: [
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
        {
          pic: require("../../assets/p22.png"),
          name_zh: "2-(三丁基锡)-5-三氟甲基吡啶",
          name_en: "2-(tributylstannyl)-5-(trifluoromethyl)pyridine",
          huohao: "",
          jiegoushi: "",
          casCode: "",
          mdlCode: "",
        },
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

/* 下面是搜索结果的样式 */
.tip {
  width: 1120px;
  height: 20px;
  font-size: 16px;
  margin: 14px 0 24.96px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.resultBox {
  width: 1120px;
  overflow: hidden;
}
.result {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1120px;
  height: 187px;
  margin: 0 0 15px 0;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f7f7f7;
}
.resultPic {
  width: 160px;
  height: 160px;
  margin: 0 64px 0 0;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}
.resultPic > img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}
.resultInfo {
  width: 860px;
  height: 160px;
  display: flex;
  flex-direction: column;
}
.resultName_zh {
  /* width: 100%; */
  height: 21px;
  margin: 0 0 13px 0;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #004ea2;
  line-height: 21px;
  cursor: pointer;
}
.resultName_zh > span:hover {
  border-bottom: 2px solid #004ea2;
}
.resultName_en {
  /* width: 100%; */
  height: 20px;
  margin: 0 0 17px 0;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.resultDetail {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
._data {
  width: 260px;
  height: 15px;
  margin: 8px 4px 8px 0;
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 15px;
}
.addCart {
  position: absolute;
  width: 132px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004ea2;
  font-size: 14px;
  background: #ffffff;
  border-radius: 5px;
  bottom: 34px;
  right: 54px;
  cursor: pointer;
}
.addCart > img {
  margin: 0 0 0 8.06px;
  width: 23px;
  height: 20px;
}
.addCart:hover {
  text-decoration: underline;
}
</style>