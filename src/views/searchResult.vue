  <template>
  <div class="solidLine"></div>
  <div class="bg">
    <div class="searchNav">
      <div class="sitePosi">
        <div class="returnBtn" @click="toMainPage()">&lt;返回首页</div>
        <div class="nowPosi">/{{ type }}</div>
      </div>
      <div class="typeList">
        <div style="margin-bottom: 10px">更多产品分类：</div>
        <div
          class="type"
          v-for="(item1, index) in typeList"
          :key="index"
          @click="fun()"
        >
          {{ item1 }}
        </div>
      </div>
    </div>
    <div>
      <component :is="res" :resultBox="resultBox" />
    </div>
  </div>
</template>
<script>
import result from "../components/searchProduct/result.vue";
import noResult from "../components/searchProduct/noResult.vue";
export default {
  name: "", 
  components: {
    result,
    noResult,
  },
  data() {
    return {
      res: "noResult",
      type: "中间品", //需要判断
      typeList: ["中间品", "低值易耗品", "染料"],
      resultBox: [],
    };
  },
  created() {
      this.getSearchResult()
  },
  watch: {
    "$route.query.isSearch": {
      handler() {
        // 此判断用于解决路由不跳转
        // console.log(this.$route.query.isSearch,"ccccc")
        if(this.$route.query.isSearch !== undefined) {
            // 对路由变化作出响应....
        this.getSearchResult()     
        }
      },
      immediate: true,
      deep: true,
    
  }
  },
  methods: {
    toMainPage() {
      this.$router.replace({
        path: "/mainPage",
      });
      // this.$router.back()
    },
    //获取搜索结果
        getSearchResult() {
      if(this.$route.query.inputValue !== "") {
      this.$http
        .get("/search", {
          params: {
            s: this.$route.query.inputValue,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.resultBox = res.data.data;
          this.toResultShow(); 
          // this.$data.code = res.data.code;
        })
        .catch((err) => {
          console.log(err);
        });
     }
    },
  
    // js判断页面
    toResultShow() {
      //用&&原因是因为数据未能完全覆盖导致条件判断错误
      if (this.$data.resultBox !== []&&this.$data.resultBox !== undefined) {
        this.$data.res = "result";
      } else {
        this.$data.res = "noResult";
      }
    },
  },
  
};
</script>
<style scoped>
.bg {
  width: 100%;
  display: flex;
  justify-content: center;
}
.solidLine {
  width: 100%;
  height: 0.96px;
  border-bottom: 0.96px solid #999999;
  margin: 0 auto;
}
/* 下面是列表样式 */
.searchNav {
  overflow: hidden;
  width: 180px;
  margin: 0 10px 0px 0;
}
.returnBtn {
  cursor: pointer;
  height: 18px;
  margin: 0 5px 0 0;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
.returnBtn:hover {
  font-weight: 600;
}
.nowPosi {
  cursor: pointer;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #000;
}
.sitePosi {
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  margin: 14px 0 50px;
}
.typeList {
  width: 100%;
}
.type {
  cursor: pointer;
  width: 82px;
  height: 18px;
  font-size: 16px;
  line-height: 18px;
  margin: 10px 0;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
.type:hover {
  font-weight: 600;
}
</style>
 