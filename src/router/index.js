import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
const main = () => import("../views/appMain.vue");

const routes = [
  {
    path: "/",
    name: "main",
    // redirect:"/main",
    component: main
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
