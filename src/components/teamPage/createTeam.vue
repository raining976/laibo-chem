//createDate:2022-07-29
<template>
  <div class="createTeam">
    <div class="backBtn">
      <!-- 返回上一级 -->
      <router-link to @click="$router.back(-1)">{{
        $t("base.back")
      }}</router-link>
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
        <el-form-item :label="$t('team.name')" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('base.email')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('base.phone')" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('base.country')"
          prop="countryCode"
          class="countrySelect"
        >
          <vue3-country-intl
            v-model="ruleForm.countryCode"
            :showAreaCode="false"
            :onchange="countryChange(ruleForm.countryCode)"
          >
          </vue3-country-intl>
        </el-form-item>
        <el-form-item
          class="addressSelect"
          :label="$t('base.teamAddress')"
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
        <el-form-item :label="$t('address.full')" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('team.privilege')" prop="check">
          <el-radio-group v-model="ruleForm.check">
            <el-radio :label="0">{{ $t("team.need") }}</el-radio>
            <el-radio :label="1">{{ $t("team.noNeed") }}</el-radio>
          </el-radio-group></el-form-item
        >
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
  </div>
</template>
<script>
import vue3CountryIntl from "vue3-country-intl";
import "vue3-country-intl/lib/vue3-country-intl.css";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "createTeam",
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
      options: regionData, // 选择器的data
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        countryCode: "86",
        selectedOptions: [],
        order_check: 0,
        address: "", // 详细地址
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("team.name") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$t("base.email") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: this.$t("base.phone") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        countryCode: [
          {
            required: true,
            message: this.$t("base.country") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        selectedOptions: [
          {
            required: true,
            message: this.$t("base.teamAddress") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: this.$t("address.full") + this.$t("base.noEmpty"),
            trigger: "blur",
          },
        ],
        check: [{ required: true, message: "请选择订单权限", trigger: "blur" }],
      },
    };
  },
  mounted(){
    let isEdit = this.$$parent.isEdit;
    if(isEdit){

    }
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

    countryChange(code) {
      if (code != 86) {
        this.isChina = false;
      } else this.isChina = true;
      console.log("code", code);
    },
    // 地址改变时
    addressChange() {},

    // postForm
    postForm() {
      let form = {
        name: this.ruleForm.name,
        email: this.ruleForm.email,
        phone: this.ruleForm.phone,
        order_check: this.ruleForm.order_check,
        gj: Number(this.ruleForm.countryCode),
        sx: Number(this.ruleForm.selectedOptions[2]),
        dz: this.ruleForm.address,
      };
      this.$http.post("/team", form).then((res) => {
        if (res.data.code == 20000) {
          this.$message({
            message: "创建成功",
            type: "success",
          });
          this.$router.push("/searchMember");
          this.$parent.refreshKey++;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },

    // 获取团队信息做修改
    
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
.createTeam .el-radio-group {
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
.createTeam >>> .el-cascader--large {
  width: 100%;
}
.createTeam >>> .el-input__inner:focus,
.createTeam >>> .el-input__inner:hover {
  border-color: var(--color);
}
.createTeam >>> .country-intl-label {
  display: flex;
  align-items: center;
  border: #999999 2px solid;
}
.createTeam >>> .country-intl-label:focus,
.createTeam >>> .country-intl-label:hover {
  border-color: var(--color);
}
</style>