// 公司简介
<template>
  <div class="profileBox">
    <div class="h">
      <div class="title">
        <span>公司介绍</span>
        <span class="line"></span>
        <span>COMPANY PROFILE</span>
      </div>
      <div class="subTitle">青岛莱博斯威仪电科技有限公司</div>
      <div class="info">
        <p>
          青岛莱博斯威仪电科技有限公司坐落于美丽的海滨城市青岛，地处青岛高科技工业园，是一家专业为高校、科研院所、企业技术中心等科研部门提供仪器设备及消耗品整体解决方案的现代化公司，以实验设备、耗材的代理采购、代理销售及仪器设备的检修、检测为主营业务。
        </p>
        <p>
          面对众多的同行竞争对手，公司突破传统的经营思路，努力探索便捷、高效、顺应现代社会需求的服务模式。通过选择优势、可靠、稳定的供应商，建立通畅的信息渠道，降低采购成本，与客户共同分享产品价格上的优势之外，公司重点以打造“LABSERVE”服务品牌为己任，强化服务管理，用服务帮助客户降低科研成本，提高研发效率和效益。通过驾起客户与供应商之间的直通车，充分发挥基于供应商与客户之间的桥梁作用，不断提升创造和实现“LABSERVE”品牌服务价值的能力。
        </p>
        <p>
          在挑战与机遇并存、社会分工越来越细的信息化时代，以独特的方式迎接竞争与挑战、追求卓越与领先是公司秉承的创业理念。我们相信，在充满活力的团队的持续努力下，“LABSERVE”服务品牌的影响力必将不断扩大！我们坚信，在广大科研部门和科技工作者的大力支持下，公司定将如您的科研事业一般走向更加辉煌的明天！
        </p>
      </div>
    </div>
  </div>
  <div class="regionDistribution">
    <div class="title">
      <span>业务覆盖图</span>
      <span class="line"></span>
      <span>OUR BUSINESS MAP</span>
    </div>
    <div class="map"><img :src="map" alt="" /></div>
  </div>
</template>
<script>
export default {
  name: "companyProfile",
  components: "",
  data() {
    return {
      map: require("../../assets/view.webp"),
    };
  },
};
</script>
<style scoped>
.profileBox {
  position: relative;
  background-image: url("../../assets/laibo.webp");
  background-size: cover;
  background-repeat: no-repeat;
}
.profileBox::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.h {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 44.79vw;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #ffffff;
  padding: 4.17vw 0;
}
.title > .line {
  display: inline-block;
  width: 0.52vw;
  height: 2.66vw;
  background: #ffffff;
  margin: 0 1.56vw;
}
.subTitle {
  font-size: 3.75vw;
  font-family: Source Han Serif CN;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2.86vw;
}
.info {
  width: 46.15vw;
  height: 21.09vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 300;
  color: #ffffff;
  line-height: 1.56vw;
}
.info > p{
  text-indent: 2em;
}

/* ----地图 */
.regionDistribution {
  width: 100%;
  height: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.regionDistribution .title {
  color: #333;
}
.regionDistribution .line {
  background: #333;
}
.map {
  width: 73.39vw;
  height: 42.01vw;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.map > img {
  width: 73.39vw;
  height: 39.01vw;
  object-fit: cover;
}
</style>