import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },

  {
    path: "/dashboard",
    component: () => import("../views/AdminDashboard.vue"),
    children: [
      {
        path: "login",
        component: () => import("../views/Login.vue"),
      },
      {
        path: "admin's-products",
        component: () => import("../views/Admin'sProducts.vue"),
      },
      {
        path: "coupons",
        component: () => import("../views/Coupons.vue"),
      },
      {
        path: "order-list",
        component: () => import("../views/OrderList.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("../views/UserDashboard.vue"),
    children: [
      {
        path: "user-products",
        component: () => import("../views/UserProducts.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/ProductDetails.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/Cart.vue"),
      },
      {
        path: "favorite",
        component: () => import("../views/Favorite.vue"),
      },
      {
        path: "order/:orderId",
        component: () => import("../views/UserOrder.vue"),
      },
      {
        path: "order-list",
        component: () => import("../views/UserOrderList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
