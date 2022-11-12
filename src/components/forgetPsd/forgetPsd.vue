//createDate:2022-07-22
<template>
  <div class="forgetPsd">
    <div class="content">
      <h2 class="title" ref="title">{{ $t("logIn.findPass") }}</h2>
      <div class="inputBox">
        <input
          type="text"
          class="eachInput"
          :placeholder="$t('logIn.emailTip')"
          v-model="submitForm.email"
          @blur="checkEmail($event)"
          @keydown.enter="submit()"
        />
      </div>
      <div class="inputBox verificationBox">
        <input
          type="text"
          class="verification eachInput"
          :placeholder="$t('logIn.verifyTip')"
          v-model="submitForm.verfiCode"
          @blur="checkVerification($event)"
          @keydown.enter="submit()"
        />
        <span
          class="getCodeBtn"
          ref="getCodeBtn"
          v-show="!isTimer"
          @click="getCode()"
          @keydown.enter="submit()"
          >{{ $t("logIn.verifyBtn") }}</span
        >
        <span class="getCodeBtn" v-show="isTimer">{{ count + "s" }}</span>
      </div>
      <div class="inputBox">
        <input
          type="password"
          class="eachInput"
          :placeholder="$t('logIn.newPassTip')"
          v-model="submitForm.newPassword"
          @blur="passEmpty($event)"
          @keydown.enter="submit()"
        />
      </div>
      <div class="inputBox">
        <input
          type="password"
          class="eachInput"
          :placeholder="$t('logIn.checkPassTip')"
          v-model="checkPass"
          @blur="checkPassFunc($event)"
          @keydown.enter="submit()"
        />
      </div>
      <div class="submit" @click="submit()">{{ $t("logIn.submit") }}</div>
      <div class="returnLogIn" @click="$root.isForget = false">
        {{ $t("logIn.back") }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetPsd",
  data() {
    return {
      submitForm: {
        email: "",
        verfiCode: "",
        newPassword: "",
      },
      checkPass: "", // 确认密码
      timer: null, // 定时器
      count: "", // 倒计时
      isTimer: false, // 是否进入倒计时
      isEmail: false, //邮箱是否合法,
      isVerifyCode: false, //验证码是否为空
      isPass: false, // 密码是否合理
      isCheck: false, // 确认密码是否合理
    };
  },
  methods: {
    // 邮箱验证
    checkVerification(e) {
      let a = e.path[1]; // 获取带有after伪元素的父盒子
      if (this.submitForm.email == "") {
        a.setAttribute("data-after", this.$t("email.emptyVerify"));
        this.isVerifyCode = false;
      } else {
        a.setAttribute("data-after", "");
        this.isVerifyCode = true;
      }
    },

    // 获取验证码
    getCode() {
      if (this.isEmail) {
        let rule = {
          email: this.submitForm.email,
          type: "forgotPassword",
        };
        this.$http
          .post("/verificationCode", rule)
          .then((res) => {
            let msg;
            if (res.data.code == 20000) {
              msg = this.$t("callback.success");
              this.timerInterval();
            }
            this.$message({
              message: msg,
              type: "success",
            });
          })
          .catch((err) => {
            console.log("get_code_err", err);
          });
      }
    },

    // 提交修改
    submit() {
      if (this.isEmail && this.isVerifyCode && this.isPass && this.isCheck) {
        this.$http
          .post("/forgotPassword", this.submitForm)
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: "修改成功!",
                type: "success",
              });
              this.returnLogIn();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("forgetPass err", err);
            this.$message({
              message: this.$t("callback.error"),
              type: "error",
            });
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

    // 验证邮箱合法性
    checkEmail(e) {
      let a = e.path[1]; // 获取带有after伪元素的父盒子
      if (this.submitForm.email == "") {
        a.setAttribute("data-after", this.$t("email.noEmpty"));
        this.isEmail = false;
        return;
      }
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!pattern.test(this.submitForm.email)) {
        a.setAttribute("data-after", this.$t("email.noFormat"));
        this.isEmail = false;
      } else {
        a.setAttribute("data-after", "");
        this.isEmail = true;
      }
    },

    // 密码不能为空
    passEmpty(e) {
      let a = e.path[1];
      if (this.submitForm.newPassword == "") {
        a.setAttribute("data-after", this.$t("forgetPass.newPass"));
        this.isPass = false;
      } else {
        a.setAttribute("data-after", "");
        this.isPass = true;
      }
    },

    // check pass
    checkPassFunc(e) {
      let a = e.path[1];
      if (this.checkPass == "") {
        a.setAttribute("data-after", this.$t("forgetPass.confirm"));
        this.isCheck = false;
        return;
      }
      if (this.checkPass != this.submitForm.newPassword) {
        a.setAttribute("data-after", this.$t("forgetPass.noEqual"));
        this.isCheck = false;
      } else {
        a.setAttribute("data-after", "");
        this.isCheck = true;
      }
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 28.44vw;
  height: 27.34vw;
  padding-top: 3.02vw;
  padding-bottom: 2.5vw;
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
input {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  padding-left: 1.04vw;
  border: 0.05vw #f4f4f4 solid;
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
.eachInput {
  width: 19.53vw;
  height: 3.33vw;
  background: #f4f4f4;
  border-radius: 0.26vw;
}
.verification {
  width: calc(19.53vw - 6.46vw);
  padding-right: 6.46vw;
}
.verificationBox {
  position: relative;
}
.getCodeBtn {
  position: absolute;
  top: 0.83vw;
  min-width: 5.36vw;
  text-align: center;
  right: 1.15vw;
  display: inline-block;
  height: 1.72vw;
  line-height: 1.72vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  border-left: 0.05vw solid #999999;
  padding-left: 0.63vw;
  cursor: pointer;
}
.submit {
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
.submit:hover {
  box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
  --webkit-box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
  --moz-box-shadow: 0px 0.21vw 0.83vw -0.31vw var(--color);
}
.returnLogIn {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
}
</style>