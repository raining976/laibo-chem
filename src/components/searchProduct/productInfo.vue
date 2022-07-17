<template>
  <div class="solidLine1"></div>
  <div class="productInfo">
    <div class="productInfoBox" >
      <div class="productPic"><img :src="pic" alt="" /></div>
      <div class="info">
        <!-- 化学名 -->
        <div class="productName">{{ name }}</div>
        <!-- 浓度 -->
        <div class="concentration">{{ concentration }}</div>
        <div class="solidLine2"></div>
        <!-- 详细信息 -->
        <div class="details">
          <!-- 以下为 不是-->
          <div class="oneDetail">
            <div class="detailName">CAS编号:</div>
            <div class="detailContent">{{ CAScode }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">分子式:</div>
            <div class="detailContent">{{ fenzishi }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">分子量:</div>
            <div class="detailContent">{{ fenziliang }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">EINECS编号:</div>
            <div class="detailContent">{{ EINECScode }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">MDL:</div>
            <div class="detailContent">{{ MDLcode }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">物化性质:</div>
            <div class="detailContent">{{ property }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">熔点:</div>
            <div class="detailContent">{{ fusionPoint }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">沸点:</div>
            <div class="detailContent">{{ boilingPoint }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">密度:</div>
            <div class="detailContent">{{ midu }}</div>
          </div>

          <div class="oneDetail">
            <div class="detailName">储存条件:</div>
            <div class="detailContent">{{ storageCondition }}</div>
          </div>
        </div>
        <!-- 库存与预计交期 -->
        <div class="kucun_peisong">
          <div class="inventory">库存：{{inventory}}</div>
          <div class="delivery">预计交期：{{delivery}}</div>
        </div>
        <!-- 价格 -->
        <div class="prize">
            <div></div>
        </div>
      </div>
    </div>
    <div><button disabled="disabled">加入购物车</button></div>
    <div class="toCustomize">联系客服私人订制></div>
  </div>
</template>
<script>
export default {
  name: "productInfo",
  components: "",
  data() {
    return {
pic: require("../../assets/p11.png"),
    };
  },
};
</script>
<style scoped>
.solidLine1 {
    width: 73.44vw;
height: 0.05vw;
border-bottom: 0.05vw solid #999999; 
margin: 0 auto;
}
.productInfo {
    width: 100%;
    height: 39.06vw;
    margin: 4.01vw 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
}
.productInfoBox {
    width: 73.44vw;
    height: 39.06vw;
    display: flex;
}
.productPic {
     width: 26.3vw;
height: 28.23vw;
margin: 0 1.41vw 0 0;
border: 0.05vw solid #999999;
border-radius: 0.26vw;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
}
.productPic > img {
 width: 26.3vw;
height: 28.23vw;
object-fit: contain;
}
.info {
width: 45.57vw;
height: 28.23vw;
overflow: hidden;
}
.productName {
width: 100%;
height: 2.6vw;
font-size: 2.5vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #004EA2;
line-height: 2.6vw;
}
.concentration {
width: 100%;
height: 1.25vw;
margin: 0.63vw 0 0 0.26vw;
font-size: 1.25vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #004EA2;
line-height: 1.25vw;
}
.solidLine2 {
width: 45.57vw;
height: 0.05vw;
margin: 1.46vw 0 0.73vw;
border-bottom: 0.05vw solid #999999;
}
.details {
 width: 100%;
 height: 9.9vw;
 overflow: hidden;
 display: flex;
 flex-direction: column;
 flex-wrap: wrap;
}
.oneDetail {
    width: 22.76vw;
height: 0.94vw;
  margin: 0.52vw 0;
}
.detailName {
width: 8.18vw;
height: 0.94vw;
font-size: 0.94vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #333333;
line-height: 0.94vw;
}
.detailContent {
/* width: ; */
height: 0.94vw;
font-size: 0.94vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #333333;
line-height: 0.94vw;
}
.kucun_peisong {
width: 100%;
height: 0.94vw;
display: flex;
font-size: 0.94vw;
margin: 0.68vw 0 0.94vw;
font-family: Microsoft YaHei UI;
font-weight: 400;
color: #004EA2;
line-height: 0.94vw;
}
.inventory {
    width: 8.18vw;
 height: 0.94vw;
 line-height: 0.94vw;
}
.delivery {
 height: 0.94vw;
 line-height: 0.94vw;
}
.prize {
 width: 100%;
height: 9.06vw;
border: 0.05vw solid #999999;
border-radius: 0.26vw;
overflow: hidden;
}
.addCart {
    margin: 1.77vw 0 0 0;
 width: 13.44vw;
height: 4.01vw;
background: #004EA2;
border-radius: 0.26vw;
}
.toCustomize {
position: absolute;
bottom: 1.98vw;
right: 0;
}
</style>