<template>
  <div class="carouselBox">
    <el-carousel trigger="click">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <div class="imgBox"><a :href="item.href"><img :src="item.pic" alt="" /></a></div>
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
        { pic: require("../../assets/93390700.png") ,href: "####"},
        { pic: require("../../assets/93390700.png") ,href: "####"},
        { pic: require("../../assets/93390700.png") ,href: "####"},
        { pic: require("../../assets/93390700.png") ,href: "####"},
      ],
    };
  },
  created() {
      this.$http
        .get("/banner", {
          params: {

          },
        })
        //回调函数
        .then((res) => {
          this.$data.imgList = res.data.data;
          console.log("ceshi", this.$data.imgList);
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>
<style scoped>
.carouselBox {
  width: 100%;
  height: 696.96px;
  overflow: hidden;
}
.carouselBox /deep/ .el-carousel {
  width: 100%;
  height: 696.96px;
  overflow: hidden;
}
/* /* 装轮播图的外层容器 */
.carouselBox /deep/ .el-carousel__container {
  width: 100%;
  height: 696.96px;
  overflow: hidden;
}
/* 装轮播图的容器 */
.carouselBox /deep/ .el-carousel-item {
  height: 696.96px;
  display: flex;
  justify-content: space-between;
}
/* 底部按钮 */
.carouselBox /deep/ .el-carousel__button {
  width: 19.97px;
  height: 19.97px;
  background-color: #999;
  border-radius: 50%;
}
/* 左右按钮 */
.carouselBox /deep/ .el-carousel__arrow {
  width: 100.03px;
  height: 100.03px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carouselBox /deep/ .el-icon-arrow-right,
.carouselBox /deep/ .el-icon-arrow-left {
  width: 49.92px;
  height: 49.92px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 针对箭头修改 */
.carouselBox /deep/ .el-icon-arrow-right::before {
  display: block;
  content: "";
  width: 49.92px;
  height: 49.92px;
  background: url("../../assets/箭头 右 (3).png");
  background-position: 100% auto;
  background-size: contain;
}
.carouselBox /deep/ .el-icon-arrow-left::before {
  display: block;
  content: "";
  width: 49.92px;
  height: 49.92px;
  background: url("../../assets/箭头 左 (3).png");
  background-position: 100% auto;
  background-size: contain;
}
/* ------ */
.imgBox {
  width: 100%;
  height: 696.96px;
}
.imgBox img {
  object-fit: cover;
  width: 100%;
  height: 696.96px;
}
</style>