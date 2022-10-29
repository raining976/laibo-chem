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
            {{ join.name }}
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
        <!-- 关于我们 -->
        <ul class="eachMenu aboutUs">
          <h2 class="menuTitle">{{ aboutUs }}</h2>
          <span class="line"></span>
          <li class="menuLi" v-for="(info, index) in infos" :key="index">
            <div class="imgBox"><img :src="info.icon" alt="" /></div>
            <span class="infoText">{{ info.text }}</span>
          </li>
        </ul>
        <!-- /关于我们 -->
      </div>
      <!-- /左侧列表部分 -->
      <div class="contactUsBox">
        <!-- 地址部分 -->
        <!-- <div class="corpAddress">
          <div class="logoBox">
            <img src="../../assets/logo2.png" alt="" />
          </div>
          <div class="textBox">
            <p class="address">{{ corpAddress }}</p>
          </div>
        </div> -->
        <!-- /地址部分 -->
        <!-- 联系我们部分 -->
        <div class="contractUs">
          <h3 class="title">{{ contractUs }}</h3>
          <div class="iconBox">
            <ul class="iconUl">
              <li class="eachIcon" v-for="(icon, index) in icons" :key="index">
                <img :src="icon.url" :title="icon.msg" :alt="icon.msg" />
              </li>
            </ul>
          </div>
        </div>
        <!-- /联系我们部分 -->
      </div>
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
      cooperationSchool: "合作高校",
      aboutUs: "关于我们",
      joinUS: "人才招聘",
      // 合作高校
      schools: [
        {
          name: "中国海洋大学",
        },
        {
          name: "天津大学",
        },
        {
          name: "山东大学",
        },
        {
          name: "哈尔滨工业大学",
        },
        {
          name: "更多>",
        },
      ],
      // 关于我们
      infos: [
        {
          icon: require("../../assets/phone.png"),
          text: "13969851271",
        },
        {
          icon: require("../../assets/youxiang2.png"),
          text: "labservice@188.com",
        },
        {
          icon: require("../../assets/youxiang2.png"),
          text: "postmaster@laibochem.com",
        },
        {
          icon: require("../../assets/dizhi.png"),
          text: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
      ],
      // 人才招聘
      joins: [
        {
          name: "人才自荐",
        },
      ],
    };
  },
  methods: {
    checkAll(str) {
      if (str != "更多>") return;
      this.$root.isShowSchools = true;
      console.log("school")
    },
  },
};
</script>

<style scoped>
.appFooter {
  width: 100%;
  height: 21.35vw;
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
  cursor: pointer;
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
  width: 48.44vw;
  display: flex;
  justify-content: flex-start;
}
.eachMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 16.15vw;
}
.menuTitle {
  font-size: 1.35vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 1.41vw;
}
.menuLi {
  display: flex;
  margin-top: 0.99vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.menuLi img {
  margin-right: 0.83vw;
}
.cooperationSchool .menuLi:last-child {
  cursor: pointer;
  color: #383838;

}
.cooperationSchool .menuLi:last-child:hover{
    font-weight: 700;
}
.eachIcon img {
  width: 2.08vw;
  height: 2.08vw;
}
</style>
