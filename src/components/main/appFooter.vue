<template>
  <div class="appFooter">
    <div class="h">
      <div class="contactUsBox">
        <div class="corpAddress">
          <div class="logoBox">
            <img src="../../assets/logo2.png" alt="" />
          </div>
          <div class="textBox">
            <p class="address">{{ corpAddress }}</p>
          </div>
        </div>
        <div class="contractUs">
          <h3 class="title">{{ contractUs }}</h3>
          <span class="line"></span>
          <div class="iconBox">
            <ul class="iconUl">
              <li class="eachIcon" v-for="(icon, index) in icons" :key="index">
                <img :src="icon.url" :title="icon.msg" :alt="icon.msg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="listBlock"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appFooter",
  data() {
    return {
      corpAddress:
        "公司统一社会信用代码为91370212671783368R，企业地址位于山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A，所属行业为批发业。",
      contractUs: "联系我们",
      icons: [
        {
          url: require("../../assets/youxiang.png"),
          msg: "email",
        },
        {
          url: require("../../assets/whatsapp.png"),
          msg: "email",
        },
        {
          url: require("../../assets/facebook.png"),
          msg: "email",
        },
        {
          url: require("../../assets/weixin.png"),
          msg: "email",
        },
        {
          url: require("../../assets/twitter.png"),
          msg: "email",
        },
      ],
    };
  },
};
</script>

<style scoped>
.appFooter {
  width: 100%;
  height: 555px;
  background: #f7f7f7;
}
.h {
  display: flex;
  justify-content: space-between;
  width: 72%;
  margin: 0 auto;
}
</style>
