<template>
  <div class="carouselBox">
    <el-carousel trigger="click" >
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <div class="imgBox"><img :src="item.img" alt="" /></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "",
  components: "",
  data() {
    return {
      imgList: [
        { img: require("../../assets/93390700.png") },
        { img: require("../../assets/93390700.png") },
      ],
    };
  },
};
</script>
<style scoped>
.carouselBox {
  width: 100%;
  height: 36.3vw;
  overflow: hidden;
}
/deep/ .el-carousel {
  width: 100%;
   height: 36.3vw;
   overflow: hidden;
}
/* /* 装轮播图的外层容器 */
/deep/ .el-carousel__container {
  width: 100%;
  height: 36.3vw;
  overflow: hidden;
}
/* 装轮播图的容器 */
/deep/ .el-carousel-item {
  height: 36.3vw;
  display: flex;
  justify-content: space-between;
}
/* 底部按钮 */
/deep/ .el-carousel__button {
  width: 1.04vw;
  height: 1.04vw;
  background-color: #999;
  border-radius: 50%;
}
/* 左右按钮 */
/deep/ .el-carousel__arrow {
  width: 5.21vw;
  height: 5.21vw;
  display: flex;
   justify-content: center;
   align-items: center;
}
/deep/ .el-icon-arrow-right, /deep/ .el-icon-arrow-left {
   width: 2.6vw;
   height: 2.6vw;
   display: flex;
   justify-content: center;
   align-items: center;
}
/* 针对箭头修改 */
/deep/ .el-icon-arrow-right::before {
display: block;
 content: "";
 width: 2.6vw;;
 height: 2.6vw;
 background: url('../../assets/箭头 右 (3).png');
 background-position: 100% auto;
 background-size: contain;
}
/deep/ .el-icon-arrow-left::before {
  display: block;
 content: "";
 width: 2.6vw;;
 height: 2.6vw;
 background: url('../../assets/箭头 左 (3).png');
 background-position: 100% auto;
 background-size: contain;
}
/* ------ */
.imgBox {
  width: 100%;
  height: 36.3vw;
}
.imgBox img {
  object-fit: cover;
  width: 100%;
  height: 36.3vw; 
}
</style>