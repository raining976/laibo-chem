<template>
  <div class="copyright">
    <div class="content">
      <div class="blue">
        Copyright © 2022 Laibo Chem Inc. - All rights reserved.
        鲁ICP备2022020172号-1
      </div>
      <div class="red">
        本网站销售的所有产品仅用于工业应用或者科学研究等非医疗目的，不可用于人类或动物的临床诊断或治疗，非药用，非食用。
      </div>
      <div class="blue bottom">
        <span><a href="https://beian.miit.gov.cn/" target="blank">鲁ICP备2022020172号-1</a></span>
        <!-- <span>危险品化学经营许可证（带存储）</span> -->
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
  height: 9.9vw;
  background: #f7f7f7;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 46.88vw;
  margin: 0 auto;
}
.content > div {
  margin-top: 1.04vw;
}
.blue {
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #014a97;
}
.blue a{
    color: #014a97;   
}
.red {
  font-size: 0.73vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #fe2c2c;
}
.bottom {
  display: flex;
  justify-content: center ;
  width: 26.04vw;
}
</style>