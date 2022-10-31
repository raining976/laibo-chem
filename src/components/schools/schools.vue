//createDate:2022-10-28
<template>
  <div class="schools">
    <transition appear appear-active-class="fade">
      <div class="h">
        <ul class="schoolList">
          <span class="close" @click="$root.isShowSchools = false">
            <img src="../../assets/close.png" alt="">
          </span>
          <li
            v-for="(school, index) in schools"
            :key="index"
            class="eachSchool"
          >
            <img :src="school.url" alt="" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "schools",
  data() {
    return {
      schools: [
        {
          url: require("../../assets/schools/ouc.png"), // 海大
        },
        {
          url: require("../../assets/schools/jinandaxue.png"), // 暨南大学
        },
        {
          url: require("../../assets/schools/linyidaxue.png"), // 临沂大学
        },
        {
          url: require("../../assets/schools/nanfangkejidaxue.png"), // 南方科技大学
        },
        {
          url: require("../../assets/schools/ningxiadaxue.png"), // 宁夏大学
        },
        {
          url: require("../../assets/schools/qilugongyedaxue.png"), // 齐鲁工业大学
        },
        {
          url: require("../../assets/schools/qingdaodaxue.png"), // 青岛大学
        },
        {
          url: require("../../assets/schools/qingdaokejidaxue.png"), // 青岛科技大学
        },
        {
          url: require("../../assets/schools/qingdaonongyedaxue.png"), // 青岛农业大学
        },
        {
          url: require("../../assets/schools/shandongdaxue.png"), // 山东大学
        },
        {
          url: require("../../assets/schools/shandongkejidaxue.png"), // 山东科技大学
        },
        {
          url: require("../../assets/schools/shanghaihaishidaxue.png"), // 上海海事大学
        },
        {
          url: require("../../assets/schools/shiyoudaxue.png"), // 石油大学
        },
        {
          url: require("../../assets/schools/tianjindaxue.png"), // 天津大学
        },
        {
          url: require("../../assets/schools/xiamendaxue.png"), // 厦门大学
        },
        {
          url: require("../../assets/schools/zhongkeyuanhaiyangsuo.png"), // 中科院海洋所
        },
      ],
    };
  },
};
</script>
<style scoped>
.schools {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  /* background: rgba(0, 0, 0, 0.7); */

  z-index: 999;
}
.schoolList {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 5.21vw 7.81vw;
}
.close {
  position: absolute;
  right: 7.81vw;
  top: 4.17vw;
  color: #000;
  font-size: 1.24vw;
  cursor: pointer;
}
.close:hover{
    font-weight: 700;
}
.close img{
  width: 2.08vw;
  height: 2.08vw;
}
.schoolList li {
  margin: 0.78vw 1.3vw;
}

img {
  width: 159.94px;
  height: 159.94px;
}
.fade {
  animation: fadeUp 0.5s;
}
</style>