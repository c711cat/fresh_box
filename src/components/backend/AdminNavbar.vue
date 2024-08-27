<template>
  <nav class="navbar navbar-expand-lg bg-light fixed-top">
    <div
      class="col-12 px-3 d-flex justify-content-between align-items-center flex-wrap"
    >
      <router-link to="/" class="navbar-brand text-center m-0">
        <span class="logoText text-center px-1 fs-3">FRESH BOX</span>
      </router-link>
      <div
        ref="adminMenu"
        class="offcanvas offcanvas-end"
        id="admin_offcanvasNavbar"
        aria-labelledby="admin_offcanvasNavbarLabel"
        data-bs-backdrop="true"
        data-bs-scroll="true"
        tabindex="-1"
      >
        <div class="offcanvas-header px-4">
          <router-link
            @click="() => closeMenu()"
            to="/"
            class="offcanvas-title logoText text-decoration-none fs-3 px-2"
            id="offcanvasNavbarLabel"
          >
            FRESH BOX
          </router-link>
          <button
            @click="() => closeMenu()"
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item rounded-0">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/admin's-products"
                class="nav-link px-3"
                :class="{
                  isCurrentNavbarItem:
                    $route.path === `/dashboard/admin's-products`,
                }"
              >
                產品清單
              </router-link>
            </li>
            <li class="nav-item rounded-0">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/coupons"
                class="nav-link px-3"
                :class="{
                  isCurrentNavbarItem: $route.path === '/dashboard/coupons',
                }"
              >
                優惠券
              </router-link>
            </li>
            <li class="nav-item rounded-0">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/order-list"
                class="nav-link px-3"
                :class="{
                  isCurrentNavbarItem: $route.path === '/dashboard/order-list',
                }"
              >
                訂單
              </router-link>
            </li>
            <li class="nav-item rounded-0">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/admin-QA"
                class="nav-link px-3"
                :class="{
                  isCurrentNavbarItem: $route.path === '/dashboard/admin-QA',
                }"
              >
                常見問題
              </router-link>
            </li>
            <li class="nav-item rounded-0">
              <a @click.prevent="logOut" class="nav-link px-3" href="#">
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-conten-end">
        <form class="col" role="search">
          <input
            v-if="$route.path === `/dashboard/admin's-products`"
            v-model="productSearchText"
            class="form-control"
            type="search"
            placeholder="Search for products"
            aria-label="Search"
          />
          <input
            v-if="$route.path === '/dashboard/order-list'"
            v-model="orderSearchText"
            class="form-control"
            type="search"
            placeholder="Search for name on orders"
            aria-label="Search"
          />
        </form>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#admin_offcanvasNavbar"
          aria-controls="admin_offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list fs-2 px-1"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Offcanvas from "bootstrap/js/dist/offcanvas";
export default {
  data() {
    return {
      adminNavbar: {},
      productSearchText: "",
      orderSearchText: "",
      searchResult: [],
      products: [],
      orderPage: 1,
      orders: [],
      orderSearchResult: [],
      currentWidth: 1000,
    };
  },
  inject: ["emitter"],
  watch: {
    productSearchText() {
      if (this.productSearchText === "") {
        this.emitter.emit("adminSearchProductNull");
      } else {
        Object.values(this.products).filter((item) => {
          if (item.title.match(this.productSearchText)) {
            this.searchResult.push(item);
          }
          this.emitter.emit("adminSearchProductResult", {
            data: this.searchResult,
            data2: this.productSearchText,
          });
        });
        this.searchResult = [];
      }
    },
    orderSearchText() {
      this.orderSearchResult = [];
      if (this.orderSearchText === "") {
        this.emitter.emit("adminOrderSearchNull");
      } else {
        this.orders.filter((item) => {
          if (item.user.name.match(this.orderSearchText)) {
            this.orderSearchResult.push(item);
          }
        });
        this.emitter.emit("adminOrderSearchResult", {
          data: this.orderSearchResult,
          ...this.orderSearchText,
        });
        this.orderSearchResult = [];
      }
    },
  },
  methods: {
    closeMenu() {
      this.adminNavbar.hide();
    },
    logOut() {
      this.closeMenu();
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/login");
            this.$pushMsg.status200(res, "已登出");
          } else {
            this.$pushMsg.status200(res, "登出失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.orderPage = this.orderPage + 1;
            if (this.orderPage <= res.data.pagination.total_pages) {
              const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
              this.$http.get(api).then((res) => {
                this.orders = [...this.orders, ...res.data.orders];
              });
            }
          } else {
            this.$pushMsg.status404(res.data.message);
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    isCurrentWidth() {
      this.currentWidth = window.innerWidth;
    },
  },
  created() {
    this.getOrders();

    this.getProducts();
    setTimeout(() => {
      this.isCurrentWidth();
    }, 500);
  },
  mounted() {
    this.adminNavbar = new Offcanvas(this.$refs.adminMenu, { toggle: false });
  },
};
</script>

<style lang="scss" scoped>
* {
  border: 1px solid;
}
.logoText {
  color: #000000a6;
  font-family: "Times New Roman", Times, serif;
}

.logoText:hover,
.nav-link:hover,
.bi-list:hover {
  color: black;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.isCurrentNavbarItem {
  color: black;
  font-weight: bold;
}
</style>
