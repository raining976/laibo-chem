// 产品分类
<template>
  <div class="productsType">
    <div class="title">
      <span>产品分类</span>
      <span class="line"></span>
      <span>OUR PRODUCTS</span>
    </div>
    <ul class="productSortList">
      <li
        v-for="(item, index) in typeList"
        :key="index"
        :style="{ backgroundImage: 'url(' + item.pic + ')' }"
      >
        <div class="contentBox" @click="toSearchType(index)">
          <div class="imgBox"><img :src="item.pic" alt="item.alt" /></div>
          <div class="textBox">
            <div class="text">
              <h3>{{ item.name_zh }}</h3>
              <h3>{{ item.name_en }}</h3>
            </div>
            <div class="btnBox">
              <span class="btn1"></span>
              <span class="btn2"></span>
              <span class="btn3"></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "productsType",
  components: "",
  data() {
    return {
      type: 0, // 中间体:0 实验用品:1 染料:2  定制产品:3
      typeList: [
        {
          pic: require("../../assets/zhongjianti.png"),
          name_zh: "中间体",
          name_en: "INTERMEDIATES",
        },
        {
          pic: require("../../assets/111.jpg"),
          name_zh: "染料",
          name_en: "DYES",
        },
        {
          pic: require("../../assets/p1.png"),
          name_zh: "实验用品",
          name_en: "EXPERIMENTAL SUPPLIES",
        },
        {
          pic: require("../../assets/dingzhichanpin.png"),
          name_zh: "定制产品",
          name_en: "CUSTOMIZED PRODUCTS",
        },
      ],
    };
  },
  methods: {
    toSearchType(idx) {
      if (idx < 3) {
        this.$router.push({
          path: "/searchResult",
          query: {
            whichType: idx,
          },
        });
      } else if (idx == 3) {
        // 定制铲平
      }
    },
  },
};
</script>
<style scoped>
.productsType {
  width: 100%;
  height: 732.1px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 47px;
  margin: 73.92px 0 60.1px 0;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #000;
  text-align: center;
}
.title > .line {
  display: inline-block;
  width: 10px;
  height: 51px;
  background: #333333;
  margin: 0 36px;
}

/* 改 */
.productSortList {
  display: flex;
}
.productSortList > li {
  position: relative;
  width: 386px;
  height: 496px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  margin: 0 14px;
  transition: 0.3s;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.productSortList > li::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
}
.productSortList > li .contentBox {
  width: 286px;
  height: 396px;
  padding: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  transition: 0.3s;
}
.productSortList > li:hover .contentBox {
  background-color: rgba(40, 103, 180, 0.8);
}
.productSortList > li:hover .text h3 {
  color: #ffffff;
}
.productSortList > li:hover .btnBox > span {
  background: #ffffff;
}
.productSortList > li .text h3 {
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  white-space: nowrap;
}
.productSortList .textBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 36px;
}
.productSortList img {
  width: 293px;
  height: 303px;
  background: #ffffff;
  border-radius: 5px;
}
.btnBox {
  position: relative;
}
.btnBox::after {
  position: absolute;
  content: "";
  background-image: url("../../assets/bai.png");
  display: inline-block;
  background-size: cover;
  left: -34px;
  width: 25px;
  height: 25px;
  transition: 0.3s;
}
.productSortList > li:hover .btnBox::after {
  background-image: url("../../assets/lan.png");
}
.btnBox > span {
  right: 0;
  position: absolute;
  width: 42px;
  height: 24px;
  background-color: #2867b4;
  transition: 00.3s;
}
.btnBox .btn2 {
  transform: rotate(60deg);
}
.btnBox .btn3 {
  transform: rotate(-60deg);
}
.btnBox img {
  width: 24px;
  height: 24px;
}
</style>