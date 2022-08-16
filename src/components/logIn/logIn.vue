<template>
  <div class="logIn">
    <div class="content" ref="logInContent">
      <div class="logInBox" v-show="isLogIn">
        <h2 class="title" ref="title">{{ $t("logIn.userLogIn") }}</h2>
        <!-- 邮箱表单部分 -->
        <div class="inputBox" data-after="">
          <input
            type="text"
            class="email"
            :placeholder="$t('logIn.emailTip')"
            v-model="logInForm.email"
            @blur="checkEmail($event)"
          />
        </div>
        <!-- /邮箱表单部分 -->
        <!-- 验证码或密码部分  -->
        <div class="inputBox verificationBox" data-after="">
          <input
            ref="psd_verification"
            type="text"
            class="verification"
            :placeholder="inputVerification"
            v-model="logInForm.psd"
            @blur="checkVerification($event)"
          />
          <span class="getCodeBtn" v-show="!isPsdLogin" @click="getCode()">{{
            $t("logIn.verifyBtn")
          }}</span>
          <span class="getCodeBtn" v-show="isTimer">{{ count }}</span>
        </div>
        <!-- /验证码或密码部分  -->
        <!-- 切换登录方式和注册 -->
        <div class="psd_register">
          <span class="psdLogIn" @click="changeLogIn()" ref="logInWay">{{
            $t("logIn.passLogIn")
          }}</span>
          <span class="register" @click="toRegister()"
            >{{ $t("logIn.register") }}
          </span>
        </div>
        <!-- /切换登录方式和注册 -->
        <div class="logInBtn" @click="login()">{{ $t("logIn.logIn") }}</div>
        <div class="forgotPsd" @click="toForgetPsd()">
          {{ $t("logIn.forget") }}
        </div>
      </div>
      <forget-psd v-show="!isLogIn" />
    </div>
  </div>
</template>

