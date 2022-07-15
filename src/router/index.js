import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
const main = () => import("../views/appMain.vue");
const adminLogIn = () => import("../views/admin/adminLogIn.vue");
const register = () => import("../components/register/register.vue");


const routes = [
  {
    path: "/",
    component: main,
    children: [
      {
        path: "/register",
        component:register,
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
