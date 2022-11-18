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
        data-aos="flip-right"
      >
        <div class="contentBox" @click="toSearchType(item.cate)">
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
      type: 0, // 中间体:0 实验用品:1 染料:2  化工产品:3
      typeList: [
        {
          pic: require("../../assets/zhongjianti.webp"),
          name_zh: "中间体",
          name_en: "INTERMEDIATES",
          cate: 1,
        },
        {
          pic: require("../../assets/111.webp"),
          name_zh: "染料",
          name_en: "DYES",
          cate:2,
        },
        {
          pic: require("../../assets/huagongchanpin.png"),
          name_zh: "化工产品",
          name_en: "CHEMICAL PRODUCTS",
          cate:3,
        },
        {
          pic: require("../../assets/shiyanyongpin.webp"),
          name_zh: "实验用品",
          name_en: "EXPERIMENTAL SUPPLIES",
          cate:1,
        },
      ],
    };
  },
  methods: {
    toSearchType(cate) {
      this.$router.push({
        path: "/searchResult",
        query: {
          whichType: cate, // 0:中间体 , 1:染料 , 3:实验用品
        },
      });
    },
  },
};
</script>
<style scoped>
.productsType {
  width: 100%;
  height: 38.13vw;
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
  font-size: 2.45vw;
  margin: 3.85vw 0 3.13vw 0;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #000;
  text-align: center;
}
.title > .line {
  display: inline-block;
  width: 0.52vw;
  height: 2.66vw;
  background: #333333;
  margin: 0 1.88vw;
}

/* 改 */
.productSortList {
  display: flex;
}
.productSortList > li {
  position: relative;
  width: 20.1vw;
  height: 25.83vw;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.26vw;
  margin: 0 0.73vw;
  transition: 0.3s;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0.31vw 0.31vw 1.25vw 0vw rgb(0 12 52 / 13%);
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
  width: 14.9vw;
  height: 20.63vw;
  padding: 2.6vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  transition: 0.3s;
  border-radius: 0.26vw;
}
.productSortList > li:hover {
  transform: scale(1.02);
  box-shadow: 0.31vw 0.31vw 1.25vw 0.2vw rgb(0 12 52 / 23%);
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
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333;
  margin: 0.52vw 0;
  white-space: nowrap;
}
.productSortList .textBox {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1.88vw;
}
.productSortList img {
  width: 15.26vw;
  height: 15.78vw;
  background: #ffffff;
  border-radius: 0.26vw;
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
  left: -1.77vw;
  width: 1.3vw;
  height: 1.3vw;
  transition: 0.3s;
}
.productSortList > li:hover .btnBox::after {
  background-image: url("../../assets/lan.png");
}
.btnBox > span {
  right: 0;
  position: absolute;
  width: 2.19vw;
  height: 1.25vw;
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
  width: 1.25vw;
  height: 1.25vw;
}
</style>