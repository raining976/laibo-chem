import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
const main = () => import("../views/appMain.vue");
const adminLogIn = () => import("../views/admin/adminLogIn.vue");
const register = () => import("../components/register/register.vue");
const searchResult = () => import("../components/searchProduct/searchResult.vue");
// const productInfo = () => import("../components/searchProduct/productInfo.vue");

const routes = [
  {
    path: "/",
    component: main,
    children: [
      {
        path: "/register",
        component:register,
      },
      {
        path: "/",
        components:{
          table: () => import("../views/mainPage.vue"),
         }
      },
 {
    path: "searchResult",
    name: "searchResult",
    components:{
      table: () => import("../components/searchProduct/searchResult.vue"),
     }
  },
  {
    path: "productInfo",
    name: "productInfo",
    components:{
     table: () => import("../components/searchProduct/productInfo.vue"),
    }
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