<script>
import forgetPsd from "../forgetPsd/forgetPsd.vue";
export default {
  name: "logIn",
  components: {
    forgetPsd,
  },
  data() {
    return {
      //登录表单
      logInForm: {
        email: "",
        psd: "",
      },
      inputVerification: this.$t("logIn.verifyTip"), // 验证码input提示
      pageCode: 1, // 1为验证码登录,2为密码登录,3为忘记密码页,默认为 1
      isLogIn: true, // t显示登录页 f显示忘记密码页
      isEmail: false, //邮箱是否合法,
      isVerfiCode: false, //验证码是否为空
      isPsdLogin: false, //是否为密码登录,默认为验证码登录
      timer: null, // 定时器
      count: "", // 倒计时
      isTimer: false, // 是否进入倒计时
    };
  },
  watch: {
    pageCode: {
      handler(newCode) {
        switch (newCode) {
          case 1:
            this.clearTimer();
            this.isTimer = false;
            this.$refs.logInWay.innerHTML = this.$t("logIn.passLogIn");
            this.isPsdLogin = true;
            this.inputVerification = this.$t("logIn.verifyTip");
            this.$refs.psd_verification.type = "text";
            break;
          case 2:
            this.$refs.logInWay.innerHTML = this.$t("logIn.verifyLogIn");
            this.isPsdLogin = false;
            this.inputVerification = this.$t("logIn.passTip");
            this.$refs.psd_verification.type = "password";
            break;
          case 3:
            break;
          default:
            break;
        }
      },
    },
  },
  mounted() {
    // 监听鼠标点击  点击位置为登录之外,则关闭登录页
    window.addEventListener("mousedown", this.closeLogIn);
  },
  unmounted() {
    window.removeEventListener("mousedown", this.closeLogIn);
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
      this.$parent.isShowLogIn = false;
    },
    // 切换登录方式
    changeLogIn() {
      switch (this.$refs.logInWay.innerText) {
        case this.$t("logIn.passLogIn"):
          this.pageCode = 2;
          break;
        case this.$t("logIn.verifyLogIn"):
          this.pageCode = 1;
          break;
        default:
          break;
      }
    },
    // 忘记密码
    toForgetPsd() {
      this.isLogIn = false;
    },
    // 验证邮箱合法性
    checkEmail(e) {
      let a = e.path[1]; // 获取带有after伪元素的父盒子
      if (this.logInForm.email == "") {
        a.setAttribute("data-after", "邮箱不能为空");
        return;
      }
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!pattern.test(this.logInForm.email)) {
        a.setAttribute("data-after", "邮箱格式不正确");
      } else {
        a.setAttribute("data-after", "");
        this.isEmail = true;
      }
    },

    // 验证验证码
    checkVerification(e) {
      let a = e.path[1]; // 获取带有after伪元素的父盒子
      if (this.logInForm.email == "") {
        a.setAttribute("data-after", "验证码不能为空");
      } else {
        a.setAttribute("data-after", "");
        this.isVerfiCode = true;
      }
    },

    // 关闭登录页面
    closeLogIn(e) {
      let logIn = this.$refs.logInContent;
      if (!e.path.includes(logIn)) {
        this.$parent.isShowLogIn = false;
      } else this.$parent.isShowLogIn = true;
    },

    // 登录
    login() {
      console.log("登录");
      switch (this.pageCode) {
        // 验证码登录时
        case 1:
          if (this.isEmail && this.isVerfiCode) {
            let rule = {
              email: this.logInForm.email,
              code: this.logInForm.psd,
              type: "code",
            };
            this.$http.post("/login/", rule).then((res) => {
              console.log("res", res.data);
            });
          }
          break;
        default:
          break;
      }
    },

    // 获取验证码
    getCode() {
      this.timerInterval();
      // if (this.isEmail) {
      //   let rule = {
      //     email: this.logInForm.email,
      //     type: "login",
      //   };
      //   this.$http.post("/verificationCode", rule).then((res) => {
      //     if(res.data.code == 20000){
      //       alert("发送成功")
      //       this.timerInterval()
      //     }
      //   });
      // }
    },

    // 获取验证码倒计时
    timerInterval() {
      const TIME_COUNT = 10;
      this.count = TIME_COUNT;
      this.isTimer = true; // 打开倒计时
      this.isPsdLogin = true; // 关闭对应发送验证码的按钮
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          this.isTimer = false;
          this.isPsdLogin = false;
          this.clearTimer();
          console.log("已清除");
        }
      }, 1000);
    },
    // 清除定时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  unmounted() {
    this.clearTimer();
  },
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
  z-index: 999;
}
.content {
  width: 546px;
  height: 631px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 24px -1px #919191;
  --webkit-box-shadow: 0px 1px 24px -1px #919191;
  --moz-box-shadow: 0px 1px 24px -1px #919191;
  margin-top: 10vh;
}
.logInBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 546px;
  height: 425px;
  padding-top: 58px;
  padding-bottom: 148px;
  margin: 0 auto;
  border-radius: 5px;
}
.title {
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: var(--color);
}
.inputBox {
  position: relative;
  width: 395px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}
.inputBox:after {
  content: attr(data-after);
  position: absolute;
  bottom: -18px;
  left: 20px;
  font-size: 12px;
  color: rgb(191, 23, 23);
  z-index: 999;
}
/* .inputBox::before{
  content: url("../../assets/hook.png");
  position: absolute;
  right: -90px;
  top: -30px;
  transform: scale(0.3);
} */
input {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  padding-left: 20px;
  width: 375px;
  height: 64px;
  background: #f4f4f4;
  border: 1px #f4f4f4 solid;
  border-radius: 5px;
  transition: 0.3s;
}
input:focus {
  border-color: var(--color);
}
input::-webkit-input-placeholder {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
}

.verificationBox {
  position: relative;
}
.getCodeBtn {
  position: absolute;
  top: 16px;
  right: 22px;
  min-width: 103px;
  height: 33px;
  text-align: center;
  line-height: 33px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
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
  color: var(--color);
  cursor: pointer;
}

.register {
  color: #333333;
  cursor: pointer;
}
.logInBtn {
  width: 394px;
  height: 61px;
  background: var(--color);
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
  box-shadow: 0px 4px 16px -6px var(--color);
  --webkit-box-shadow: 0px 4px 16px -6px var(--color);
  --moz-box-shadow: 0px 4px 16px -6px var(--color);
}
.forgotPsd {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
}
</style>