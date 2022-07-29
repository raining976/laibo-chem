//createDate:2022-07-29
<template>
  <div class="createTeam">
    <div class="backBtn">
      <router-link to="/teamBlank">返回上一级</router-link>
    </div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="团队名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email地址" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="订单权限" prop="check">
          <el-radio-group v-model="ruleForm.check">
            <el-radio :label="0">需要负责人审核</el-radio>
            <el-radio :label="1">无需审核</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "createTeam",
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };

    return {
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        check: 0,
      },
      rules: {
        name: [
          { required: true, message: "团队名称不能为空", trigger: "blur" },
        ],
        email: [{ required: true, message: "email不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
        ],
        check: [{ required: true, message: "请选择订单权限", trigger: "blur" }],
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
.createTeam .el-form-item__label {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  margin-right: 20px;
}
.createTeam .el-input__inner {
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
}
.createTeam .el-input__inner:hover,
.createTeam .el-input__inner:focus {
  border-color: var(--color);
}
.createTeam .el-input__icon {
  transform: scale(1.5);
}
.createTeam .el-icon-circle-check {
  color: var(--check-color);
}
.createTeam .el-radio__input.is-checked + .el-radio__label {
  color: var(--color);
}

.createTeam .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--color);
  background: var(--color);
}
.createTeam .el-radio-group{
  transform: scale(1.2);
  transform-origin: left;
}
.createTeam .el-button {
  width: 107px;
  height: 46px;
  border-radius: 5px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  margin-left: 20px;
}
.createTeam .el-button--primary {
  background: var(--color);

  color: #ffffff;
}
</style>
<style scoped>
.backBtn {
  margin-bottom: 30px;
}
.backBtn a {
  font-size: 18px;
  color: var(--color);
}
.content {
  width: 600px;
}
</style>