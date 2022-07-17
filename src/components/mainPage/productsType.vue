// 产品分类
<template>
  <div class="productsType">
    <div class="title"><span style="color: #004ea2">产品</span>分类</div>
    <div class="productTypeBox">
      <div class="productType" v-for="(item, index) in typeList" :key="index">
        <div class="productTypePic"><img :src="item.img" alt="" /><div class="shadow"></div></div>
        <div class="productTypeName">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "productsType",
  components: "",
  data() {
    return {
      typeList: [
        { img: require("../../assets/p1.png"), name: "低值易耗品" },
        { img: require("../../assets/p2.png"), name: "中间品" },
        { img: require("../../assets/p3.png"), name: "染料" },
      ],
    };
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
  overflow: hidden;
  /* 防止上下冲突 */
}
.title {
  width: 100%;
  height: 3.13vw;
  font-size: 3.13vw;
  margin: 3.85vw 0 3.13vw 0;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #000;
  line-height: 3.13vw;
  text-align: center;
}
.productTypeBox {
  width: 100%;
  display: flex;
  justify-content: center;
}
.productType {
  width: 23.44vw;
  height: 20.94vw;
  margin: 0 0.68vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.26vw;
  overflow: hidden;
}
.productTypePic {
  position: relative;
  width: 100%;
  height: 17.55vw;
  background-color: #fff;
  overflow: hidden;

}
.productTypePic > img {
  width: 23.44vw;
  height: 17.55vw;
  /* 让图片居中？ */
  /* text-align: center; */
  object-fit: contain;

  /*图片  */
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 23.44vw;
  height: 17.55vw;
  background-color: #000;
  opacity: 0;
 pointer-events: none;
   transition: all 0.6s;
}
/*遮罩 */
.productTypePic > img:hover + .shadow{
  opacity: 0.4;

}
.productTypeName {
  width: 100%;
  height: 3.44vw;
  line-height: 3.44vw;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
</style>