//createDate:2022-07-29
<template>
  <div class="createTeam">
    <div class="backBtn">
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
        label-width="6.77vw"
        class="demo-ruleForm"
        :disabled="!isEdit || !isAdmin"
      >
        <el-form-item :label="$t('team.teamId')" v-if="!isCreate">
          <el-input v-model="teamId" :disabled="true"></el-input>
        </el-form-item>
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
            :disabled="!isAdmin"
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
            :placeholder="$t('base.teamAddress')"
            :disabled="!isAdmin"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('address.full')" prop="address">
          <el-input v-model="ruleForm.address" :disabled="!isAdmin"></el-input>
        </el-form-item>
        <el-form-item :label="$t('team.privilege')" prop="order_check">
          <el-radio-group v-model="ruleForm.order_check" :disabled="!isAdmin">
            <el-radio :label="0">{{ $t("team.noNeed") }}</el-radio>
            <el-radio :label="1">{{ $t("team.need") }}</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item v-if="isAdmin">
          <el-button type="primary" @click="submitForm('ruleForm')">{{
            $t("base.submit")
          }}</el-button>
          <el-button @click="resetForm('ruleForm')" v-if="!isEdit">{{
            $t("base.reset")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import handleSingleCode from "../../js/handleSingleCode";
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
      teamId: "", // 团队id
      isEdit: true, // 是否为编辑团队信息页
      isAdmin: false, // 是否为管理员
      isCreate: false, // 是否为创建
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        countryCode: "86",
        selectedOptions: [],
        order_check: 1,
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
        order_check: [
          { required: true, message: "请选择订单权限", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log("this.$parent.editFlag", this.$parent.editFlag);
    if (this.$parent.editFlag) {
      this.isEdit = true;
      this.isCreate = false;
      this.getTeamInfo();
    }
    if (this.$parent.isEdit) {
      this.isEdit = true;
      this.isCreate = false;
    }
    let privilege = localStorage.getItem("privilege");
    if (privilege == 1 || privilege == 2) {
      this.isAdmin = true;
    }
    console.log("this.$parent.isAdmin", this.$parent.isAdmin);

    const createFlag = this.$route.params.createFlag;
    if (createFlag) {
      this.isAdmin = true;
      this.isCreate = true;
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
      // console.log("code", code);
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
      if (this.isEdit && !this.isCreate) {
        form.id = this.teamId;
        this.$http
          .post("/editTeam", form)
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: this.$t('callback.success'),
                type: "success",
              });
              this.$parent.refreshKey++;
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("post_team_err", err);
          });
      } else if (this.isCreate) {
        this.$http
          .post("/team", form)
          .then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: this.$t('callback.success'),
                type: "success",
              });
              
              setTimeout(() => {
                this.getTeamInfo()
              }, 100);

              this.$router.push({
                name: "searchMember",
                params: {
                  flag: 1,
                },
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log("post_team_err", err);
          });
      }
    },
    getTeamInfo() {
      this.$http
        .get("/teamInfo")
        .then((res) => {
          if (res.data.code == 20000) {
            let response = res.data.data;
            this.teamId = response.id;
            localStorage.setItem("teamId",this.teamId)
            this.ruleForm.name = response.name;
            this.ruleForm.phone = response.phone;
            this.ruleForm.email = response.email;
            this.ruleForm.countryCode = response.gj;
            this.ruleForm.selectedOptions = handleSingleCode(response.sx);
            this.ruleForm.address = response.dz;
            if (response.order_check) {
              this.ruleForm.order_check = 1;
            } else this.ruleForm.order_check = 0;
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
          console.log("err", err);
        });
    },
  },
};
</script>
<style>
.createTeam .el-form-item__label {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
  margin-right: 1.04vw;
}
.createTeam .el-input__inner {
  height: 2.24vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
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
  width: 5.57vw;
  height: 2.4vw;
  border-radius: 0.26vw;
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  margin-left: 1.04vw;
}
.createTeam .el-button--primary {
  background: var(--color);

  color: #ffffff;
}
</style>
<style scoped>
.backBtn {
  margin-bottom: 1.56vw;
}
.backBtn a {
  font-size: 0.94vw;
  color: var(--color);
}
.content {
  width: 31.25vw;
}
.createTeam >>> .el-cascader--large {
  width: 100%;
}
.createTeam >>> .el-input__inner:focus,
.createTeam >>> .el-input__inner:hover {
  border-color: var(--color);
}
.createTeam >>> .is-disabled .el-input__inner:focus,
.createTeam >>> .is-disabled .el-input__inner:hover {
  border-color: #e4e7ed;
}
.createTeam >>> .country-intl-label {
  display: flex;
  align-items: center;
  border: #999999 0.1vw solid;
}
.createTeam >>> .country-intl-label:focus,
.createTeam >>> .country-intl-label:hover {
  border-color: var(--color);
}
</style>