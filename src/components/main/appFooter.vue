<template>
  <div class="appFooter">
    <div class="h">
      <div class="contactUsBox">
        <!-- 地址部分 -->
        <div class="corpAddress">
          <div class="logoBox">
            <img src="../../assets/logo2.png" alt="" />
          </div>
          <div class="textBox">
            <p class="address">{{ corpAddress }}</p>
          </div>
        </div>
        <!-- /地址部分 -->
        <!-- 联系我们部分 -->
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
        <!-- /联系我们部分 -->
      </div>
      <!-- 右侧列表部分 -->
      <div class="listBlock">
        <!-- 技术研发 -->
        <ul class="eachMenu tech">
          <h2 class="menuTitle">{{ tech }}</h2>
          <span class="line"></span>
          <li class="menuLi" v-for="(tech, index) in techs" :key="index">
            {{ tech.name }}
          </li>
        </ul>
        <!-- /技术研发 -->
        <!-- 合作高校 -->
        <ul class="eachMenu cooperationSchool">
          <h2 class="menuTitle">{{ cooperationSchool }}</h2>
          <span class="line"></span>
          <li class="menuLi" v-for="(school, index) in schools" :key="index">
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
        <!-- 人才招聘 -->
        <ul class="eachMenu joinUS">
          <h2 class="menuTitle">{{ joinUS }}</h2>
          <span class="line"></span>
          <li class="menuLi" v-for="(join, index) in joins" :key="index">
            {{ join.name }}
          </li>
        </ul>
        <!-- /人才招聘 -->
      </div>
      <!-- /右侧列表部分 -->
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
      tech: "技术研发",
      cooperationSchool: "合作高校",
      aboutUs: "关于我们",
      joinUS: "人才招聘",
      // 技术研发
      techs: [
        {
          name: "中间品",
        },
        {
          name: "低值消耗品",
        },
      ],
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
          icon: require("../../assets/dizhi.png"),
          text: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
      ],
      // 人才招聘
      joins: [
        {
          name: "人才自荐",
        },
        {
          name: "公司近况介绍",
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
.h > div {
  margin-top: 45px;
}
.corpAddress {
  width: 319px;
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.textBox {
  margin-top: 20px;
}
.contractUs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 240px;
  height: 110px;
  margin-top: 80px;
}
.line {
  width: 33px;
  height: 1px;
  background: var(--color);
  border: 1.5px solid var(--color);
}
.iconUl {
  display: flex;
  justify-content: space-between;
  width: 230px;
}
.eachIcon {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 24px;
}
.eachIcon:hover {
  transform: scale(1.1);
  box-shadow: 0px 1px 24px -9px #919191;
  --webkit-box-shadow: 0px 1px 24px -9px #919191;
  --moz-box-shadow: 0px 1px 24px -9px #919191;
}
.listBlock {
  width: 750px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.eachMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
}
.menuTitle {
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 27px;
}
.menuLi {
  display: flex;
  margin-top: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.menuLi img {
  margin-right: 16px;
}
.cooperationSchool .menuLi:last-child{
  cursor: pointer;
  color: #383838;
}
</style>
