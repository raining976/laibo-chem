import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
const main = () => import("../views/appMain.vue");
const adminLogIn = () => import("../views/admin/adminLogIn.vue");
const register = () => import("../components/register/register.vue");
const searchResult = () => import("../components/searchProduct/searchResult.vue");
const mainPage = () => import("../views/mainPage.vue")
const productInfo = () => import("../components/searchProduct/productInfo.vue");
const userInfo = () => import("../views/userInfo.vue");


const routes = [
  {
    path: "/",
    component: main,
    redirect: "/mainPage",
    children: [
      {
        path: "/register",
        components:{
          table:register,
        }
      },
      {
        path: "/mainPage",
        components: {
          table: mainPage,
        }
      },
      {
        path: "searchResult",
        name: "searchResult",
        components: {
          table: searchResult,
        }
      },
      {
        path: "productInfo",
        name: "productInfo",
        components: {
          table: productInfo,
        }
      },


      {
        path: "/userInfo",
        component: userInfo,
      }

    ]
  },
  {
    path: "/adminLogIn",
    name: "adminLogIn",
    component: adminLogIn
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
