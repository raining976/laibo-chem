
<template>
  <div class="search">
    <div class="h">
      <div class="logoBox">
        <router-link to="/mainPage"
          ><img src="../../assets/logo1.png" alt=""
        /></router-link>
      </div>
      <div class="searchBox">
        <div class="inputBox">
          <input
            type="text"
            :placeholder="$t('home.searchTip')"
            v-model="inputValue"
          />
        </div>
        <div class="searchBtn" @click="getSearchResult()">
          <img src="../../assets/sousuo.png" alt="" />
        </div>
      </div>
      <div class="toILabPlus">
        {{ $t("home.toILaiBoPlus") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      inputValue: "",
      code: 0,
      retultBox: [],
    };
  },
  watch: {
    code: {
      handler() {
        this.toSearchResult();
        this.$data.code = 0;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getSearchResult() {
      this.$http
        .get("/search", {
          params: {
            s: this.$data.inputValue,
          },
        })
        //回调函数
        .then((res) => {
          this.$data.retultBox = res.data.data;
          // console.log(res.data);
          this.$data.code = res.data.code;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toSearchResult() {
      console.log(this.$data.code, this.$data.inputValue, "ceshi");
      if (this.$data.inputValue !== "" && this.$data.code !== 0) {
        console.log(JSON.stringify(this.$data.retultBox),"ceshi2")
        this.$router.push({
          path: "/searchResult",
          query: {
            retult: JSON.stringify(this.$data.retultBox),
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.search {
  width: 100%;
}
.h {
  width: 72%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 187px;
  margin: 0 auto;
}
.logoBox {
  flex: 1;
}
.searchBox {
  flex: 7;
  display: flex;
  width: 870px;
  height: 80px;
  border: 2px solid #666666;
  border-radius: 1px;
  margin: 0 25px;
}
.inputBox {
  flex: 6;
  height: 80px;
}
input {
  padding: 0 50px;
  /* width: 570px; */
  width: calc(100% - 50px);
  height: 100%;
  font-size: 22px;
}
input::-webkit-input-placeholder {
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #666666;
  line-height: 80px;
}
.searchBtn {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-left: 2px solid #666666;
  border-radius: 1px;
  cursor: pointer;
}
.searchBtn img {
  transition: all 0.3s;
}
.searchBtn:hover img {
  transform: scale(1.1);
}
.toILabPlus {
  width: 201px;
  height: 75px;
  background: #004ea2;
  border-radius: 5px;
  text-align: center;
  line-height: 75px;
  font-size: 20px;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.toILabPlus:hover {
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(74, 167, 182, 0.3);
}
</style>