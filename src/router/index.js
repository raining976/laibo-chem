import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
const main = () => import("../views/appMain.vue");
const adminLogIn = () => import("../views/admin/adminLogIn.vue");
const searchHead = () => import("../components/main/search.vue");
const register = () => import("../components/register/register.vue");
const searchResult = () => import("../views/searchResult.vue");
const mainPage = () => import("../views/mainPage.vue")
const productInfo = () => import("../components/searchProduct/productInfo.vue");
// 用户信息页
const userInfo = () => import("../views/userInfo.vue");
const cart = () => import("../components/userInfo/shopCart.vue");
const order = () => import("../components/userInfo/myOrder.vue");
const team = () => import("../components/userInfo/team.vue");
const address = () => import("../components/userInfo/receiveAddress.vue");
const changePsd = () => import("../components/userInfo/changePsd.vue");
const info = () => import("../components/userInfo/userInfoChange.vue");
// 新闻/文章页
const moreNewsArticle = () => import("../views/toMoreNewsArticle/moreNewsArtcle.vue")



const routes = [
  {
    path: "/",
    component: main,
    redirect: "/mainPage",
    children: [
      {
        path: "/register",
        components: {
          table: register,
        }
      },
      {
        path: "/searchHead",
        components: {
          search: searchHead,
        }
      },
      {
        name: 'mainPage',
        path: "/mainPage",
        components: {
          table: mainPage,
          search: searchHead,
        }
      },
      {
        path: "searchResult",
        name: "searchResult",
        components: {
          table: searchResult,
          search: searchHead,
        }
      },
      {
        path: "productInfo",
        name: "productInfo",
        components: {
          table: productInfo,
          search: searchHead,
        }
      },
      {
        path: "moreNewsArticle",
        name: "moreNewsArticle",
        components: {
          table: moreNewsArticle,
          search: searchHead,
        }
      },
      {
        path: "/userInfo",
        components: {
          table: userInfo,
        },
        redirect: "/cart",
        children: [
          {
            path: '/cart',
            name: 'cart',
            component: cart,
          },
          {
            path: '/order',
            name: 'order',
            component: order,
          },
          {
            path: '/team',
            name: 'team',
            component: team,
          },
          {
            path: '/address',
            name: 'address',
            component: address,
          },
          {
            path: '/info',
            name: 'info',
            component: info,
          },
          {
            path: '/changePsd',
            name: 'changePsd',
            component: changePsd,
          },
        ],
      },
    ]
  },
  {
    path: "/adminLogIn",
    name: "adminLogIn",
    component: adminLogIn,
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
