<template>
  <div class="logIn">
    <div class="content" ref="logInContent">
      <h2 class="title">用户登录</h2>

      <div class="inputBox">
        <input type="text" class="email" :placeholder="inputEmail" />
      </div>
      <div class="inputBox">
        <input
          type="text"
          class="Verification"
          :placeholder="inputVerification"
        />
        <span class="getCodeBtn">获取验证码</span>
      </div>
      <div class="psd_register">
        <span class="psdLogIn">密码登录</span>
        <span class="register">立即注册 </span>
      </div>
      <div class="logInBtn">登录</div>
      <div class="forgotPsd">忘记密码?</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "logIn",
  data() {
    return {
      inputEmail: "请输入邮箱",
      inputVerification: "请输入验证码",
    };
  },

  mounted() {
    // 监听鼠标点击  点击位置为登录之外,则关闭登录页
    document.addEventListener("mousedown", (e) => {
      let logIn = this.$refs.logInContent;
      if (!e.path.includes(logIn)) {
        this.$parent.isShowLogIn = false;
      } else this.$parent.isShowLogIn = true;
    });
  },
  methods: {},
};
</script>

<style scoped>
.logIn {
  width: 100vw;
  height: 100vh;
  background: rgba(16, 16, 16, 0.47);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 546px;
  height: 425px;
  padding-top: 58px;
  padding-bottom: 148px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 24px -1px #919191;
  --webkit-box-shadow: 0px 1px 24px -1px #919191;
  --moz-box-shadow: 0px 1px 24px -1px #919191;
  margin-top: 10vh;
}
.title {
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #004ea2;
}
.inputBox {
  width: 395px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}
input {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  padding-left: 20px;
}

input::-webkit-input-placeholder {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
}
.email {
  width: 375px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}
.Verification {
  width: 250px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}

.getCodeBtn {
  height: 33px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  border-left: 1px solid #999999;
  padding-left: 12px;
  cursor: pointer;
}
.psd_register {
  display: flex;
  justify-content: space-between;
  width: 395px;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
.psdLogIn {
  color: #004ea2;
  cursor: pointer;
}

.register {
  color: #333333;
  cursor: pointer;
}
.logInBtn {
  width: 394px;
  height: 61px;
  background: #004ea2;
  border-radius: 5px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 61px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.logInBtn:hover {
  box-shadow: 0px 4px 16px -6px #004ea2;
  --webkit-box-shadow: 0px 4px 16px -6px #004ea2;
  --moz-box-shadow: 0px 4px 16px -6px #004ea2;
}
.forgotPsd {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
  cursor: pointer;
}
</style>