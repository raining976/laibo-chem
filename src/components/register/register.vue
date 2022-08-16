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
        label-width="200px"
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
            {{ waitTimer }}
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
        <el-form-item prop="tcp" class="tcp">
          <el-checkbox
            :label="$t('register.deal')"
            name="tcp"
            v-model="ruleForm.tcp"
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
      let phoneNum =
        /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d)|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d))$)/;
      if (value === "")
        callback(new Error(this.$t("base.phone") + this.$t("base.noEmpty")));
      if (!phoneNum.test(value)) {
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
        phone: [
          { required: true, validator: checkPhoneNum, trigger: "blur" },
        ],
        teamName: [
          { required: true, validator: checkTeamName, trigger: "blur" },
        ],
        tcp: [
          {
            required: true,
            message: "请先勾选同意协议",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/register", this.ruleForm).then((res) => {
            if (res.data.code == 20000) {
              this.bouncedMsg();
            }
            console.log("res.data.msg", res.data.msg);
          });
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
      this.$alert("即将进入主页...", "注册成功!", {
        confirmButtonText: "确定",
        // 进入主页路由
        // callback: (action) => {
        // },
      });
    },
    // 获取验证码
    getVerfiCode() {
      if (this.ruleForm.email == "") return;
      let rule = {
        email: this.ruleForm.email,
        type: "register",
      };
      this.$http.post("/verificationCode", rule).then((res) => {
        if (res.data.code == 20000) {
          alert("res.data.msg");
          this.verfi_timer();
        }
      });
    },
    // 发送验证码倒计时
    verfi_timer() {
      const TIME_COUNT = 10;
      this.waitTimer = TIME_COUNT;
      this.waitTimerShow = true;
      this.myTimer = setInterval(() => {
        if (this.waitTimer > 0 && this.waitTimerShow) {
          this.waitTimer--;
        } else {
          clearInterval(this.myTimer);
          this.myTimer = null;
          console.log("倒计时已清除");
          this.waitTimerShow = false;
        }
      }, 1000);
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
.registerBox .el-button {
  width: 130px;
  height: 49px;
  border-radius: 5px;
  font-size: 22px;
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
  margin-top: 30px;
}
/* 每个item的名字 */
.registerBox .el-form-item__label {
  font-size: 22px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 60px;
  margin-right: 20px;
}

/* input样式 */
.registerBox .el-input {
  width: 530px;
  height: 55px;
}
.registerBox .el-input__inner {
  width: 530px;
  height: 55px;
  border: 2px solid #999999;
  border-radius: 5px;
  font-size: 18px;
}
.registerBox .el-input__inner:hover {
  border-color: #78b3f3;
}
.registerBox .el-input__inner:focus {
  border-color: var(--color);
}
/* 后置判断标识 */
.registerBox .el-input__suffix {
  top: 8px;
  right: 10px;
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
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
}
.registerBox .el-form-item__error {
  margin-left: 20px;
}
.registerBox .verfiBox {
  position: relative;
}
.verfiBox .getVerfiBtn {
  position: absolute;
  right: 12px;
  top: 9px;
  width: 111px;
  height: 37px;
  background: #004ea2;
  border-radius: 5px;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 37px;
  cursor: pointer;
}
</style>
<style scoped>
.registerBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 900px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  width: 700px;
  margin-top: -80px;
}
.titleBox {
  display: flex;
  justify-content: flex-end;
  width: 670px;
}
h3 {
  width: 530px;
  text-align: center;
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: var(--color);
  margin-bottom: 50px;
}
</style>