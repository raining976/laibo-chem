  <template>
  <div class="solidLine"></div>
  <div class="bg">
    <div class="searchNav">
      <div class="sitePosi">
        <div class="returnBtn" @click="toMainPage()">
          &lt;{{ $t("search.backHome") }}
        </div>
        /&nbsp;
        <div class="nowPosi">{{ typeList[typeIndex].name }}</div>
      </div>
      <div class="typeList">
        <div style="margin-bottom: 0.52vw">{{ $t("search.sort") }}</div>
        <div
          class="type"
          :class="{ is_type: index == typeIndex }"
          v-for="(item1, index) in typeList"
          :key="index"
          @click="searchType(item1.cate)"
        >
          {{ item1.name }}
        </div>
      </div>
    </div>
    <div class="resultBlock">
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
      res: "result",
      cate: "", // 0 1 2   0:实验用品, 1:中间品, 2:染料,
      type: "", //需要判断
      inputValue: "",
      typeList: [
        { name: this.$t("search.intermediates"), cate: 1 },
        { name: this.$t("search.experiment"), cate: 0 },
        { name: this.$t("search.dyes"), cate: 2 },
      ],
      typeIndex: -1, // 用于标记当前 type 在t ypeList 的索引
      resultBox: [],
    };
  },
  created() {
    if (this.$route.query.inputValue) {
      this.inputValue = this.$route.query.inputValue;
      this.getSearchResult();
    } else if (this.$route.query.whichType) {
      let idx = this.$route.query.whichType; // 传参0:中间体,
      if (idx == 0) {
        this.searchType(1);
      } else if (idx == 1) {
        this.searchType(2);
      } else if (idx == 3) {
        this.searchType(0);
      }
    }
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },
  watch: {
    "$route.query.isSearch": {
      handler() {
        // 此判断用于解决路由不跳转
        if (this.$route.query.isSearch) {
          // 对路由变化作出响应....
          this.inputValue = this.$route.query.inputValue;
          this.cate = "";
          this.getSearchResult();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    toMainPage() {
      this.$router.replace({
        path: "/mainPage",
      });
    },
    //获取搜索结果
    getSearchResult() {
      if (this.$data.inputValue !== undefined) {
        this.$http
          .get("/search", {
            params: {
              s: this.inputValue,
              cate: this.cate, //  0:实验用品, 1:中间品, 2:染料,
            },
          })
          //回调函数
          .then((res) => {
            this.resultBox = res.data.data.products;
            this.toResultShow();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 分类
    searchType(type) {
      // 0:实验用品, 1:中间品, 2:染料,
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
      }
      this.getSearchResult();
    },
    // js判断页面
    toResultShow() {
      //用&&原因是因为数据未能完全覆盖导致条件判断错误
      if (
        this.$data.resultBox.length !== 0 &&
        this.$data.resultBox !== undefined
      ) {
        this.$data.res = "result";
      } else if (this.$data.resultBox.length === 0) {
        this.$data.res = "noResult";
      }
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
  cursor: pointer;
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
.type:hover {
  font-weight: 600;
}
.resultBlock{
  width: 58.33vw;  
}
</style>
 