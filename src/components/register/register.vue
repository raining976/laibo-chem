<template>
  <div class="registerBox">
    <div class="content">
      <div class="titleBox">
        <h3>{{ $t("register.userRegister") }}</h3>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="250px"
        class="demo-ruleForm"
      >
        <!-- 姓名部分 -->
        <el-form-item :label="$t('register.name')" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- /姓名部分 -->
        <!-- email部分 -->
        <el-form-item :label="$t('register.email')" prop="email">
          <el-input type="text" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <!-- /email部分 -->
        <!-- 验证码 -->
        <el-form-item
          :label="$t('register.verfiCode')"
          prop="verfiCode"
          class="verfiBox"
        >
          <el-input type="text" v-model="ruleForm.verfiCode"></el-input>
          <div
            class="getVerfiBtn"
            @click="getVerfiCode()"
            v-show="!waitTimerShow"
          >
            {{ $t("base.get") + $t("register.verfiCode") }}
          </div>
          <div class="getVerfiBtn" v-show="waitTimerShow">
            {{ waitTimer + "s" }}
          </div>
        </el-form-item>
        <!-- /验证码 -->
        <!-- 登录密码 -->
        <el-form-item :label="$t('register.pass')" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- /登录密码 -->
        <!-- 确认密码 -->
        <el-form-item :label="$t('register.checkPass')" prop="password1">
          <el-input
            type="password"
            v-model="ruleForm.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- /确认密码 -->
        <!-- 电话号码 -->
        <el-form-item :label="$t('register.phone')" prop="phone">
          <el-input type="text" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- /电话号码 -->
        <!-- 机构名称 -->
        <el-form-item :label="$t('register.team')" prop="teamName">
          <el-input type="text" v-model="ruleForm.teamName"></el-input>
        </el-form-item>
        <!-- /机构名称 -->
        <!-- 隐私单选框 -->
        <el-form-item class="tcp">
          <el-checkbox
            :label="$t('register.deal')"
            v-model="ruleForm.tcp"
            :change="checkedChange()"
          />
        </el-form-item>
        <!-- /隐私单选框 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{
            $t("register.submit")
          }}</el-button>
          <el-button @click="resetForm('ruleForm')" class="resetBtn">{{
            $t("register.reset")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkName = (_, value, callback) => {
      if (value === "")
        callback(new Error(this.$t("base.name") + this.$t("base.noEmpty")));
      callback();
    };
    var checkEmail = (_, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("base.email") + this.$t("base.noEmpty")));
      }
      let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!email.test(value)) {
        callback(new Error(this.$t("base.valid") + this.$t("base.email")));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("base.pass") + this.$t("base.noEmpty")));
      } else {
        if (this.ruleForm.password1 !== "") {
          this.$refs.ruleForm.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.passAgain")));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t("register.checkError")));
      } else {
        callback();
      }
    };
    var checkPhoneNum = (_, value, callback) => {
      // var phones = {
      //   "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
      //   "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
      //   "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
      //   "en-US": /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      //   "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      //   "de-DE":
      //     /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
      //   "da-DK": /^(\+?45)?(\d{8})$/,
      //   "el-GR": /^(\+?30)?(69\d{8})$/,
      //   "en-AU": /^(\+?61|0)4\d{8}$/,
      //   "en-GB": /^(\+?44|0)7\d{9}$/,
      //   "en-HK": /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      //   "en-IN": /^(\+?91|0)?[789]\d{9}$/,
      //   "en-NZ": /^(\+?64|0)2\d{7,9}$/,
      //   "en-ZA": /^(\+?27|0)\d{9}$/,
      //   "en-ZM": /^(\+?26)?09[567]\d{7}$/,
      //   "es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
      //   "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
      //   "fr-FR": /^(\+?33|0)[67]\d{8}$/,
      //   "he-IL": /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
      //   "hu-HU": /^(\+?36)(20|30|70)\d{7}$/,
      //   "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
      //   "ja-JP": /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
      //   "ms-MY":
      //     /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
      //   "nb-NO": /^(\+?47)?[49]\d{7}$/,
      //   "nl-BE": /^(\+?32|0)4?\d{8}$/,
      //   "nn-NO": /^(\+?47)?[49]\d{7}$/,
      //   "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
      //   "pt-BR": /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
      //   "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
      //   "ru-RU": /^(\+?7|8)?9\d{9}$/,
      //   "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
      //   "tr-TR": /^(\+?90|0)?5\d{9}$/,
      //   "vi-VN":
      //     /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
      //   "zh-CN": /^(\+?0?86\-?)?1[345789]\d{9}$/,
      //   "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
      // };

      let phoneNum = /^(\+?0?86\-?)?1[345789]\d{9}$/;
      if (value === "")
        callback(new Error(this.$t("base.phone") + this.$t("base.noEmpty")));
      var flag = false;
      // else {
      //   for(var i in phones){
      //     if(phones[i].test(value)) flag = true
      //     // console.log('flag',flag)
      //   }
      // }
      flag = phoneNum.test(value);
      if (!flag) {
        callback(new Error(this.$t("base.valid") + this.$t("base.phone")));
      }
      callback();
    };
    var checkTeamName = (_, value, callback) => {
      if (value === "")
        callback(new Error(this.$t("base.name") + this.$t("base.noEmpty")));
      callback();
    };

    return {
      waitTimer: "", // 倒计时为120秒
      myTimer: null, // 倒计时
      waitTimerShow: false, // 是否显示倒计时
      ruleForm: {
        name: "",
        email: "",
        password: "",
        password1: "",
        phone: "",
        teamName: "",
        verfiCode: "",
        tcp: false,
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        verfiCode: [
          {
            required: true,
            message: this.$t("register.verfiCode") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhoneNum, trigger: "blur" }],
        teamName: [
          { required: true, validator: checkTeamName, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.tcp) {
            this.$http
              .post("/register", this.ruleForm)
              .then((res) => {
                if (res.data.code == 20000) {
                  this.bouncedMsg();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                this.$message({
                  message: this.$t("callback.error"),
                  type: "error",
                });
                console.log("err", err);
              });
          } else {
            this.$message({
              message: this.$t("register.dealTip"),
              type: "warning",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    bouncedMsg() {
      this.$alert(
        this.$t("register.toHome"),
        this.$t("register.registerSuccess"),
        {
          confirmButtonText: this.$t("base.sure"),
          // 进入主页路由
          callback: () => {
            this.$router.push("mainPage");
            this.$root.isShowLogIn = true;
          },
        }
      );
    },
    // 获取验证码
    getVerfiCode() {
      if (this.ruleForm.email == "") {
        this.$message(this.$t("register.emailTip"));
        return;
      }
      let rule = {
        email: this.ruleForm.email,
        type: "register",
      };
      this.$http
        .post("/verificationCode", rule)
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: this.$t("callback.sendSuccess"),
              type: "success",
            });
            this.verfi_timer();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: this.$t("callback.error"),
            type: "error",
          });
          console.log("err", err);
        });
    },
    // 发送验证码倒计时
    verfi_timer() {
      const TIME_COUNT = 120;
      this.waitTimer = TIME_COUNT;
      this.waitTimerShow = true;
      this.myTimer = setInterval(() => {
        if (this.waitTimer > 0 && this.waitTimerShow) {
          this.waitTimer--;
        } else {
          clearInterval(this.myTimer);
          this.myTimer = null;
          // console.log("倒计时已清除");
          this.waitTimerShow = false;
        }
      }, 1000);
    },
    // 勾选或取消协议
    checkedChange() {
      // console.log("val", this.ruleForm.tcp);
    },
  },
  unmounted() {
    if (this.myTimer) {
      clearInterval(this.myTimer);
      this.myTimer = null;
    }
  },
};
</script>
<style>
.is-message-box {
  transform: scale(1.5);
}
.is-message-box .el-button--primary {
  background: var(--color);
}
.registerBox .el-button {
  width: 6.77vw;
  height: 2.55vw;
  border-radius: 0.26vw;
  font-size: 1.15vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  transition: 0.2s;
}
.registerBox .el-button--primary {
  background: var(--color);
}
.registerBox .el-button--primary:hover,
.registerBox .el-button--primary:focus {
  background: #024287;
}
.registerBox .resetBtn {
  color: #409eff;
}
.registerBox .resetBtn:hover,
.registerBox .resetBtn:focus {
  background: #cbdff2;
}
.registerBox .el-form-item:last-child {
  margin-top: 1.56vw;
}
/* 每个item的名字 */
.registerBox .el-form-item__label {
  font-size: 1.15vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 3.13vw;
  margin-right: 1.04vw;
}

