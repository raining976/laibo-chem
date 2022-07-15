<template>
  <div class="adminLogIn">
    <div class="contentBox">
      <div class="leftContent">
        <div class="formBox">
          <div class="userIdBox">
            <input
              type="text"
              class="userId bigInput"
              placeholder="请输入管理员账号"
            />
          </div>
          <div class="userPsdBox">
            <input
              type="password"
              class="userPsd bigInput"
              placeholder="请输入密码"
            />
          </div>
          <div class="verifyBox">
            <input
              type="text"
              class="verify littleInput"
              placeholder="请输入验证码"
            />
            <div class="verifyImgBox">验证码图片</div>
          </div>
          <div class="logInBtn">立即登录</div>
        </div>
      </div>
      <div class="rightContent">
        <h3 class="title">LAIBO CHEM</h3>
        <h3 class="subTitle">后台管理系统</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminLogIn",
};
</script>

<style  scoped>
.adminLogIn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #666;
}
.contentBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 902px;
  height: 457px;
  background: rgba(255, 255, 255, 0.42);
  border-radius: 5px;
  box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
  --webkit-box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
  --moz-box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
}
.leftContent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 437px;
  height: 427px;
  background: #ffffff;
  border-radius: 5px 0px 0px 5px;
}
.formBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 318px;
  height: 260px;
}
.formBox > div {
  height: 45px;
}
input {
  padding: 0 18px;
  height: 45px;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 18px;
}
input::-webkit-input-placeholder {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
input::-moz-placeholder {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.bigInput {
  width: 282px;
}
.littleInput {
  width: 134px;
}
.verifyBox {
  display: flex;
  justify-content: space-between;
}
.verifyImgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 113px;
  height: 44px;
  background: #f1f1f1;
}
.logInBtn {
  width: 318px;
  background: linear-gradient(-90deg, #006ab9 0%, #b49b8c 100%);
  border-radius: 5px;
  font-size: 19px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  transition: 0.3s;
}
.logInBtn:hover {
  box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
  --webkit-box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
  --moz-box-shadow: 0px 8px 32px -8px rgba(31, 38, 135, 0.4);
}

.rightContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 58px;
  width: 321px;
  height: 367px;
  background: linear-gradient(236deg, #006bb9 0%, #b49b8c 99%);
  border-radius: 0px 5px 5px 0px;
}
.rightContent > h3 {
  margin-top: 58px;
}
.title {
  font-size: 50px;
  font-family: Georgia;
  font-weight: 400;
  color: #ffffff;
}
.subTitle {
  font-size: 36px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #ffffff;
}
</style>