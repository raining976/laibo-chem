// 个人信息部分
//createDate:2022-07-17
<template>
  <div class="userInfoChange">
    <div class="title">{{ $t("userMenu.info") }}</div>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('base.name')" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('base.email')" prop="email">
          <el-input v-model="ruleForm.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('base.phone')" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('base.sex')">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="0">{{ $t("base.man") }}</el-radio>
            <el-radio :label="1">{{ $t("base.woman") }}</el-radio>
            <el-radio :label="2">{{ $t("userInfo.secret") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('base.team')">
          <el-input
            v-model="ruleForm.team"
            :disabled="true"
            class="team"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{
            $t("base.edit")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "userInfoChange",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(
          new Error(this.$t("form.enter") + this.$t("base.phone"))
        );
      }
      var pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (!pattern.test(value)) {
        return callback(new Error("手机号格式错误"));
      }
      return callback();
    };
    return {
      initName: "", // 原来的名字
      initPhone: "", // 原来的电话
      initGender: -1, // 原来的性别
      ruleForm: {
        email: "",
        name: "",
        phone: "",
        gender: Number,
        team: "这里是团队名称",
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("form.enter") + this.$t("base.name"),
            trigger: "blur",
          },
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // 请求个人信息并添加到表单等待修改
    this.getUserInfo();
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.initName != this.ruleForm.name ||
      this.initPhone != this.ruleForm.phone ||
      this.initGender != this.ruleForm.gender
    ) {
      this.$confirm(
        "检测到未保存的内容，是否在离开页面前保存修改？",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存",
          cancelButtonText: "放弃修改",
        }
      )
        .then(() => {
          this.postUserInfo();
          next();
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postUserInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // getUserInfo
    getUserInfo() {
      this.$http.get("/userInfo").then((res) => {
        this.ruleForm = res.data.data;
        this.initName = res.data.data.name;
        this.initPhone = res.data.data.phone;
        this.initGender = res.data.data.gender;
      });
    },

    // postUserInfo
    postUserInfo() {
      if (
        this.initName == this.ruleForm.name &&
        this.initPhone == this.ruleForm.phone &&
        this.initGender == this.ruleForm.gender
      ) {
        this.$message("您还未作出修改哦~");
        return;
      }
      let form = {
        email: this.ruleForm.email,
        name: this.ruleForm.name,
        phone: this.ruleForm.phone,
        gender: this.ruleForm.gender,
      };
      this.$http
        .post("/userInfo", form)
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.getUserInfo();
            this.$root.key++;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "意外错误!",
            type: "error ",
          });
        });
    },
  },
};
</script>
<style>
.userInfoChange .el-form-item {
  margin-bottom: 1.3vw;
}
.userInfoChange .el-form-item__label {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  margin-right: 1.04vw;
}
.userInfoChange .el-input__inner {
  height: 2.24vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}

.userInfoChange .el-input__inner:hover,
.userInfoChange .el-input__inner:focus {
  border: 0.1vw solid var(--color);
}
.userInfoChange .is-disabled .el-input__inner {
  border: 0;
}
.userInfoChange .is-disabled .el-input__inner:hover,
.userInfoChange .is-disabled .el-input__inner:focus {
  border: 0;
}
.userInfoChange .el-button {
  width: 6.25vw;
  height: 2.4vw;
  border-radius: 0.26vw;
  margin-left: 1.04vw;
}
.userInfoChange .el-button--primary {
  background: var(--color);
}
.userInfoChange .el-radio__inner {
  width: 0.94vw;
  height: 0.94vw;
  border-color: var(--color);
}
.userInfoChange .el-radio__label {
  font-size: 0.94vw;
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
.userInfoChange .el-button span {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
</style>
<style scoped>
.title {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 1.56vw;

  margin-bottom: 1.04vw;
  border-bottom: 0.1vw solid #eaeaec;
}
.content {
  width: 28.65vw;
  padding-left: 1.56vw;
}
</style>