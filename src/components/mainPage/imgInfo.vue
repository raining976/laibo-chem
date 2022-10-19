<template>
  <div class="carouselBox">
    <el-carousel trigger="click" v-if="imgList[0]">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <div class="imgBox">
          <div
            class="imgBox"
            :style="{ backgroundImage: 'url(' + item.pic_url + ')' }"
          >
            <div class="textBox">
              <div class="text_en">{{ item.text_en }}</div>
              <div class="text_zh">{{ item.text_zh }}</div>
            </div>
          </div>
        </div>
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
        {
          pic_url: require("../../assets/laibo.png"),
          text_en: "LAIBO CHEM",
          text_zh: "青岛莱博斯威仪电科技有限公司",
        },
        {
          pic_url: require("../../assets/zhuanye.png"),
          text_en: "SPECIALTY",
          text_zh: "专业",
        },
        {
          pic_url: require("../../assets/chuangxin.png"),
          text_en: "INNOVATION",
          text_zh: "创新",
        },
        {
          pic_url: require("../../assets/gongying.png"),
          text_en: "MUTUAL BENEFITS",
          text_zh: "共赢",
        },
      ],
    };
  },
  mounted() {
    // this.$http
    //   .get("/banner", {
    //     params: {},
    //   })
    //   //回调函数
    //   .then((res) => {
    //     this.$data.imgList = res.data.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  methods: {},
};
</script>
<style scoped>
.carouselBox {
  width: 100%;
  height: 1080px;
  overflow: hidden;
}
.carouselBox >>> .el-carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* /* 装轮播图的外层容器 */
.carouselBox >>> .el-carousel__container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* 装轮播图的容器 */
.carouselBox >>> .el-carousel-item {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
/* 底部按钮 */
.carouselBox >>> .el-carousel__button {
  width: 19.97px;
  height: 19.97px;
  background-color: #999;
  border-radius: 50%;
}
/* 左右按钮 */
.carouselBox >>> .el-carousel__arrow {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.27);
}
.carouselBox >>> .el-carousel__arrow:hover {
  background: rgba(0, 0, 0, 0.47);
}
.carouselBox >>> .el-icon-arrow-right,
.carouselBox >>> .el-icon-arrow-left {
  width: 49.92px;
  height: 49.92px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 针对箭头修改 */
.carouselBox >>> .el-icon-arrow-right::before {
  display: block;
  content: "";
  width: 49.92px;
  height: 49.92px;
  background-image: url("../../assets/箭头 右 (3).png");
  background-position: 100% auto;
  background-size: contain;
}
.carouselBox >>> .el-icon-arrow-left::before {
  display: block;
  content: "";
  width: 49.92px;
  height: 49.92px;
  background-image: url("../../assets/箭头 左 (3).png");
  background-position: 100% auto;
  background-size: contain;
}
/* ------ */
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
.imgBox::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 69, 153, 0.3);
}
.imgBox .textBox {
  position: relative;
  z-index: 2;
}
.imgBox .textBox > div {
  font-size: 100px;
  font-family: Georgia;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.carouselBox >>> .el-carousel__arrow--left {
  left: 180px !important;
}
.carouselBox >>> .el-carousel__arrow--right {
  right: 180px !important;
}

/* 轮播图下方按钮 */
.carouselBox >>> li.el-carousel__indicator,
.carouselBox >>> .el-carousel__indicator .el-carousel__button {
  width: 60px;
  height: 10px;
  background: #999999;
  border-radius: 2px;
  padding: 0;
}
.carouselBox >>> li.el-carousel__indicator {
  margin: 0 5px;
}
.carouselBox >>> li.el-carousel__indicator.is-active .el-carousel__button,
.carouselBox >>> li.el-carousel__indicator:hover .el-carousel__button {
  background: var(--color);
}
.carouselBox >>> .el-carousel__indicators {
  margin-bottom: 100px;
}
</style>