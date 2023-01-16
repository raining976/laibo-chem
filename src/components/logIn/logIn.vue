<template>
  <div class="logIn">
    <transition appear appear-active-class="fadeIn">
      <div class="content" ref="logInContent">
        <span class="close" @click="$root.isShowLogIn = false">
          <img src="../../assets/close.png" alt="" />
        </span>
        <div class="logInBox" v-show="!$root.isForget">
          <h2 class="title" ref="title">{{ $t("nav.logIn") }}</h2>
          <!-- 邮箱表单部分 -->
          <div class="inputBox" data-after="">
            <input
              type="text"
              class="email"
              :placeholder="$t('logIn.emailTip')"
              v-model="logInForm.email"
              @blur="checkEmail($event)"
              @keydown.enter="login()"
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
              @keydown.enter="login()"
            />
            <span class="getCodeBtn" v-show="!isPsdLogin" @click="getCode()">{{
              $t("logIn.verifyBtn")
            }}</span>
            <span class="getCodeBtn" v-show="isTimer">{{ count + "s" }}</span>
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
          <div class="forgotPsd" @click="$root.isForget = true">
            {{ $t("logIn.forget") }}
          </div>
        </div>
        <transition enter-active-class="fade">
          <forget-psd v-if="$root.isForget" />
        </transition>
      </div>
    </transition>
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
      isVeerifyCode: false, //验证码是否为空
      isPsdLogin: false, //是否为密码登录,默认为验证码登录
      timer: null, // 定时器
      count: "", // 倒计时
      isTimer: false, // 是否进入倒计时
    };
  },
  watch: {
    pageCode: {
      handler(newCode) {
        this.logInForm.psd = "";
        switch (newCode) {
          // 更改为验证码登录
          case 1:
            this.clearTimer();
            this.isTimer = false;
            this.$refs.logInWay.innerHTML = this.$t("logIn.passLogIn");
            this.isPsdLogin = false;
            this.inputVerification = this.$t("logIn.verifyTip");
            this.$refs.psd_verification.type = "text";

            break;
          // 更改为密码登录
          case 2:
            this.$refs.logInWay.innerHTML = this.$t("logIn.verifyLogIn");
            this.isPsdLogin = true;
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
    // window.addEventListener("mousedown", this.closeLogIn);
  },
  unmounted() {
    // window.removeEventListener("mousedown", this.closeLogIn);
    this.clearTimer();
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
      this.$root.isShowLogIn = false;
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
    // 验证邮箱合法性
    checkEmail(e) {
      let path = e.path || (e.composedPath && e.composedPath()); // 浏览器兼容问题
      let a = path[1]; // 获取带有after伪元素的父盒子
      if (this.logInForm.email == "") {
        a.setAttribute("data-after", this.$t("email.noEmpty"));
        return;
      }
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!pattern.test(this.logInForm.email)) {
        a.setAttribute("data-after", this.$t("email.noFormat"));
      } else {
        a.setAttribute("data-after", "");
        this.isEmail = true;
      }
    },

    // 验证验证码
    checkVerification(e) {
      let path = e.path || (e.composedPath && e.composedPath()); // 浏览器兼容问题
      let a = path[1]; // 获取带有after伪元素的父盒子
      if (this.logInForm.email == "") {
        if (this.pageCode == 1)
          a.setAttribute("data-after", this.$t("email.emptyVerify"));
        if (this.pageCode == 2)
          a.setAttribute("data-after", this.$t("email.emptyPass"));
      } else {
        a.setAttribute("data-after", "");
        this.isVerifyCode = true;
      }
    },

    // 关闭登录页面
    closeLogIn(e) {
      let logIn = this.$refs.logInContent;
      if (!e.path.includes(logIn)) {
        this.$root.isShowLogIn = false;
      } else this.$root.isShowLogIn = true;
    },

    // 登录
    login() {
      // console.log("登录");
      switch (this.pageCode) {
        // 验证码登录时
        case 1:
          if (this.isEmail && this.isVerifyCode) {
            let rule = {
              email: this.logInForm.email,
              code: this.logInForm.psd,
              type: "code",
            };
            this.$http
              .post("/login/", rule)
              .then((res) => {
                if (res.data.code == 20000) {
                  let token = res.data.data.access;
                  let refresh = res.data.data.refresh;
                  this.afterLogin(token, refresh);
                  // 查看过期时间:
                  // console.log("token", localStorage.getItem("token_exp"));
                  // console.log("refresh", localStorage.getItem("refresh_exp"));
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log("login_err", err);
              });
          }
          break;
        // 密码登录
        case 2:
          if (this.isEmail && this.isVerifyCode) {
            let rule = {
              email: this.logInForm.email,
              password: this.logInForm.psd,
              type: "password",
            };
            this.$http
              .post("/login/", rule)
              .then((res) => {
                if (res.data.code == 20000) {
                  let token = res.data.data.access;
                  let refresh = res.data.data.refresh;
                  this.afterLogin(token, refresh);
                  // 查看过期时间:
                  // console.log("token", localStorage.getItem("token_exp"));
                  // console.log("refresh", localStorage.getItem("refresh_exp"));
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log("login_err", err);
              });
          }
          break;
        default:
          break;
      }
    },

    // 获取验证码
    getCode() {
      if (this.isEmail) {
        let rule = {
          email: this.logInForm.email,
          type: "login",
        };
        this.$http
          .post("/verificationCode", rule)
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: "发送成功",
                type: "success",
              });
              this.timerInterval();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("get_code_err", err);
          });
      }
    },

    // 获取验证码倒计时
    timerInterval() {
      const TIME_COUNT = 120;
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

    // 处理token
    handler_token(token) {
      let index = token.indexOf(".");
      let last_index = token.lastIndexOf(".");
      token = token.slice(index + 1, last_index); // 切出包含过期信息的部分,也可用split()方法处理
      let token_object = JSON.parse(this.$Base64.decode(token)); // base64解密
      // console.log("token_object.exp", token_object.exp);
      return token_object.exp;
    },

    // 登录成功后的回调
    afterLogin(token, refresh) {
      // 反馈信息,更改显示状态
      this.$message({
        message: "登录成功!",
        type: "success",
      });
      if (this.$root.isShowLogIn) this.$root.isShowLogIn = false;
      this.$root.key++;
      // 保存access和refresh
      localStorage.setItem("token", token);
      localStorage.setItem("refresh", refresh);
      // 保存过期时间
      localStorage.setItem("token_exp", this.handler_token(token));
      localStorage.setItem("refresh_exp", this.handler_token(refresh));
      this.$router.push("/mainPage");
    },
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
  bottom: 0;
  z-index: 999;
}
.content {
  position: relative;
  width: 28.44vw;
  height: 32.86vw;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 0.26vw;
  box-shadow: 0px 0.05vw 1.25vw -0.05vw #919191;
  --webkit-box-shadow: 0px 0.05vw 1.25vw -0.05vw #919191;
  --moz-box-shadow: 0px 0.05vw 1.25vw -0.05vw #919191;
  margin-top: 10vh;
}
.close {
  position: absolute;
  right: 1.3vw;
  top: 1.3vw;
  cursor: pointer;
}
.close img {
  width: 1.51vw;
  height: 1.51vw;
}
.logInBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 28.44vw;
  height: 22.14vw;
  padding-top: 3.02vw;
  padding-bottom: 7.71vw;
  margin: 0 auto;
  border-radius: 0.26vw;
}
.title {
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: var(--color);
}
.inputBox {
  position: relative;
  width: 20.57vw;
  height: 3.33vw;
  background: #f4f4f4;
  border-radius: 0.26vw;
}
.inputBox:after {
  content: attr(data-after);
  position: absolute;
  bottom: -0.94vw;
  left: 1.04vw;
  font-size: 0.63vw;
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
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  padding-left: 1.04vw;
  width: 19.53vw;
  height: 3.33vw;
  background: #f4f4f4;
  border: 0.05vw #f4f4f4 solid;
  border-radius: 0.26vw;
  transition: 0.3s;
}
input:focus {
  border-color: var(--color);
}
input::-webkit-input-placeholder {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
}

.verificationBox {
  position: relative;
}
.getCodeBtn {
  position: absolute;
  top: 0.83vw;
  right: 1.15vw;
  min-width: 5.36vw;
  height: 1.72vw;
  text-align: center;
  line-height: 1.72vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  border-left: 1px solid #999999;
  padding-left: 0.63vw;
  cursor: pointer;
}
.psd_register {
  display: flex;
  justify-content: space-between;
  width: 20.57vw;
  font-size: 0.83vw;
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
  width: 20.52vw;
  height: 3.18vw;
  background: var(--color);
  border-radius: 0.26vw;
  font-size: 1.25vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 3.18vw;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.logInBtn:hover {
  box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
  --webkit-box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
  --moz-box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
}
.forgotPsd {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
}
.fadeIn {
  animation: fadeUp 0.5s;
}

.fade {
  animation: fadeUp 0.5s;
}
</style>