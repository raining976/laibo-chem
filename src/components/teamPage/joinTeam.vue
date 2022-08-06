//createDate:2022-07-29
<template>
  <div class="joinTeam">
    <div class="backBtn">
      <router-link to="/teamBlank">返回上一级</router-link>
    </div>
    <div class="searchBox">
      <div class="tag">团队名称</div>
      <div class="inputBox">
        <input type="text" placeholder="请输入团队名称" />
      </div>
      <div class="btn">查询</div>
    </div>
    <div class="searchListBox">
      <h3 class="listTitle">查询列表</h3>
      <ul class="searchList">
        <li class="listHead eachLi">
          <span>团队名称</span>
          <span>负责人</span>
          <span>联系电话</span>
          <span>email地址</span>
          <span>操作</span>
        </li>
        <li class="eachLi" v-for="(item, index) in searchList" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.admin }}</span>
          <span>{{ item.phone }}</span>
          <span>{{ item.email }}</span>
          <span>
            <router-link to="/searchMember"><a class="joinBtn">申请加入</a></router-link>
            
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "joinTeam",
  data() {
    return {
      searchList: [
        {
          name: "张三的团队",
          email: "11111111@163.com",
          admin: "张三",
          phone: "1008610086",
        },
        {
          name: "张三的团队",
          email: "11111111@163.com",
          admin: "张三",
          phone: "1008610086",
        },
        {
          name: "张三的团队",
          email: "11111111@163.com",
          admin: "张三",
          phone: "1008610086",
        },
      ],
    };
  },
};
</script>
<style scoped>
.backBtn {
  margin-bottom: 40px;
}
.backBtn a {
  font-size: 18px;
  color: var(--color);
}
.searchBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #eaeaec;
  padding-bottom: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
}
.tag {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.inputBox {
  margin: 0 80px 0 30px;
}
input {
  width: 259px;
  height: 43px;
  border: 2px solid #999999;
  border-radius: 5px;
  padding-left: 20px;
  transition: 00.3s;
}
input:hover,
input:focus {
  border-color: var(--color);
}
.btn {
  width: 98px;
  height: 41px;
  background: var(--color);
  border-radius: 5px;
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  line-height: 41px;
  text-align: center;
}
.listTitle {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px;
}
.searchList {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.eachLi {
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
  padding-left: 10px;
}
.eachLi span {
  display: inline-block;
  flex: 1;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  margin: 0 10px;
}
.listHead {
  background: #eaebed;
  border-radius: 5px;
}
.listHead span {
  font-size: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333333;
}
.eachLi .joinBtn {
  font-size: 16px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: var(--color);
  cursor: pointer;
  transition: all 0.3s;
}
.eachLi .joinBtn:hover {
  font-weight: 600;
}
</style>