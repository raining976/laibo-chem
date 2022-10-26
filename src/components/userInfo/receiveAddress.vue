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
  margin-bottom: 1.2vw;
}
.countrySelectBox {
  position: relative;
  width: 18.23vw;
  background: #f7f7f7;
  margin-bottom: 1.35vw;
  margin-left: 0.26vw;
}
.countrySelectBox >>> input {
  padding-left: 6.09vw;
  background: #f7f7f7;
}
.countrySelectBox >>> .country-intl-label {
  padding-left: 6.09vw;
  background: #f7f7f7;
}

/* 当前国家 */
.curCountry {
  position: absolute;
  left: 1.25vw;
  top: 0.52vw;
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
  z-index: 1;
}
.newAddressTitle {
  font-size: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  color: var(--color);
}
.pageTitle {
  font-size: 1.04vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  padding-bottom: 1.56vw;
  border-bottom: 0.1vw solid #eaeaec;
  margin-bottom: 1.04vw;
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
  width: 17.29vw;
  min-width: 13.02vw;
  flex: 1;
  height: 10.42vw;
  background: #f7f7f7;
  border: 0.1vw solid #f7f7f7;
  border-radius: 0.52vw;
  padding: 1.41vw 2.5vw;
  margin-bottom: 2.6vw;
  margin-right: 2.6vw;
}
.eachAddress p {
  margin-bottom: 0.73vw;
  font-size: 0.99vw;
  font-family: Microsoft YaHei UI;
  font-weight: 500;
  color: #4a4a4a;
}
.eachAddress .address {
  line-height: 1.56vw;
  height: 7.81vw;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
}
.address::-webkit-scrollbar
{
    width:0.31vw;
}
.address::-webkit-scrollbar-thumb{
    width: 0.31vw;
    height: 1.56vw;
    border-radius:0.21vw;
    background-color: #c7c7c9;
}

.btnBox {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
}
.btnBox > div {
  font-size: 0.83vw;
  font-family: Microsoft YaHei UI;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1.04vw;
}
.editBtn {
  color: var(--color);
}
.deleBtn {
  color: rgb(164, 72, 72);
}
.detailedAddress {
  width: 25.73vw;
  height: 8.49vw;
  border: 0.1vw solid #999999;
  border-radius: 0.26vw;
}

.addAddress {
  margin-left: 0.52vw;
  transform: scale(1.5);
  transform-origin: center;
  cursor: pointer;
  transition: 0.3s;
  background-color: #e3f5ff;
  border-radius: 0.52vw;
}
.addAddress:hover {
  transform: scale(1.7);
  color: var(--color);
  box-shadow: 0px 0.89vw 1.51vw -0.57vw #c7c7c9;
  --webkit-box-shadow: 0vw 0.89vw 1.51vw -0.57vw #c7c7c9;
  --moz-box-shadow: 0px 0.89vw 1.51vw -0.57vw #c7c7c9;
}
.icon_btn >>> i {
  transform: scale(1.5);
}
</style>