/* input样式 */
.registerBox .el-input {
  width: 27.6vw;
  height: 2.86vw;
}
.registerBox .el-input__inner {
  width: 27.6vw;
  height: 2.86vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
  font-size: 0.94vw;
}
.registerBox .el-input__inner:hover {
  border-color: #78b3f3;
}
.registerBox .el-input__inner:focus {
  border-color: var(--color);
}
/* 后置判断标识 */
.registerBox .el-input__suffix {
  top: 0.42vw;
  right: 0.52vw;
}
.registerBox .el-input__icon {
  transform: scale(2);
}
.registerBox .el-icon-circle-check {
  color: var(--check-color);
}
/* 按钮盒子 */
.registerBox .el-form-item__content {
  display: flex;
  justify-content: flex-end;
}

/* 勾选协议部分 */
.registerBox .tcp .el-form-item__content {
  padding-left: 1.04vw;
  display: flex;
  justify-content: flex-start;
}
.registerBox .el-checkbox {
  transform: scale(1.5);
  transform-origin: left center;
}
.registerBox .el-checkbox__inner:hover {
  border-color: var(--color);
}
.registerBox .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: var(--color);
  border-color: var(--color);
}
.registerBox .el-checkbox__input.is-checked + .el-checkbox__label {
  color: var(--color);
}
.registerBox .el-form-item__error {
  margin-left: 1.04vw;
}
.registerBox .verfiBox {
  position: relative;
}
.verfiBox .getVerfiBtn {
  position: absolute;
  right: 0.52vw;
  top: 0.47vw;
  width: 5.78vw;
  height: 1.93vw;
  background: #004ea2;
  border-radius: 0.26vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 1.93vw;
  cursor: pointer;
}
.registerBox .el-checkbox__label {
  font-size: 0.73vw;
}
</style>
<style scoped>
.registerBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50.88vw;
  padding: 3vw 0;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 36.46vw;
  width: 36.46vw;
  margin-top: -4.17vw;
}
.titleBox {
  display: flex;
  justify-content: flex-end;
  width: 34.9vw;
}
h3 {
  width: 27.6vw;
  text-align: center;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: var(--color);
  margin-bottom: 2.6vw;
}
.registerBox >>> .el-form-item.chooseCountry .el-form-item__content {
  justify-content: flex-start;
  line-height: normal;
}
</style>