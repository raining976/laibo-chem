<template>
  <div class="register">
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!-- 姓名部分 -->
        <el-form-item label="真实姓名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- /姓名部分 -->
        <!-- email部分 -->
        <el-form-item label="Email地址" prop="email">
          <el-input type="text" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <!-- /email部分 -->
        <!-- 登录密码 -->
        <el-form-item label="登录密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- /登录密码 -->
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- /确认密码 -->
        <!-- 电话号码 -->
        <el-form-item label="电话号码" prop="phoneNum">
          <el-input type="text" v-model="ruleForm.phoneNum"></el-input>
        </el-form-item>
        <!-- /电话号码 -->
        <!-- 机构名称 -->
        <el-form-item label="机构名称" prop="teamName">
          <el-input type="text" v-model="ruleForm.teamName"></el-input>
        </el-form-item>
        <!-- /机构名称 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')" class="resetBtn"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkName = (_, value, callback) => {
      if (value === "") callback(new Error("姓名不能为空"));
      callback();
      //   if (value.length > 30) callback(new Error("姓名过长"));
    };
    var checkEmail = (_, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      }
      let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!email.test(value)) {
        callback(new Error("请输入合理的邮箱"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhoneNum = (_, value, callback) => {
      let phoneNum =
        /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d)|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d))$)/;
      if (value === "") callback(new Error("电话号码不能为空"));
      if (!phoneNum.test(value)) {
        callback(new Error("请输入合理的电话号码"));
      }
      callback();
    };
    var checkTeamName = (_, value, callback) => {
      if (value === "") callback(new Error("机构名称不能为空"));
      callback();
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        pass: "",
        checkPass: "",
        phoneNum: "",
        teamName: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        phoneNum: [{ validator: checkPhoneNum, trigger: "blur" }],
        teamName: [{ validator: checkTeamName, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.bouncedMsg();
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
  },
};
</script>
<style>
.el-button {
  width: 115px;
  height: 49px;
  border-radius: 5px;
  font-size: 22px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  transition: 0.2s;
}
.el-button--primary {
  background: #004ea2;
}
.el-button--primary:hover,
.el-button--primary:focus {
  background: #024287;
}
.resetBtn {
  color: #409eff;
}
.resetBtn:hover,
.resetBtn:focus {
  background: #cbdff2;
}
.el-form-item:last-child {
  margin-top: 30px;
}
/* 每个item的名字 */
.el-form-item__label {
  font-size: 22px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  line-height: 60px;
  margin-right: 20px;
}
/* input样式 */
.el-input {
  width: 530px;
  height: 55px;
}
.el-input__inner {
  width: 530px;
  height: 55px;
  border: 2px solid #999999;
  border-radius: 5px;
  font-size: 18px;
}
.el-input__inner:hover {
  border-color: #78b3f3;
}
.el-input__inner:focus {
  border-color: #004ea2;
}
/* 后置判断标识 */
.el-input__suffix {
  top: 8px;
  right: 10px;
}
.el-input__icon {
  transform: scale(2);
}
.el-icon-circle-check {
  color: #a0c792;
}
</style>
<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 900px;
}
.content {
  height: 750px;
  width: 700px;
}
</style>