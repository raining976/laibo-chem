// 收获地址部分
//createDate:2022-07-17
<template>
  <div class="receiveAddress">
    <div class="pageTitle">
      {{ $t("userMenu.address") }}
      <el-tooltip
        class="item"
        effect="light"
        :content="$t('address.add')"
        placement="top"
      >
        <i
          class="el-icon-circle-plus-outline addAddress"
          @click="addAddress()"
        ></i>
      </el-tooltip>
    </div>
    <div class="content">
      <div class="addressBox">
        <ul class="addressList">
          <li
            class="eachAddress"
            v-for="(address, index) in addresses"
            :key="index"
          >
            <p class="name">
              {{ $t("address.name") }}&nbsp;:&nbsp;{{ address.name }}
            </p>
            <p class="phone">
              {{ $t("base.phone") }}&nbsp;:&nbsp;{{ address.phone }}
            </p>
            <p class="address">
              {{ $t("base.address") }}&nbsp;:&nbsp;{{ address.address }}
            </p>
            <div class="btnBox">
              <div class="deleBtn icon_btn">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除地址"
                  placement="top"
                >
                  <i
                    class="el-icon-delete-solid"
                    @click="(curIdx = index), bounceMsg()"
                  ></i>
                </el-tooltip>
              </div>
              <div class="editBtn icon_btn">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="修改地址"
                  placement="top"
                >
                  <i class="el-icon-edit" @click="editAddress(index)"></i>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <address-form v-if="formIsShow" />
  </div>
</template>
<script>
import handleAddress from "../../js/handlerAddress";
import addressForm from "../address/addressForm.vue";
export default {
  name: "receiveAddress",
  components: {
    addressForm,
  },
  data() {
    return {
      curIdx: -1, // 当前选中要删除的索引
      flag: 0, // 1为增加地址,2为修改地址
      formIsShow: false, // 地址表单是否展示
      isReloadAddress: false, // 是否刷新地址
      addresses: [], // 地址列表
      curAddress: {}, // 当前地址对象
    };
  },
  mounted() {
    this.getAddress();
  },
  watch: {
    isReloadAddress(val) {
      if (val) {
        this.getAddress();
        this.isReloadAddress = false;
      }
    },
  },
  methods: {
    // 修改地址方法
    editAddress(idx) {
      this.flag = 2;
      this.curAddress = this.addresses[idx];
      // console.log("this.curAddress", this.curAddress);
      this.formIsShow = true;
    },
    addAddress() {
      this.formIsShow = !this.formIsShow;
      this.flag = 1;
    },

    // 获取地址方法
    getAddress() {
      this.$http.get("/address").then((res) => {
        if (res.data.code == 20000) {
          if (!res.data.data) {
            this.addresses = [];
          } else this.addresses = handleAddress(res.data.data);
        }
      });
    },
    bounceMsg() {
      this.$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.delAddress();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // // 处理地址 将区号转化成字符串
    // handleAddress(array) {
    //   array.forEach((item) => {
    //     let codeString = String(item.sx);
    //     let addressCode = [];
    //     var address = "";
    //     addressCode.push(codeString.slice(0, 2) + "0000");
    //     addressCode.push(codeString.slice(0, 4) + "00");
    //     addressCode.push(codeString);
    //     address = CodeToText[addressCode[0]] + CodeToText[addressCode[1]] + CodeToText[addressCode[2]] + item.dz
    //     item.address = address
    //   });
    //   return array;
    // },
    delAddress() {
      this.$http
        .post("/delAddress", {
          id: this.addresses[this.curIdx].id,
        })
        .then((res) => {
          if (res.data.code == 20000) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.isReloadAddress = true;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "未知错误!",
            type: "error",
          });
          console.log("err", err);
        });
    },
  },
};
</script>
<style>
.el-dialog--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
<style scoped>
.receiveAddress {
  position: relative;
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
.pageTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 30px;
  border-bottom: 2px solid #eaeaec;
  margin-bottom: 20px;
}
.addressList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* height: 0; */
}
.eachAddress {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 332px;
  min-width: 250px;
  flex: 1;
  height: 200px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  padding: 27px 48px;
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
  height: 150px;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
}
.address::-webkit-scrollbar
{
    width:6px;
}
.address::-webkit-scrollbar-thumb{
    width: 6px;
    height: 30px;
    border-radius:4px;
    background-color: #c7c7c9;
}

.btnBox {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
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

.addAddress {
  margin-left: 10px;
  transform: scale(1.5);
  transform-origin: center;
  cursor: pointer;
  transition: 0.3s;
  background-color: #e3f5ff;
  border-radius: 10px;
}
.addAddress:hover {
  transform: scale(1.7);
  color: var(--color);
  box-shadow: 0px 17px 29px -11px #c7c7c9;
  --webkit-box-shadow: 0px 17px 29px -11px #c7c7c9;
  --moz-box-shadow: 0px 17px 29px -11px #c7c7c9;
}
.icon_btn >>> i {
  transform: scale(1.5);
}
</style>