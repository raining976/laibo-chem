// 个人信息部分
//createDate:2022-07-17
<template>
  <div class="userInfoChange">
    <div class="title">个人信息</div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email账号" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="团队名称">
          <el-input
            v-model="ruleForm.team"
            :disabled="true"
            class="team"
          ></el-input>
        </el-form-item>
        <el-form-item>
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
  name: "userInfoChange",
  data() {
    var checkAge = (rule, value, callback) => {};
    return {
      ruleForm: {
        email: "",
        name: "",
        phone: "",
        gender: Number,
        team: "这里是团队名称",
      },
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入email地址", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
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
.userInfoChange .el-form-item {
  margin-bottom: 25px;
}
.userInfoChange .el-form-item__label {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  margin-right: 20px;
}
.userInfoChange .el-input__inner {
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}

.userInfoChange .el-input__inner:hover,
.userInfoChange .el-input__inner:focus {
  border: 2px solid var(--color);
}
.userInfoChange .is-disabled .el-input__inner {
  border: 0;
}
.userInfoChange .is-disabled .el-input__inner:hover,
.userInfoChange .is-disabled .el-input__inner:focus {
  border: 0;
}
.userInfoChange .el-button {
  width: 107px;
  height: 46px;
  border-radius: 5px;
  margin-left: 20px;
}
.userInfoChange .el-button--primary {
  background: var(--color);
}
.userInfoChange .el-radio__inner {
  width: 18px;
  height: 18px;
  border-color: var(--color);
}
.userInfoChange .el-radio__label {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.userInfoChange .is-checked .el-radio__label {
  color: var(--color);
}
.userInfoChange .el-radio__input.is-checked .el-radio__inner {
  background: var(--color);
}
.userInfoChange .el-input__icon {
  transform: scale(1.5);
}
.userInfoChange .el-icon-circle-check {
  color: var(--check-color);
}
</style>
<style scoped>
.title {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  margin-right: 50px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaeaec;
}
.content {
  width: 550px;
  padding-left: 30px;
}
</style>