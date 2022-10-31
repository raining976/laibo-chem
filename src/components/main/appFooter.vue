<template>
  <div class="appFooter">
    <div class="h">
      <!-- 左侧列表部分 -->
      <div class="listBlock">
        <!-- 人才招聘 -->
        <ul class="eachMenu joinUS">
          <h2 class="menuTitle">{{ joinUS }}</h2>
          <span class="line"></span>
          <li class="menuLi" v-for="(join, index) in joins" :key="index">
            <a href="mailto:hr@laibochem.com">
            {{ join.name }}
           </a>
          </li>
        </ul>
        <!-- /人才招聘 -->
        <!-- 合作高校 -->
        <ul class="eachMenu cooperationSchool">
          <h2 class="menuTitle">{{ cooperationSchool }}</h2>
          <span class="line"></span>
          <li
            class="menuLi"
            v-for="(school, index) in schools"
            :key="index"
            @click="checkAll(school.name)"
          >
            {{ school.name }}
          </li>
        </ul>
        <!-- /合作高校 -->
        <div class="contactUsBox">
          <!-- 联系我们部分 -->
          <div class="contractUs">
            <h3 class="title">{{ contractUs }}</h3>
            <div class="iconBox">
              <ul class="iconUl">
                <li
                  class="eachIcon"
                  v-for="(icon, index) in icons"
                  :key="index"
                >
                  <img :src="icon.url" :title="icon.msg" :alt="icon.msg" />
                </li>
              </ul>
            </div>
            <!-- 关于我们 -->
            <ul class="eachMenu aboutUs">
              <!-- <h2 class="menuTitle">{{ aboutUs }}</h2> -->
              <span class="line"></span>
              <li class="menuLi" v-for="(info, index) in infos" :key="index">
                <div class="imgBox"><img :src="info.icon" alt="" /></div>
                <span class="infoText">{{ info.text }}</span>
              </li>
            </ul>
            <!-- /关于我们 -->
          </div>
          <!-- /联系我们部分 -->
        </div>
      </div>

      <!-- /左侧列表部分 -->
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
      contractUs: this.$t("footer.contactUs"),
      icons: [
        {
          url: require("../../assets/youxiang.png"),
          msg: "Email",
        },
        {
          url: require("../../assets/whatsapp.png"),
          msg: "WhatsApp",
        },
        {
          url: require("../../assets/facebook.png"),
          msg: "Facebook",
        },
        {
          url: require("../../assets/weixin.png"),
          msg: "WeChat",
        },
        {
          url: require("../../assets/twitter.png"),
          msg: "Twitter",
        },
      ],
      cooperationSchool: this.$t("footer.schools"),
      aboutUs: this.$t("footer.aboutUs"),
      joinUS: this.$t("footer.joinUs"),
      // 合作高校
      schools: [
        {
          name: this.$t("footer.ouc"),
        },
        {
          name: this.$t("footer.tjdx"),
        },
        {
          name: this.$t("footer.sddx"),
        },
        {
          name: this.$t("footer.hebgydx"),
        },
        {
          name: this.$t("footer.more") + ">",
        },
      ],
      // 关于我们
      infos: [
        {
          icon: require("../../assets/phone.png"),
          text: this.$t('footer.phone'),
        },
        {
          icon: require("../../assets/youxiang2.png"),
          text: this.$t('footer.email'),
        },
        {
          icon: require("../../assets/youxiang2.png"),
          text: "postmaster@laibochem.com",
        },
        {
          icon: require("../../assets/dizhi.png"),
          text: this.$t("footer.address"),
        },
      ],
      // 人才招聘
      joins: [
        {
          name: this.$t("footer.recommendation"),
        },
      ],
    };
  },
  methods: {
    checkAll(str) {
      if (str != this.$t("footer.more") + ">") return;
      this.$root.isShowSchools = true;
      console.log("school");
    },
  },
};
</script>

<style scoped>
.appFooter {
  width: 100%;
  height: 25.35vw;
  background: #f7f7f7;
}
.h {
  display: flex;
  justify-content: space-between;
  padding: 0 7.92vw;
  margin: 0 auto;
}
.h > div {
  margin-top: 4.43vw;
}
.corpAddress {
  width: 16.61vw;
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.textBox {
  margin-top: 1.04vw;
}
.contractUs {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 17.19vw;
}
.contractUs .title {
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  width: 13.65vw;
  height: 4.74vw;
  background: #004ea2;
  border-radius: 2.34vw;
  text-align: center;
  line-height: 4.74vw;
  color: #fff;
  margin-bottom: 2.34vw;
  /* cursor: pointer; */
}
.iconUl {
  display: flex;
  justify-content: space-between;
  width: 11.98vw;
}
.eachIcon {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 1.25vw;
  width: 2.08vw;
  height: 2.08vw;
}
.eachIcon:hover {
  transform: scale(1.1);
  box-shadow: 0vw 0.05vw 1.25vw -0.47vw #919191;
  --webkit-box-shadow: 0vw 0.05vw 1.25vw -0.47vw #919191;
  --moz-box-shadow: 0vw 0.05vw 1.25vw -0.47vw #919191;
}
.listBlock {
  width: 80.44vw;
  display: flex;
  justify-content: space-between;
}
.eachMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 16.15vw;
}
.eachMenu .menuTitle {
    font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;

  height: 4.74vw;
  background: #004ea2;
  border-radius: 2.34vw;
  text-align: center;
  line-height: 4.74vw;
  color: #fff;

  font-family: Microsoft YaHei UI;
  font-weight: bold;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  margin-bottom: 1.41vw;
  background: var(--color);
}
.menuLi {
  display: flex;
  margin-top: 0.99vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  margin-left: 1.04vw;
}
.menuLi img {
  margin-right: 0.83vw;
}
.cooperationSchool .menuLi:last-child {
  cursor: pointer;
  color: #383838;
}
.cooperationSchool .menuLi:last-child:hover {
  font-weight: 700;
}
.eachIcon img {
  width: 2.08vw;
  height: 2.08vw;
}
.aboutUs{
  margin-left: 2.6vw;
}
</style>
