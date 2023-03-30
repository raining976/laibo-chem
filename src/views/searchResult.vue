  <template>
  <div class="bg">
    <div class="searchNav">
      <div class="sitePosi">
        <div class="returnBtn" @click="toMainPage()">
          &lt;{{ $t("search.backHome") }}
        </div>
        /&nbsp;
        <div class="nowPosi" v-if="typeIndex !== -1">{{ curName }}</div>
      </div>
      <div class="typeList">
        <div style="margin-bottom: 0.52vw">{{ $t("search.sort") }}</div>
        <div
          class="type"
          :class="{ is_type: index == typeIndex }"
          v-for="(item1, index) in typeList"
          :key="index"
         
        >
          <span  @click="searchType(item1.cate)" class="typeBtn">{{ item1.name }}</span>
        </div>
      </div>
    </div>
    <div class="resultBlock">
      <result :inputValue="inputValue" :cate="cate" ></result>
    </div>
  </div>
</template>
<script>
import result from "../components/searchProduct/result.vue";
export default {
  name: "",
  components: {
    result,
  },
  data() {
    return {
      res: "result",
      cate: "", // 0 1 2   0:实验用品, 1:中间品, 2:染料,
      type: "", //需要判断
      inputValue: "", //搜索值
      typeList: [
        { name: this.$t("search.intermediates"), cate: 1 },
        { name: this.$t("search.experiment"), cate: 0 },
        { name: this.$t("search.dyes"), cate: 2 },
        { name: this.$t("search.chemical"), cate: 3 },
      ],
      typeIndex: -1, // 用于标记当前 type 在typeList 的索引
      count: 0, //获取的产品总量
      curPage: 1, //当前页码
      page:1, //当前页码
      curCount: 1, //剩余待请求产品数
      // isNew: 0,
      curName: "",
      resultBox: [], //获取的产品对象
    };
  },
  created() {
    if (this.$route.query.inputValue) {
      this.inputValue = this.$route.query.inputValue; //搜索值
      this.cate = "";
    } else if (this.$route.query.whichType) {
      let state = this.$route.query.whichType; //其他板块点击更多产品跳转对应的四种产品类型代码
      this.searchType(state);
    }
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
  watch: {
    "$route.query.isSearch": {
      handler() {
        // 此判断用于解决输入新的搜索值路由不跳转
        if (this.$route.query.isSearch) {
          // 对路由变化作出响应....
          this.inputValue = this.$route.query.inputValue;
          this.cate = "";
          // this.isNew++;
        }
      },
      immediate: false,
      deep: true,
    },
    // 监听cate变化
    typeIndex(val) {
      this.curName = this.typeList[val].name;
      
    },
  },
  methods: {
    toMainPage() {
      this.$router.push("/mainPage");
    },
    // 分类
    searchType(type) {
      // 0:实验用品, 1:中间品, 2:染料,3化工产品
      if (type === this.cate) return; //此处若用两个逗号做判断会导致将空格判定为0，三个等号判断类型
      this.inputValue = "";
      this.cate = type;
      switch (type) {
        case 1:
          this.typeIndex = 0;
          break;
        case 2:
          this.typeIndex = 2;
          break;
        case 0:
          this.typeIndex = 1;
          break;
        case 3:
          this.typeIndex = 3;
          break;
      }
      // this.getSearchResult();
    },
    
  },
};
</script>
<style scoped>
.bg {
  min-width: 75.52vw;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5.21vw;
  min-height: 41.67vw;
}
.solidLine {
  min-width: 75.52vw;
  width: 100%;
  height: 0.05vw;
  border-bottom: 0.05vw solid #999999;
  margin: 0 auto;
}
/* 下面是列表样式 */
.searchNav {
  overflow: hidden;
  min-width: 9.38vw;
  margin: 0 0.52vw 0px 0;
}
.returnBtn {
  cursor: pointer;
  height: 0.94vw;
  margin: 0 0.26vw 0 0;
  font-size: 0.83vw;
  line-height: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
.returnBtn:hover {
  font-weight: 600;
}
.nowPosi {
  cursor: pointer;
  height: 0.94vw;
  font-size: 0.83vw;
  line-height: 0.94vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #000;
}
.sitePosi {
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0.73vw 0 2.6vw;
}
.typeList {
  width: 100%;
}
.type {
  width: 11.2vw;
  /* height: 0.94vw; */
  font-size: 0.83vw;
  line-height: 0.94vw;
  margin: 0.52vw 0;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #004ea2;
}
.is_type {
  font-weight: 600;
}

.resultBlock {
  width: 58.33vw;
}
.typeBtn{
  cursor: pointer;
}
.typeBtn:hover {
  font-weight: 600;
}
</style>
 