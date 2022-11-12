<template>
  <div class="h">
    <transition appear appear-active-class="fade">
      <div class="privateOrderBox" ref="privateOrder">
        <div class="content">
          <span class="close" @click="$root.isShowOrder = false">
            <img src="../../assets/close.png" alt="">
          </span>
          <div class="formBox">
            <h3 class="title">{{ $t("nav.customization") }}</h3>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="5.8vw"
              class="demo-ruleForm"
            >
              <el-form-item label="Email" prop="email">
                <el-input
                  :placeholder="$t('privateOrder.emailTip')"
                  type="text"
                  v-model="ruleForm.email"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('privateOrder.name')" prop="name">
                <el-input
                  :placeholder="$t('privateOrder.nameTip')"
                  type="text"
                  v-model="ruleForm.name"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('privateOrder.phone')" prop="phone">
                <el-input
                  :placeholder="$t('privateOrder.phoneTip')"
                  type="text"
                  v-model="ruleForm.phone"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('privateOrder.team')" prop="company">
                <el-input
                  :placeholder="$t('privateOrder.teamTip')"
                  type="text"
                  v-model="ruleForm.company"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('privateOrder.demand')"
                prop="content"
                class="demandBox"
              >
                <el-input
                  class="demand"
                  :placeholder="$t('privateOrder.demandTip')"
                  type="textarea"
                  v-model="ruleForm.content"
                ></el-input>
              </el-form-item>
              <p class="contactUs">
                {{ $t("privateOrder.contact") }}&nbsp;:&nbsp;{{$t('footer.email')}}
              </p>
            </el-form>
            <el-form-item class="btnBox">
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                class="orderSubmit"
                >{{ $t("base.submit") }}</el-button
              >
              <el-button @click="resetForm('ruleForm')" class="orderReset">{{
                $t("base.reset")
              }}</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (_, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("email.noEmpty")));
      }
      let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!pattern.test(value)) callback(new Error(this.$t("email.noFormat")));
      callback();
    };
    var checkName = (_, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("privateOrder.emptyName")));
      }
      callback();
    };
    var checkPhoneNum = (_, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("privateOrder.emptyPhone")));
      }
      let pattern =
        /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d)|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d))$)/;
      if (!pattern.test(value)) {
        callback(new Error(this.$t("privateOrder.emptyFormat")));
      }
      callback();
    };
    var checkCompany = (_, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("privateOrder.emptyTeam")));
      }
      callback();
    };
    var checkDemand = (_, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("privateOrder.emptyDemand")));
      }
      callback();
    };

    return {
      ruleForm: {
        email: "",
        name: "",
        phone: "",
        company: "",
        content: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        phone: [{ validator: checkPhoneNum, trigger: "blur" }],
        company: [{ validator: checkCompany, trigger: "blur" }],
        content: [{ validator: checkDemand, trigger: "blur" }],
      },
    };
  },
  mounted() {
    window.addEventListener("mousedown", this.closeForm);
  },

  unmounted() {
    window.removeEventListener("mousedown", this.closeForm);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postForm();
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
      this.$root.isShowOrder = false;
    },
    // 关闭私人定制表单
    closeForm(e) {
      let privateOrder = this.$refs.privateOrder;
      if (!e.path.includes(privateOrder)) {
        this.$root.isShowOrder = false;
      }
    },
    // 上传表单
    postForm() {
      this.$http
        .post("/personalTailor", this.ruleForm)
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: this.$t('callback.submitSuccess'),
              type: "success",
            });
            this.$root.isShowOrder = false;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: this.$t('callback.error'),
            type: "error",
          });
          console.error(err);
        });
    },
  },
};
</script>
<style>
:root {
  --animate-duration: 0.5s;
}
.privateOrderBox .el-form-item__label {
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.privateOrderBox .el-form-item__content {
  width: 19.11vw;
  height: 2.14vw;
  border-radius: 0.26vw;
}
.privateOrderBox .el-input {
  width: 19.11vw;
  height: 2.14vw;
  border-radius: 0.26vw;
}
.privateOrderBox .el-input__inner {
  width: 19.11vw;
  height: 2.14vw;
  border-radius: 0.26vw;
  border: 0.05vw solid #999999;
}
.privateOrderBox .el-input__inner:focus,
.privateOrderBox .el-input__inner:hover {
  border: 0.05vw solid var(--color);
}

.privateOrderBox .el-form-item .demand {
  width: 19.11vw;
  height: 5.36vw;
}

.privateOrderBox .el-form-item .el-textarea__inner {
  width: 19.11vw;
  height: 5.36vw;
  border: 0.05vw solid #999999;
  border-radius: 0.26vw;
  resize: none;
}
.privateOrderBox .demandBox .el-form-item__content {
  width: 19.11vw;
  height: 5.36vw;
}
.privateOrderBox .el-form-item {
  margin-top: 1.56vw;
}
.privateOrderBox .btnBox .el-form-item__content {
  display: flex;
  justify-content: center;
}
.privateOrderBox .orderSubmit:nth-child(1) {
  display: flex;
  justify-content: center;
  min-width: 3.59vw;
  height: 1.98vw;
  background: var(--color);
  border-radius: 0.26vw;
}
.privateOrderBox .orderSubmit:nth-child(1) span {
  text-align: center;
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
}
.privateOrderBox .orderReset:nth-child(2) {
  display: flex;
  justify-content: center;
  min-width: 3.59vw;
  height: 1.98vw;
  color: var(--color);
  border-radius: 0.26vw;
  border-color: var(--color);
}
.privateOrderBox .orderReset:nth-child(2) span {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
}
.privateOrderBox .el-button--default:hover {
  background: #a5d0ff;
}
.privateOrderBox .el-button {
  padding: 10px;
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}
.privateOrderBox {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  margin: 0 auto;
}
.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36.09vw;
  height: 42.29vw;
  background: #ffffff;
  box-shadow: 0px 0.21vw 1.72vw 0.36vw rgba(7, 2, 3, 0.17);
  border-radius: 0.52vw;
}
.close{
  position: absolute;
  right: 1.3vw;
  top: 1.3vw;
  cursor: pointer;
}
.close img{
  width: 1.51vw;
  height: 1.51vw;
}
.formBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(42.29vw - 4.9vw);
  padding: 2.08vw 0 2.81vw 0;
}
.title {
  font-size: 1.88vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #004ea2;
  padding-bottom: 1.98vw;
  border-bottom: 0.21vw solid #004ea2;
}
.contactUs {
  margin: 2.81vw 1.3vw 0 1.3vw;
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
}
.fade {
  animation: fadeUp 0.5s;
}
</style>