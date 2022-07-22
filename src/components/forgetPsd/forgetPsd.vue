//createDate:2022-07-22
<template>
  <div class="forgetPsd">
    <div class="content">
      <h2 class="title" ref="title">找回密码</h2>
      <div class="inputBox">
        <input type="text" class="eachInput" :placeholder="inputEmail" />
      </div>
      <div class="inputBox verificationBox">
        <input
          type="text"
          class="verification eachInput"
          :placeholder="inputVerification"
        />
        <span class="getCodeBtn" ref="getCodeBtn">获取验证码</span>
      </div>
      <div class="inputBox">
        <input type="text" class="eachInput" placeholder="请输入新密码"/>
      </div>
      <div class="inputBox">
        <input type="text" class="eachInput" placeholder="请确认密码"/>
      </div>
      <div class="submit">提交</div>
      <div class="returnLogIn" @click="returnLogIn()">返回登录</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetPsd",
  data() {
    return {
      inputEmail: "请输入邮箱",
      inputVerification: "请输入验证码",
    };
  },
  methods: {
    returnLogIn() {
      this.$parent.isLogIn = true;
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 546px;
  height: 525px;
  padding-top: 58px;
  padding-bottom: 48px;
  margin: 0 auto;
  border-radius: 5px;
}
.title {
  font-size: 48px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: var(--color);
}
.inputBox {
  width: 395px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}
input {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  padding-left: 20px;
  border: 1px #f4f4f4 solid;
  transition: 0.3s;
}
input:focus{
    border-color: var(--color);
}
input::-webkit-input-placeholder {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #999999;
}
.eachInput {
  width: 375px;
  height: 64px;
  background: #f4f4f4;
  border-radius: 5px;
}
.verification {
  width: calc(375px - 124px);
  padding-right: 124px;
}
.verificationBox {
  position: relative;
}
.getCodeBtn {
  position: absolute;
  top: 16px;
  right: 22px;
  display: inline-block;
  height: 33px;
  line-height: 33px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  border-left: 1px solid #999999;
  padding-left: 12px;
  cursor: pointer;
}
.submit {
  width: 394px;
  height: 61px;
  background: var(--color);
  border-radius: 5px;
  font-size: 24px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 61px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.submit:hover {
  box-shadow: 0px 4px 16px -6px var(--color);
  --webkit-box-shadow: 0px 4px 16px -6px var(--color);
  --moz-box-shadow: 0px 4px 16px -6px var(--color);
}
.returnLogIn {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
}
</style>