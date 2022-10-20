// 热门产品
<template>
  <div class="hotProduct">
    <h3 class="title">
      <span class="title_zh">热门产品</span>
      <span class="line"></span>
      <span class="title_en">HOT PRODUCTS </span>
    </h3>
    <div class="carouselBox">
      <ul class="move" ref="move">
        <li
          v-for="(p, index) in products"
          :key="index"
          ref="eachLi"
          @click="toProductInfo(p.id)"
        >
          <img :src="p.pic" alt="" />
          <span class="proName">{{ p.name }}</span>
        </li>
      </ul>
      <div class="btnLeft btn" @click="clickMove(0)">&lt;</div>
      <div class="btnRight btn" @click="clickMove(1)">&gt;</div>
    </div>
  </div>
</template>
<script>
import { _throttle } from "@/utils/index";
export default {
  name: "hotProduct",
  components: "",
  data() {
    return {
      curIndex: 0, // 当前下标
      timer: null, // mover定时器
      products: [],
    };
  },
  created() {
    this.$http
      .get("/hotProducts")
      .then((res) => {
        this.products = res.data.data.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    this.clearTimer();
  },
  methods: {
    toProductInfo(id) {
      this.$router.push({
        path: "/productInfo",
        query: {
          id: id,
        },
      });
    },
    toLearnMore() {
      this.$router.push({
        path: "/searchResult",
        query: {
          whichType: 4,
        },
      });
    },
    move(val = 1) {
      let width = (490 / 1920) * window.innerWidth; // margin共40
      if (val) {
        // 右
        if (this.curIndex + 4 >= this.products.length) {
          this.curIndex = -1;
          this.$refs.move.style.marginLeft = 11.7 + "vw";
        } else {
          this.$refs.move.style.marginLeft =
            this.$refs.move.offsetLeft - width + "px";
          this.curIndex++;
        }
      } else {
        if (this.curIndex == -1) return;
        // 左
        this.$refs.move.style.marginLeft =
          this.$refs.move.offsetLeft + width + "px";
        this.curIndex--;
      }
    },
    clickMove: _throttle(function (val) {
      this.clearTimer();
      this.move(val);
      this.startTimer();
    }, 500),
    startTimer() {
      if (!this.timer) this.timer = setInterval(this.move, 8000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>
<style scoped>
.hotProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f4f5;
}
.title {
  display: flex;
  align-items: center;
  font-size: 2.5vw;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: #333333;
  margin: 7.29vw 0 3.65vw 0;
}
.title .line {
  display: inline-block;
  width: 0.52vw;
  height: 2.66vw;
  background: #333333;
  margin: 0 1.88vw;
}
.carouselBox {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 29vw;
  /* padding: 0 50px; */
  /* overflow: hidden; */
  margin-bottom: 9.38vw;
  overflow: hidden;
}
.btn {
  position: absolute;
  top: 50%;
  font-size: 2.6vw;
  color: #ffffff;
  width: 5.21vw;
  height: 5.21vw;
  text-align: center;
  line-height: 5.21vw;
  background: rgba(0, 0, 0, 0.47);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}
.btn:hover {
  font-size: 3.13vw;
}
.btn.btnLeft {
  left: 5.21vw;
}
.btn.btnRight {
  right: 5.21vw;
}
.carouselBox .move {
  display: flex;
  align-items: center;
  margin-left: -13.8vw;
  transition: 0.5s;
  height: 28.6vw;
}
.carouselBox .move li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.6vw;
  width: 18.23vw;
  height: 20.83vw;
  background: #f6f8fc;
  box-shadow: 0.31vw 0.31vw 1.25vw 0vw rgba(0, 12, 52, 0.13);
  border-radius: 0.26vw;
  margin: 0 1.04vw;
  transition: 0.3s;
  cursor: pointer;
}
.carouselBox .move li img {
  width: 18.23vw;
  height: 9.9vw;
}
.proName {
  font-size: 1.56vw;
  font-family: Microsoft YaHei UI;
  font-weight: 400;
  color: #333;
  margin-top: 4.17vw;
}
.carouselBox .move li:hover {
  background: rgb(41, 116, 184);
  background: linear-gradient(
    0deg,
    rgba(41, 116, 184, 1) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  transform: scale(1.02);
  color: #ffffff;
}
</style>