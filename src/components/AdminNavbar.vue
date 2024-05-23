<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="bg-body-tertiary navbar navbar-expand-lg fixed-top row m-0 col-12"
  >
    <div class="container-fluid col-lg-auto">
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#user_navbarNav"
        aria-controls="user_navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-1 px-2"></i>
      </button>
      <router-link
        to="/"
        class="logoText text-decoration-none text-center fs-4"
      >
        FRESH BOX
      </router-link>
    </div>
    <div class="collapse navbar-collapse" id="user_navbarNav">
      <ul class="navbar-nav col-lg-10">
        <li class="nav-item">
          <router-link
            to="/dashboard/admin's-products"
            :class="{
              isCurrentNavbarItem:
                this.$route.path === `/dashboard/admin's-products`,
            }"
            class="nav-link text-center navbarText px-4"
            >產品清單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard/coupons"
            :class="{
              isCurrentNavbarItem: this.$route.path === '/dashboard/coupons',
            }"
            class="nav-link text-center navbarText px-4"
            >優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard/order-list"
            :class="{
              isCurrentNavbarItem: this.$route.path === '/dashboard/order-list',
            }"
            class="nav-link text-center navbarText px-4"
            >訂單
          </router-link>
        </li>
        <li class="nav-item">
          <a
            @click.prevent="logOut"
            class="logOutLink nav-link text-center navbarText px-4"
            >登出</a
          >
        </li>
        <li class="nav-item col-lg-5 col-xl-4">
          <form class="px-4" role="search">
            <input
              v-if="this.$route.path === `/dashboard/admin's-products`"
              v-model="productSearchText"
              class="form-control me-2"
              type="search"
              placeholder="Search for products"
              aria-label="Search"
            />
            <input
              v-if="this.$route.path === '/dashboard/order-list'"
              v-model="orderSearchText"
              class="form-control me-2"
              type="search"
              placeholder="Search for name on orders"
              aria-label="Search"
            />
          </form>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
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
          this.emitter.emit("adminSearchProductResult", this.searchResult);
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
        this.emitter.emit("adminOrderSearchResult", this.orderSearchResult);
      }
    },
  },
  methods: {
    logOut() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api).then((res) => {
        this.$pushMsg(res, "登出");
        if (res.data.success) {
          this.$router.push("/dashboard/login");
        }
      });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.products = res.data.products;
        window.scrollTo(0, -100);
      });
    },
    getOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
      this.$http.get(api).then((res) => {
        this.orders = res.data.orders;
        this.orderPage = this.orderPage + 1;
        if (this.orderPage <= res.data.pagination.total_pages) {
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
          this.$http.get(api).then((res) => {
            this.orders = [...this.orders, ...res.data.orders];
          });
        }
      });
    },
  },
  created() {
    this.getOrders();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.adminNavbar = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.logoText {
  width: 170px;
  color: #000000a6;
  font-family: "Times New Roman", Times, serif;
}

.logoText:hover {
  cursor: pointer;
  color: black;
}

.navbarText:hover {
  font-weight: bold;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.bi-list:hover {
  color: black;
}

.logOutLink:hover {
  cursor: pointer;
}

.isCurrentNavbarItem {
  color: black;
  font-weight: bold;
}
</style>
