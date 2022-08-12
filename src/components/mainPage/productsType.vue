// 产品分类
<template>
  <div class="productsType">
    <div class="title">
      <span style="color: #004ea2">{{ $t("home.product") }}</span
      >{{ $t("home.sort") }}
    </div>
    <div class="productTypeBox">
      <div class="productType" v-for="(item, index) in typeList" :key="index">
        <div class="productTypePic">
          <img :src="item.img" alt="" />
          <div class="shadow"></div>
        </div>
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
  height: 732.1px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  /* 防止上下冲突 */
}
.title {
  width: 100%;
  height: 60.1px;
  font-size: 60.1px;
  margin: 73.92px 0 60.1px 0;
  font-family: Source Han Sans SC VF;
  font-weight: bold;
  color: #000;
  line-height: 60.1px;
  text-align: center;
}
.title>span{
  margin-right: 10px;
}
.productTypeBox {
  width: 100%;
  display: flex;
  justify-content: center;
}
.productType {
  width: 450.05px;
  height: 402.05px;
  margin: 0 13.06px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4.99px;
  overflow: hidden;
}
.productTypePic {
  position: relative;
  width: 100%;
  height: 336.96px;
  background-color: #fff;
  overflow: hidden;
}
.productTypePic > img {
  width: 450.05px;
  height: 336.96px;
  /* 让图片居中？ */
  /* text-align: center; */
  object-fit: contain;

  /*图片  */
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 450.05px;
  height: 336.96px;
  background-color: #000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s;
}
/*遮罩 */
.productTypePic > img:hover + .shadow {
  opacity: 0.4;
}
.productTypeName {
  width: 100%;
  height: 66.05px;
  line-height: 66.05px;
  background-color: #2867b4;
  color: #fff;
  text-align: center;
}
</style>