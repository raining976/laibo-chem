<template>
  <div class="h">
    <div class="privateOrderBox" ref="privateOrder">
      <div class="content">
        <div class="formBox">
          <h3 class="title">私人定制</h3>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="email" prop="email">
              <el-input
                placeholder="请输入email地址"
                type="text"
                v-model="ruleForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input
                placeholder="请输入联系方式"
                type="text"
                v-model="ruleForm.contact"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNum">
              <el-input
                placeholder="请输入联系电话"
                type="text"
                v-model="ruleForm.phoneNum"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系单位" prop="contactUnit">
              <el-input
                placeholder="请输入单位名称"
                type="text"
                v-model="ruleForm.contactUnit"
              ></el-input>
            </el-form-item>
            <el-form-item label="需求概述" prop="demand" class="demandBox">
              <el-input
                class="demand"
                placeholder="请输入产品名称，CAS号，规格，数量"
                type="textarea"
                v-model="ruleForm.demand"
              ></el-input>
            </el-form-item>
            <p class="contactUs">联系方式&nbsp;:&nbsp;labservice@188.com</p>
          </el-form>
          <el-form-item class="btnBox">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              class="orderSubmit"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')" class="orderReset"
              >重置</el-button
            >
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (_, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!pattern.test(value)) callback(new Error("邮箱格式不正确"));
      callback();
    };
    var checkContact = (_, value, callback) => {
      if (!value) {
        return callback(new Error("联系人不能为空"));
      }
      callback();
    };
    var checkPhoneNum = (_, value, callback) => {
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      }
      let pattern =
        /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d)|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d))$)/;
      if (!pattern.test(value)) {
        callback(new Error("电话格式不正确"));
      }
      callback();
    };
    var checkContactUnit = (_, value, callback) => {
      if (!value) {
        return callback(new Error("联系单位不能为空"));
      }
      callback();
    };
    var checkDemand = (_, value, callback) => {
      if (!value) {
        return callback(new Error("需求概述不能为空"));
      }
      callback();
    };

    return {
      ruleForm: {
        email: "",
        contact: "",
        phoneNum: "",
        contactUnit: "",
        demand: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        contact: [{ validator: checkContact, trigger: "blur" }],
        phoneNum: [{ validator: checkPhoneNum, trigger: "blur" }],
        contactUnit: [{ validator: checkContactUnit, trigger: "blur" }],
        demand: [{ validator: checkDemand, trigger: "blur" }],
      },
    };
  },
  mounted() {
    window.addEventListener("mousedown",this.closeForm)
  },
  
  unmounted(){
    window.removeEventListener("mousedown",this.closeForm)
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
    closeThis() {
      this.$parent.isShow = false;
    },
    // 关闭私人定制表单
    closeForm(e) {
      let privateOrder = this.$refs.privateOrder;
      if (!e.path.includes(privateOrder)) {
        this.$parent.isShow = false;
      }
    },
  },
};
</script>
<style>
.privateOrderBox .el-form-item__label {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.privateOrderBox .el-form-item__content {
  width: 367px;
  height: 41px;
  border-radius: 5px;
}
.privateOrderBox .el-input {
  width: 367px;
  height: 41px;
  border-radius: 5px;
}
.privateOrderBox .el-input__inner {
  width: 367px;
  height: 41px;
  border-radius: 5px;
  border: 1px solid #999999;
}
.privateOrderBox .el-input__inner:focus,
.privateOrderBox .el-input__inner:hover {
  border: 1px solid var(--color);
}

.privateOrderBox .el-form-item .demand {
  width: 367px;
  height: 103px;
}

.privateOrderBox .el-form-item .el-textarea__inner {
  width: 367px;
  height: 103px;
  border: 1px solid #999999;
  border-radius: 5px;
  resize: none;
}
.privateOrderBox .demandBox .el-form-item__content {
  width: 367px;
  height: 103px;
}
.privateOrderBox .el-form-item {
  margin-top: 30px;
}
.privateOrderBox .btnBox .el-form-item__content {
  display: flex;
  justify-content: center;
}
.privateOrderBox .orderSubmit:nth-child(1) {
  width: 69px;
  height: 38px;
  background: var(--color);
  border-radius: 5px;
}
.privateOrderBox .orderReset:nth-child(2) {
  width: 69px;
  height: 38px;
  color: var(--color);
  border-radius: 5px;
  border-color: var(--color);
}
.privateOrderBox .el-button--default:hover {
  background: #a5d0ff;
}

/* 后置对钩或叉 */

.privateOrderBox .el-input__icon {
  transform: scale(1.5);
}
.privateOrderBox .el-icon-circle-check {
  color: var(--check-color);
}
</style>
<style scoped>
.h {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.privateOrderBox {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  margin: 0 auto;
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
  justify-content: space-between;
  align-items: center;
  height: calc(812px - 94px);
  padding: 40px 0 54px 0;
}
.title {
  font-size: 36px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #004ea2;
  padding-bottom: 38px;
  border-bottom: 4px solid #004ea2;
}
.contactUs {
  margin: 54px 25px 0 25px;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
</style>