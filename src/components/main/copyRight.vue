<template>
  <div class="copyright">
    <div class="content">
      <div class="blue">
        Copyright © 2022 Laibo Chem Inc. - All rights reserved.
        沪ICP备xxxxxxxxxxx号
      </div>
      <div class="red">
        本网站销售的所有产品仅用于工业应用或者科学研究等非医疗目的，不可用于人类或动物的临床诊断或治疗，非药用，非食用。
      </div>
      <div class="blue bottom" >
        <span>沪公网安备xxxxxxxxxxxxxxxxxxx号</span>
        <span>危险品化学经营许可证（带存储）</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "copyRight",
};
</script>

<style scoped>
.copyright {
  display: flex;
  align-items: center;
  width: 100%;
  height: 190px;
  background: #ffffff;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 900px;
  margin: 0 auto;
}
.content > div{
margin-top: 20px;
}
.blue {
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #014a97;
}
.red {
  font-size: 14px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #fe2c2c;
}
.bottom{
  display: flex;
  justify-content: space-between;
  width: 500px;
}
</style>