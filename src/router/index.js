import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/backend/AdminDashboard.vue"),
    children: [
      {
        path: "admin's-products",
        component: () => import("@/views/backend/Admin'sProducts.vue"),
      },
      {
        path: "coupons",
        component: () => import("@/views/backend/Coupons.vue"),
      },
      {
        path: "order-list",
        component: () => import("@/views/backend/AdminOrderList.vue"),
      },
      {
        path: "admin-QA",
        component: () => import("@/views/backend/AdminQA.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/views/frontend/UserDashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/frontend/Home.vue"),
      },
      {
        path: "user-products",
        component: () => import("@/views/frontend/UserProducts.vue"),
      },
      {
        path: "user-products/:currentCategory",
        component: () => import("@/views/frontend/UserProducts.vue"),
      },
      {
        path: "product/:id",
        component: () => import("@/views/frontend/ProductDetails.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/frontend/CartView.vue"),
      },
      {
        path: "favorite",
        component: () => import("@/views/frontend/UserProducts.vue"),
      },
      {
        path: "order/:orderId",
        component: () => import("@/views/frontend/UserOrder.vue"),
      },
      {
        path: "order-list",
        component: () => import("@/views/frontend/UserOrderList.vue"),
      },
      {
        path: "QA",
        component: () => import("@/views/frontend/UserQA.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
