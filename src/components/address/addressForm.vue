//createDate:2022-08-09
<template>
  <!-- 设置地址部分 -->
  <div class="setAddressBox" ref="addressForm">
    <h3 class="newAddressTitle">{{ $t("base.address") }}</h3>
    <div class="changeCountryBox">
      <div class="countrySelectBox">
        <span class="curCountry">{{ $t("address.current") + " : " }}</span>
        <vue3-country-intl
          v-model="countryCode"
          :showAreaCode="false"
          :onchange="countryChange(countryCode)"
        >
        </vue3-country-intl>
      </div>
      <!-- 地址表单部分-->
      <div class="addressFormBox">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="addressForm"
          ><el-form-item
            class="addressSelect"
            v-show="isChina"
            :label="$t('base.address')"
            prop="selectedOptions"
          >
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.selectedOptions"
              @change="addressChange"
              :placeholder="$t('address.chooseTip')"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            :label="$t('base.address')"
            class="addressInfo"
            v-show="!isChina"
          >
            <el-input
              v-model="ruleForm.state"
              class="state"
              prop="state"
            ></el-input>
            <el-input v-model="ruleForm.city" class="city"></el-input>
            <el-input v-model="ruleForm.district" class="district"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('address.full')"
            prop="address"
            class="detailAddress"
          >
            <el-input type="textarea" v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('address.name')" prop="name" class="name">
            <el-input v-model.number="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('base.phone')" prop="phone" class="phone">
            <el-input v-model.number="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{
              $t("base.submit")
            }}</el-button>
            <el-button @click="resetForm('ruleForm')">{{
              $t("base.reset")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /地址表单部分-->
    </div>
  </div>
  <!-- /设置地址部分 -->
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import vue3CountryIntl from "vue3-country-intl";
import "vue3-country-intl/lib/vue3-country-intl.css";
export default {
  name: "addressForm",
  components: {
    vue3CountryIntl,
  },
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
      options: regionData,
      selectedOptions: [],
      countryCode: "86",
      isChina: true, // 是否为中国大陆
      // 地址表单
      ruleForm: {
        state: "", // 省级
        city: "", // 市级
        district: "", // 区级
        address: "", //详细地址
        name: "", // 收货人
        phone: "", // 联系电话
        selectedOptions: [],
      },
      // 判断绑定
      rules: {
        state: [
          { required: true, message: "请填写省级行政区", trigger: "blur" },
        ],
        city: [
          { required: true, message: "请填写省级行政区", trigger: "blur" },
        ],
        district: [
          { required: true, message: "请填写省级行政区", trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: this.$t("address.fillTip") + this.$t("address.full"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("address.fillTip") + this.$t("address.name"),
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: this.$t("address.fillTip") + this.$t("base.phone"),
            trigger: "blur",
          },
        ],
        selectedOptions: [
          {
            required: true,
            message: this.$t("address.chooseTip"),
            trigger: "blur",
          },
        ],
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
    countryChange(code) {
      if (code != 86) {
        this.isChina = false;
      } else this.isChina = true;
      console.log("code", code);
    },
    // 提交表单
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 地址改变时
    addressChange(arr) {
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
      this.ruleForm.state = arr[0];
      this.ruleForm.city = arr[1];
      this.ruleForm.district = arr[2];
    },
    // 关闭表单
    closeForm(e) {
      let form = this.$refs.addressForm;
      if (!e.path.includes(form)) {
        this.$parent.formIsShow = false;
      } else this.$parent.formIsShow = true;
    },
  },
};
</script>
<style>
.addressForm {
  width: 620px;
}
.detailAddress,
.detailAddress .el-form-item__content > * {
  width: 494px;
  height: 163px;
  border-radius: 5px;
}
.detailAddress textarea {
  resize: none;
  width: 494px;
  height: 163px;
  border-radius: 5px;
  border: 2px solid #999999;
}
.addressInfo .el-input {
  width: 163px;
  height: 43px;
  border-radius: 5px;
}
.addressInfo .el-input.el-input__inner {
  border: 2px solid #999999;
}
.setAddressBox .el-form-item__label {
  text-align: left;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.setAddressBox .el-form-item {
  display: flex;
  justify-content: flex-start;
}
.setAddressBox .name .el-form-item__content,
.setAddressBox .phone .el-form-item__content {
  width: 218px;
  height: 43px;
  border-radius: 5px;
}
.setAddressBox .name .el-form-item__content .el-input,
.setAddressBox .phone .el-form-item__content .el-input {
  width: 218px;
  height: 43px;
  border-radius: 5px;
}
.setAddressBox .name .el-input__inner,
.setAddressBox .phone .el-input__inner {
  width: 218px;
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
}
.setAddressBox .el-cascader {
  width: 494px;
  border-radius: 5px;
}
.setAddressBox .el-cascader .el-input__inner {
  border: 2px solid #999999;
}
.setAddressBox .el-input__inner:hover,
.setAddressBox .el-input__inner:focus,
.setAddressBox .el-textarea__inner:hover,
.setAddressBox .el-textarea__inner:focus,
.setAddressBox .el-cascader .el-input__inner:hover,
.setAddressBox .el-cascader .el-input__inner:focus {
  border: 2px var(--color) solid;
}
.setAddressBox .el-input__icon {
  transform: scale(1.5);
}
.setAddressBox .el-icon-circle-check {
  color: var(--check-color);
}
.setAddressBox .is-error .el-input__inner {
  border: var(--el-color-danger) solid 2px;
}
.setAddressBox .el-button--primary {
  background: var(--color);
}
.setAddressBox .el-button {
  width: 108px;
  height: 41px;
  border-radius: 5px;
}
</style>


<style scoped>
.setAddressBox {
  position: absolute;
  top: 50px;
  left: 300px;
  background: #fff;
  padding: 50px 80px;
  border-radius: 18px;
  box-shadow: 0px 5px 50px -17px #585c72;
  --webkit-box-shadow: 0px 5px 50px -17px #585c72;
  --moz-box-shadow: 0px 5px 50px -17px #585c72;
}
.newAddressTitle {
  margin-bottom: 23px;
}
.countrySelectBox {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background: #f7f7f7;
  margin-bottom: 26px;
  margin-left: 5px;
}
.countrySelectBox >>> input {
  background: #f7f7f7;
}
.countrySelectBox >>> .country-intl-label {
  background: #f7f7f7;
}

/* 当前国家 */
.curCountry {
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
  z-index: 1;
  margin-right: 10px;
  padding-left: 10px;
}
.newAddressTitle {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
}
</style>