<template>
  <div class="privateOrder" ref="privateOrder">
    <div class="content" >
      <div class="formBox" >
        <h3 class="title">私人定制</h3>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
              placeholder="测试"
              type="password"
              v-model="ruleForm.pass"
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
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
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
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
   mounted() {
    document.addEventListener("mousedown", (e) => {
      let privateOrder = this.$refs.privateOrder; 
      if (!e.path.includes(privateOrder)) {
        this.$parent.isShow = false;
      }
    });
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
    closeThis(){
        this.$parent.isShow = false;
    }
  },
};
</script>
<style>
.el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.el-form-item__content {
  width: 367px;
  height: 41px;
  border-radius: 5px;
}
.el-input {
  width: 367px;
  height: 41px;
  border-radius: 5px;
}
.el-input__inner {
  border: 1px solid #999999;
}
.el-input__inner:focus,
.el-input__inner:hover {
  border: 1px solid var(--color);
}
</style>
<style scoped>
.privateOrder {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  z-index: 999;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 693px;
  height: 812px;
  background: #ffffff;
  box-shadow: 0px 4px 33px 7px rgba(7, 2, 3, 0.17);
  border-radius: 10px;
}
.formBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.title {
  font-size: 36px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #004ea2;
  padding-bottom: 38px;
  border-bottom: 4px solid #004ea2;
}
</style>