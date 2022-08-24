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
          @click="formIsShow = !formIsShow"
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
            <p class="name">{{$t('address.name')}}&nbsp;:&nbsp;{{ address.name }}</p>
            <p class="phone">{{$t('base.phone')}}&nbsp;:&nbsp;{{ address.phone }}</p>
            <p class="address">{{$t('base.address')}}&nbsp;:&nbsp;{{ address.address }}</p>
            <div class="btnBox">
              <div class="deleBtn"><i class="el-icon-delete"></i></div>
              <div class="editBtn" @click="editAddress()"><i class="el-icon-edit"></i></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <address-form v-if="formIsShow" />
  </div>
</template>
<script>
import addressForm from "../address/addressForm.vue";
export default {
  name: "receiveAddress",
  components: {
    addressForm,
  },
  data() {
    return {
      formIsShow: false, // 地址表单是否展示
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
    };
  },
  methods: {
    // 修改地址方法
    editAddress() {},
  },
};
</script>

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
  padding: 27px 48px ;
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
</style>