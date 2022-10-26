//createDate:2022-07-27
<template>
  <div class="changePsd">
    <div class="title">{{ $t("base.edit") + " " + $t("base.pass") }}</div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="170px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="$t('editPass.old') + $t('base.pass')"
          prop="oldPassword"
        >
          <el-input v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('editPass.new') + $t('base.pass')"
          prop="newPassword"
        >
          <el-input
            type="password"
            v-model="ruleForm.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('editPass.confirm') + $t('base.pass')"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="btnBox">
          <el-button type="primary" @click="submitForm('ruleForm')">{{
            $t("base.submit")
          }}</el-button>
          <el-button @click="resetForm('ruleForm')">{{
            $t("base.reset")
          }}</el-button>
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
        callback(
          new Error(
            this.$t("editPass.enter") +
              this.$t("editPass.new") +
              this.$t("base.pass")
          )
        );
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("register.passAgain")));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error(this.$t("register.checkError")));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message:
              this.$t("editPass.enter") +
              this.$t("editPass.old") +
              this.$t("base.pass"),
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
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
          this.postChange();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 提交修改密码
    postChange() {
      let form = {
        oldPassword: this.ruleForm.oldPassword,
        newPassword: this.ruleForm.newPassword,
      };
      this.$http.post("/changePassword", form).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "修改成功!",
            type: "success",
          });
          this.ruleForm = {
            oldPassword: "",
            newPassword: "",
            checkPass: "",
          };
        }else{
          this.$message({
            message:res.data.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style>
.changePsd .el-form-item__label {
  margin-right: 1.04vw;
  text-align: end;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.changePsd .el-input__inner {
  height: 2.24vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
}
.changePsd .el-input__inner:hover,
.changePsd .el-input__inner:focus {
  border: 0.1vw solid var(--color);
}
.changePsd .el-input__icon {
  transform: scale(1.5);
}
.changePsd .el-icon-circle-check {
  color: var(--check-color);
}
.changePsd .btnBox .el-form-item__content {
  padding-left: 1.04vw;
}
.changePsd .btnBox .el-button--primary {
  background: var(--color);
}
.changePsd .el-button {
  width: 5.57vw;
  height: 2.4vw;
  border-radius: 0.26vw;
}
.changePsd .el-button span {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
</style>
<style scoped>
.content {
  width: 28.65vw;
  padding-left: 1.56vw;
}
.title {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 1.56vw;
  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
}
</style>