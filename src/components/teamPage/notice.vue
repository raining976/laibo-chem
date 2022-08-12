//createDate:2022-08-05
<template>
  <div class="noticeBox"  >
    <div class="titleBox">
      <div class="title">{{$t('team.message')}}</div>
      <div class="btn" @click="allRead()">{{$t('team.read')}}</div>
    </div>
    <ul class="noticeList">
      <li class="eachNotice" v-for="(notice, index) in notices" :key="index">
        <div class="infoBox">
          <div class="userBox">
            <el-badge :is-dot="notice.isDot"
              ><i class="el-icon-user user"></i
            ></el-badge>
          </div>
          <div class="infoContent">
            <span>{{ notice.name }}{{ " " +$t('base.user')}}</span>
            <span>{{ notice.content }}</span>
            <span class="time">{{ notice.time }}</span>
          </div>
        </div>
        <div class="btnBox">
          <div class="btn ignore">{{$t('team.refuse')}}</div>
          <div class="btn agree">{{$t('team.agree')}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "notice",
  data() {
    return {
      notices: [
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022.8.5",
          isDot:true,
        },
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022年八月五日",
          isDot:false,
        },
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022年八月五日",
          isDot:true,
        },
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022年八月五日",
          isDot:false,
        },
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022年八月五日",
          isDot:true,
        },
        {
          name: "张三",
          content: "申请加入团队",
          time: "2022年八月五日",
          isDot:true
        },
      ],
    };

  },
  methods:{
    allRead(){
        console.log("我执行了")
        for (let i = 0;i < this.notices.length;i++ ){
            this.notices[i].isDot = false
        }
    }
  }
};
</script>
<style scoped>
.noticeBox {
  position: absolute;
  right: -30px;
  bottom: -630px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(500px - 34px);
  height: calc(610px - 40px);
  padding: 20px 17px;
  background: #ffffff;
  box-shadow: 0px 10px 21px 0px rgba(7, 2, 3, 0.2);
  border-radius: 10px;
  transition: all 0.3s;
}
.titleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 2px solid #eaeaec;
  margin-bottom: 20px;
}
.titleBox .title {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: #333333;
}
.titleBox .btn {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
  cursor: pointer;
}
.noticeList {
  height: calc(92px * 5 + 40px);
  overflow: auto;
  overflow-y: auto;
}
.noticeList::-webkit-scrollbar {
  width: 7px;
}
/* 设置滚动条里面的滑块样式 */
.noticeList::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #dfdfe1;
}
.eachNotice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 465px;
  height: 92px;
  background: #f7f7f7;
  border: 1px solid #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
}
.infoBox {
  display: flex;
  align-items: center;
}
.infoContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}
.infoContent span {
  margin: 2px 0;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333;
}
.infoContent .time {
  color: #999999;
}
.btnBox {
  display: flex;
}
.btnBox > .btn {
  margin-right: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
}
.btnBox .ignore {
  color: #999999;
}
.btnBox .agree {
  color: var(--color);
}
.noticeBox >>> .user {
  transform: scale(3);
  background: #e3f5ff;
  margin-left: 30px;
  border-radius: 5px;
}
.noticeBox >>> .el-badge__content.is-fixed.is-dot {
  right: -5px;
  top: -5px;
}
</style>