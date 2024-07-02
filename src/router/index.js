import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../views/AdminDashboard.vue"),
    children: [
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
        component: () => import("../views/AdminOrderList.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../views/UserDashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "user-products",
        component: () => import("../views/UserProducts.vue"),
      },
      {
        path: "user-products/:currentCategory",
        component: () => import("../views/UserProducts.vue"),
      },
      {
        path: "product/:id",
        component: () => import("../views/ProductDetails.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/CartView.vue"),
      },
      {
        path: "favorite",
        component: () => import("../views/UserProducts.vue"),
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
