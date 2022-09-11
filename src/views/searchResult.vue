  <template>
  <div class="solidLine"></div>
  <div class="bg">
    <div class="searchNav">
      <div class="sitePosi">
        <div class="returnBtn" @click="toMainPage()">&lt;返回首页</div>
        /&nbsp;
        <div class="nowPosi">{{ type }}</div>
      </div>
      <div class="typeList">
        <div style="margin-bottom: 10px">更多产品分类：</div>
        <div
          class="type"
          v-for="(item1, index) in typeList"
          :key="index"
          @click="searchType(item1)"
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
      cate: "",  // 0 1 2
      type: "", //需要判断
      inputValue: "",
      typeList: ["中间品", "低值易耗品", "染料"],
      resultBox: [],
    };
  },
  async created() {
      this.$data.inputValue = this.$route.query.inputValue
      await this.getSearchResult()

  },
  watch: {
    "$route.query.isSearch": {
      handler() {
        // 此判断用于解决路由不跳转
        // console.log(this.$route.query.isSearch,"ccccc")
        if(this.$route.query.isSearch !== undefined) {
            // 对路由变化作出响应....
        this.$data.inputValue = this.$route.query.inputValue;
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
      async getSearchResult() {
      if(this.$route.query.inputValue !== "") {
      await this.$http
        .get("/search", {
          params: {
            s: this.$data.inputValue,
            cate: this.$data.cate, // 0 1 2
          },
        })
        //回调函数
        .then((res) => {
          this.$data.resultBox = res.data.data.products;
          this.toResultShow(); 
          // this.$data.code = res.data.code;
        })
        .catch((err) => {
          console.log(err);
        });
     }
    },
    // 分类
    searchType(str) {
     switch(str) {
        case "中间品": 
             this.$data.inputValue = str;
             this.$data.type = str;
             this.$data.cate = 0;
             break;
        case "低值易耗品":
             this.$data.inputValue = str;
             this.$data.type = str;
             this.$data.cate = 1;
             break;
        case "染料":
             this.$data.inputValue = str;
             this.$data.type = str;
             this.$data.cate = 2;
             break;   
     }  
     this.getSearchResult();
    },
    // js判断页面
    toResultShow() {
      //用&&原因是因为数据未能完全覆盖导致条件判断错误
      // console.log("CEss",this.$data.resultBox.length)
      if (this.$data.resultBox.length !== 0&&this.$data.resultBox !== undefined) {
        this.$data.res = "result";
      } else if(this.$data.resultBox.length === 0) {
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
 