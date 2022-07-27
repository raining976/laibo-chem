// 收获地址部分
//createDate:2022-07-17
<template>
  <div class="receiveAddress">
    <div class="content">
      <div class="pageTitle">收货地址</div>
      <div class="addressBox">
        <ul class="addressList">
          <li
            class="eachAddress"
            v-for="(address, index) in addresses"
            :key="index"
          >
            <p class="name">收件人&nbsp;:&nbsp;{{ address.name }}</p>
            <p class="phone">电话号码&nbsp;:&nbsp;{{ address.phone }}</p>
            <p class="address">收货地址&nbsp;:&nbsp;{{ address.address }}</p>
            <div class="btnBox">
              <div class="deleBtn">删除地址</div>
              <div class="editBtn" @click="editAddress()">修改地址</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="setAddressBox">
        <h3 class="newAddressTitle">{{ editOrNewAddress }}</h3>
        <div class="changeCountryBox">
          <div class="countrySelectBox">
            <span class="curCountry">当前配送至</span>
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
              label-width="100px"
              class="addressForm"
              ><el-form-item
                class="addressSelect"
                v-show="isChina"
                label="地址信息"
                prop="selectedOptions"
              >
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="ruleForm.selectedOptions"
                  @change="addressChange"
                  placeholder="选择收货地址"
                ></el-cascader>
              </el-form-item>
              <el-form-item
                label="地址信息"
                class="addressInfo"
                v-show="!isChina"
              >
                <el-input
                  v-model="ruleForm.state"
                  class="state"
                  prop="state"
                ></el-input>
                <el-input v-model="ruleForm.city" class="city"></el-input>
                <el-input
                  v-model="ruleForm.district"
                  class="district"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="详细地址"
                prop="address"
                class="detailAddress"
              >
                <el-input type="textarea" v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="收货人" prop="name" class="name">
                <el-input v-model.number="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone" class="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- /地址表单部分-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import vue3CountryIntl from "vue3-country-intl";
import "vue3-country-intl/lib/vue3-country-intl.css";
export default {
  name: "receiveAddress",
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
      addresses: [
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
        {
          name: "张三",
          phone: "10086100861",
          address: "山东省青岛市高新区同顺路8号青岛网谷合心园2号楼902A",
        },
      ],
      countryCode: "86",
      isChina: true, // 是否为中国大陆
      editOrNewAddress: "新增收货地址", // 新增地址还是修改地址
      // 地址表单
      ruleForm: {
        state: "", // 省级
        city: "", // 市级
        district: "", // 区级
        address: "", //详细地址
        name: "", // 收货人
        phone: "", // 联系电话
        selectedOptions:[],
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
          { required: true, message: "请填写详细信息", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请填写收货人姓名", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
        selectedOptions: [
          { required: true, message: "请选择地址", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
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

    // 修改地址方法
    editAddress(){
      
    }
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
.state {
  width: 218px;
  height: 43px;
  border-radius: 5px;
}
.state .el-input__inner {
  border: 2px solid #999999;
}
.receiveAddress .el-form-item__label {
  text-align: left;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.receiveAddress .el-form-item {
  display: flex;
  justify-content: flex-start;
}
.receiveAddress .name .el-form-item__content,
.receiveAddress .phone .el-form-item__content {
  width: 218px;
  height: 43px;
  border-radius: 5px;
}
.receiveAddress .name .el-form-item__content .el-input,
.receiveAddress .phone .el-form-item__content .el-input {
  width: 218px;
  height: 43px;
  border-radius: 5px;
}
.receiveAddress .name .el-input__inner,
.receiveAddress .phone .el-input__inner {
  width: 218px;
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
}
.receiveAddress .el-cascader {
  width: 494px;
  border-radius: 5px;
}
.receiveAddress .el-cascader .el-input__inner {
  border: 2px solid #999999;
}
.receiveAddress .el-input__inner:hover,
.receiveAddress .el-input__inner:focus,
.receiveAddress .el-textarea__inner:hover,
.receiveAddress .el-textarea__inner:focus,
.receiveAddress .el-cascader .el-input__inner:hover,
.receiveAddress .el-cascader .el-input__inner:focus {
  border: 2px var(--color) solid;
}
.receiveAddress .el-input__icon {
  transform: scale(1.5);
}
.receiveAddress .el-icon-circle-check {
  color: var(--check-color);
}
.receiveAddress .is-error .el-input__inner {
  border: var(--el-color-danger) solid 2px;
}
.receiveAddress .el-button--primary {
  background: var(--color);
}
.receiveAddress .el-button {
  width: 108px;
  height: 41px;
  border-radius: 5px;
}
</style>
<style scoped>

.pageTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 24px;
  border-bottom: 2px solid #eaeaec;
  margin-bottom: 22px;
}
.addressList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* height: 0; */
}
.eachAddress {
  position: relative;
  width: 332px;
  height: 219px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  padding: 27px 48px 23px;
  margin-bottom: 50px;
  margin-right: 50px;
}
.eachAddress p {
  margin-bottom: 14px;
  font-size: 19px;
  font-family: Microsoft YaHei UI;
  font-weight: 500;
  color: #4a4a4a;
}
.eachAddress .address {
  line-height: 30px;
}
.btnBox {
  position: absolute;
  right: 50px;
  bottom: 20px;
  display: flex;
}
.btnBox > div {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
}
.editBtn {
  color: var(--color);
}
.deleBtn {
  color: rgb(164, 72, 72);
}
.detailedAddress {
  width: 494px;
  height: 163px;
  border: 2px solid #999999;
  border-radius: 5px;
}
.newAddressTitle {
  margin-bottom: 23px;
}
.countrySelectBox {
  position: relative;
  width: 350px;
  background: #f7f7f7;
  margin-bottom: 26px;
  margin-left: 5px;
}
.countrySelectBox >>> input {
  padding-left: 117px;
  background: #f7f7f7;
}
.countrySelectBox >>> .country-intl-label {
  padding-left: 117px;
  background: #f7f7f7;
}

/* 当前国家 */
.curCountry {
  position: absolute;
  left: 24px;
  top: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
  z-index: 1;
}
.newAddressTitle {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
}
</style>