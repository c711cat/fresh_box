<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-md bg-light fixed-top">
    <div
      class="col-12 px-3 d-flex justify-content-between align-items-center flex-wrap"
    >
      <button
        class="navbar-toggler border-0 col-auto"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-2 px-2"></i>
      </button>
      <div
        class="offcanvas offcanvas-start w-50"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header px-4">
          <router-link
            to="/"
            class="offcanvas-title logoText text-decoration-none"
            id="offcanvasNavbarLabel"
          >
            FRESH BOX
          </router-link>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body ps-5">
          <ul class="navbar-nav flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link
                to="/dashboard/admin's-products"
                class="nav-link"
                :class="{
                  isCurrentNavbarItem:
                    this.$route.path === `/dashboard/admin's-products`,
                }"
              >
                產品清單
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/dashboard/coupons"
                class="nav-link"
                :class="{
                  isCurrentNavbarItem:
                    this.$route.path === '/dashboard/coupons',
                }"
              >
                優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/dashboard/order-list"
                class="nav-link"
                :class="{
                  isCurrentNavbarItem:
                    this.$route.path === '/dashboard/order-list',
                }"
              >
                訂單
              </router-link>
            </li>
            <li class="nav-item">
              <a @click.prevent="logOut" class="nav-link" href="#"> 登出 </a>
            </li>
          </ul>
        </div>
      </div>
      <router-link
        v-if="currentWidth > 275"
        to="/"
        class="logoTextLink navbar-brand text-center p-0 m-0"
      >
        <span class="logoText text-center">FRESH BOX</span>
      </router-link>
      <form class="col-2 col-sm-3" role="search">
        <input
          v-if="this.$route.path === `/dashboard/admin's-products`"
          v-model="productSearchText"
          class="form-control"
          type="search"
          placeholder="Search for products"
          aria-label="Search"
        />
        <input
          v-if="this.$route.path === '/dashboard/order-list'"
          v-model="orderSearchText"
          class="form-control"
          type="search"
          placeholder="Search for name on orders"
          aria-label="Search"
        />
      </form>
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
    logOut() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/dashboard/login");
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
          this.orders = res.data.orders;
          this.orderPage = this.orderPage + 1;
          if (this.orderPage <= res.data.pagination.total_pages) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
            this.$http.get(api).then((res) => {
              this.orders = [...this.orders, ...res.data.orders];
            });
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
    const offcanvasElementList = document.querySelectorAll(".offcanvas");
    this.adminNavbar = [...offcanvasElementList].map(
      (offcanvasEl) => new Offcanvas(offcanvasEl)
    );
    this.getProducts();
    setTimeout(() => {
      this.isCurrentWidth();
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.logoTextLink {
  width: 1px;
  position: absolute;
  right: 50%;
  display: flex;
  justify-content: center;
}
.logoText {
  width: fit-content;
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
