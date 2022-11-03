// import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory } from "vue-router";
// 路由懒加载
// const searchHead = () => import("../components/main/search.vue");
const register = () => import("../components/register/register.vue");
const searchResult = () => import("../views/searchResult.vue");
const mainPage = () => import("../views/mainPage.vue")
const productInfo = () => import("../components/searchProduct/productInfo.vue");
// 用户信息页
const userInfo = () => import("../views/userInfo.vue");
const cart = () => import("../components/userInfo/shopCart.vue");
const setOrder = () => import("../components/userInfo/setOrder.vue");
const payment = () => import("../components/userInfo/payment.vue");
const orderSuccess = () => import("../components/userInfo/orderSuccess.vue");
const order = () => import("../components/userInfo/myOrder.vue");
const orderInfo = () => import("../components/userInfo/orderInfo.vue");
const team = () => import("../components/userInfo/team.vue");
const address = () => import("../components/userInfo/receiveAddress.vue");
const changePsd = () => import("../components/userInfo/changePsd.vue");
const info = () => import("../components/userInfo/userInfoChange.vue");
// 订单审核
const orderReview = () => import("../components/userInfo/orderReview.vue");
// 团队管理
const teamBlank = () => import("../components/teamPage/blank.vue");
const joinTeam = () => import("../components/teamPage/joinTeam.vue");
const createTeam = () => import("../components/teamPage/createTeam.vue");
const editTeam = () => import("../components/teamPage/editTeam.vue");
const searchMember = () => import("../components/teamPage/searchMember.vue");

// 新闻/文章页
const moreNewsArticle = () => import("../views/toMoreNewsArticle/moreNewsArtcle.vue")
const content = () => import("../views/toMoreNewsArticle/content.vue");

// 404
const notFound = () => import('../views/notFound/notFound.vue')
const routes = [

  {
    path: "/register",
    component: register,
    
  },
  // 重定向
  {
    path: "/",
    redirect: "/mainPage"
  },
  {
    name: 'mainPage',
    path: "/mainPage",
    meta: {
      title: 'Home'
    },
    component: mainPage,

  },
  {
    path: "/searchResult",
    name: "searchResult",
    component: searchResult,
  },
  {
    path: "/productInfo",
    name: "productInfo",
    component: productInfo,
  },
  {
    path: "/moreNewsArticle",
    name: "moreNewsArticle",
    component: moreNewsArticle,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: "/content/:id",
    name: "content",
    component: content,

  },
  {
    path: "/userInfo",
    component: userInfo,

    meta: { requiresAuth: true },
    redirect: "/cart",
    children: [
      {
        path: '/cart',
        name: 'cart',
        component: cart,
        meta: { requiresAuth: true },
      },
      {
        path: '/setOrder',
        name: 'setOrder',
        component: setOrder,
        meta: { requiresAuth: true },
      },
      {
        path: '/payment',
        name: 'payment',
        component: payment,
        meta: { requiresAuth: true },
      },
      {
        path: "/orderSuccess/:id",
        name: "orderSuccess",
        component: orderSuccess,
        meta: { requiresAuth: true },
      },
      {
        path: '/order',
        name: 'order',
        component: order,
        meta: { requiresAuth: true },
      },
      {
        path: '/orderInfo/:id',
        name: 'orderInfo',
        component: orderInfo,
        meta: { requiresAuth: true },
      },
      {
        path: '/team',
        name: 'team',
        redirect: "/teamBlank",
        component: team,
        meta: { requiresAuth: true },
        children: [
          {
            path: '/teamBlank',
            name: 'teamBlank',
            component: teamBlank,
            meta: { requiresAuth: true },
          },
          {
            path: '/joinTeam',
            name: 'joinTeam',
            component: joinTeam,
            meta: { requiresAuth: true },
          },
          {
            path: '/createTeam',
            name: 'createTeam',
            component: createTeam,
            meta: { requiresAuth: true },
          },
          {
            path: '/editTeam',
            name: 'editTeam',
            component: editTeam,
            meta: { requiresAuth: true },
          },
          {
            path: '/searchMember',
            name: 'searchMember',
            component: searchMember,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/address',
        name: 'address',
        component: address,
        meta: { requiresAuth: true },
      },
      {
        path: '/info',
        name: 'info',
        component: info,
        meta: { requiresAuth: true },
      },
      {
        path: '/changePsd',
        name: 'changePsd',
        component: changePsd,
        meta: { requiresAuth: true },
      },
      {
        path: '/orderReview',
        name: 'orderReview',
        component: orderReview,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/404',
    name: 'notFound',
    meta: {
      title: 'Page not found',
      isNotFound: true,
    },
    component: notFound
  },
  // 所有未定义路由，全部重定向到404页，必须放在最后
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});




// 路由拦截器
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem("token")
    if (!token) {  // 没登录
      // this.$root.key++
      // this.$root.isShowLogIn = true
      // alert("请先登录!");
      // ElMessage("请先登录!")
      window.openLogin()
      // next({
      //   path: '/',
      // })
    } else {
      next()  // 确保一定要调用 next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router;
