//createDate:2022-07-27
<template>
  <div class="changePsd">
    <div class="title">修改密码</div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原始密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="password"
            v-model="ruleForm.newPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="btnBox">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "changePsd",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
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
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
        ],
        newPass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.changePsd .el-form-item__label {
  margin-right: 20px;
  text-align: end;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.changePsd .el-input__inner {
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
}
.changePsd .el-input__inner:hover,
.changePsd .el-input__inner:focus {
  border: 2px solid var(--color);
}
.changePsd .el-input__icon {
  transform: scale(1.5);
}
.changePsd .el-icon-circle-check {
  color: var(--check-color);
}
.changePsd .btnBox .el-form-item__content {
  padding-left: 20px;
}
.changePsd .btnBox .el-button--primary {
  background: var(--color);
}
.changePsd .el-button {
  width: 107px;
  height: 46px;
  border-radius: 5px;
}
</style>
<style scoped>
.content {
  width: 550px;
}
.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  margin-bottom: 20px;
  margin-right: 50px;
  border-bottom: 2px solid #eaeaec;
}
</style>