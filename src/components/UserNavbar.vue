<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="navbarBg navbar navbar-expand-lg flex-row-reverse justify-content-between fixed-top"
  >
    <router-link
      to="/"
      class="align-baseline text-center text-decoration-none logoRouterLink"
    >
      <!-- sm（含）以上可見 -->
      <span
        class="fs-3 logoText d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        FRESH BOX
      </span>
      <!-- xs 可見：字體縮小 及 調整視覺置中 -->
      <span
        class="fs-5 pt-2 logoText d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
      >
        FRESH BOX
      </span>
    </router-link>
    <div class="container-fluid">
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#user_navbarNav"
        aria-controls="user_navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-1 px-2 navbarText"></i>
      </button>
      <router-link to="/cart" class="nav-link d-flex flex-row-reverse">
        <!-- 購物車 sm 以上版面 -->
        <div
          style="height: 75px"
          class="h-100 d-flex flex-column align-items-center text-center d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 iconLink"></i>
            <span
              v-if="carts.length >= 1"
              class="xs_cart_num_position translate-middle badge rounded-pill numInCart"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <h5 class="m-0 d-flex align-items-center">
            <span class="amountText sm_amountText badge"
              >NT$ {{ $filters.currency(undiscountedAmount) }}
            </span>
          </h5>
        </div>
        <!-- 購物車 xs 以下版面 -->
        <div
          class="h-100 d-flex flex-column align-items-center pe-1 d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 iconLink"></i>
            <span
              v-if="carts.length >= 1"
              class="sm_cart_num_position translate-middle badge rounded-pill numInCart"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <div
            class="m-0 d-flex flex-column justify-content-center align-items-center"
          >
            <span class="amountText xs_amountText badge">NT$ </span>
            <span class="amountText xs_amountText badge"
              >{{ $filters.currency(undiscountedAmount) }}
            </span>
          </div>
        </div>
      </router-link>
    </div>

    <div class="collapse navbar-collapse col-lg-11" id="user_navbarNav">
      <ul class="navbar-nav px-5 align-items-center col-lg-6">
        <li class="nav-item col-12 col-lg-auto ps-4 pe-2">
          <router-link
            @click="goToUserProducts"
            to="/user-products"
            :class="{ isCurrentNavbarItem: currentPath === '/user-products' }"
            class="nav-link text-center navbarText"
            >所有產品
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link
            to="/order-list"
            :class="{ isCurrentNavbarItem: currentPath === '/order-list' }"
            class="nav-link text-center navbarText"
            >訂單
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link
            to="/favorite"
            :class="{ isCurrentNavbarItem: currentPath === '/favorite' }"
            class="nav-link text-center navbarText"
            >收藏
          </router-link>
        </li>
        <form class="col-12 col-lg-5 col-xl-5 ps-4" role="search">
          <input
            v-if="currentPath === '/user-products'"
            v-model="productSearchText"
            class="form-control searchText"
            type="search"
            placeholder="Search product name"
            aria-label="Search"
          />
          <input
            v-if="currentPath === '/order-list'"
            v-model="orderSearchText"
            class="form-control searchText"
            type="search"
            placeholder="Search order name"
            aria-label="Search"
          />
        </form>
      </ul>
    </div>
  </nav>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
export default {
  data() {
    return {
      userNavbar: {},
      productSearchText: "",
      orderSearchText: "",
      products: [],
      searchResult: [],
      orderSearchResult: [],
      carts: [],
      orders: [],
      orderPage: 1,
      ordersPageContent: {},
    };
  },
  inject: ["emitter"],
  props: {
    currentPath: {},
  },
  watch: {
    productSearchText() {
      if (this.productSearchText === "") {
        this.emitter.emit("productSearchNull");
      } else {
        this.products.filter((item) => {
          if (item.title.match(this.productSearchText)) {
            this.searchResult.push(item);
          }
        });
        this.emitter.emit("productSearchResult", this.searchResult);
        this.searchResult = [];
      }
    },
    orderSearchText() {
      this.orderSearchResult = [];
      if (this.orderSearchText === "") {
        this.emitter.emit("orderSearchNull");
      } else {
        this.orders.filter((item) => {
          if (item.user.name.match(this.orderSearchText)) {
            this.orderSearchResult.push(item);
          }
        });
        this.emitter.emit("orderSearchResult", this.orderSearchResult);
        this.orderSearchResult = [];
      }
    },
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
      });
    },
    goToUserProducts() {
      this.emitter.emit("goToUserProducts");
    },
    getOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`;
      this.$http.get(api).then((res) => {
        this.orderPage = this.orderPage + 1;
        this.orders = res.data.orders;
        this.ordersPageContent = res.data.pagination;

        if (this.orderPage <= this.ordersPageContent.total_pages) {
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`;
          this.$http.get(api).then((res) => {
            this.orders = [...this.orders, ...res.data.orders];
          });
        }
      });
    },
  },
  computed: {
    undiscountedAmount() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.total;
      });
      return total;
    },
  },
  created() {
    this.getOrders();
    this.getCart();
    this.getProducts();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.userNavbar = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
    this.getProducts();
    this.emitter.on("updateProductInCart", () => {
      this.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.navbarBg {
  background-color: #000;
}

.logoRouterLink {
  width: 1px;
  position: absolute;
  right: 50%;
  top: 40px;
}

.logoText {
  position: absolute;
  margin: -19px -80px;
  width: 170px;
  font-family: "Times New Roman", Times, serif;
  color: #ccaf3c;
}

.logoText:hover {
  cursor: pointer;
  color: rgb(249, 196, 6);
}

.navbarText {
  color: #ccaf3c;
}

.searchText {
  color: #ccaf3c;
}

.navbarText:hover {
  color: rgb(249, 196, 6);
  font-weight: bolder;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.bi-list:hover {
  color: rgb(249, 196, 6);
}

.iconLink {
  color: #ccaf3c;
  font-weight: 100;
  padding: 7px;
}

.iconLink:hover {
  color: rgb(249, 196, 6);
}

.xs_cart_num_position {
  position: absolute;
  top: 14px;
  left: 70px;
}

.sm_cart_num_position {
  position: absolute;
  top: 10px;
  left: 28px;
}

.form-control:focus {
  border-color: #ccaf3c;
  box-shadow: 0 0 0 0.25rem rgb(249, 196, 6, 0.25);
}

.form-control:focus-visible {
  outline: 2px solid #ccaf3c;
  box-shadow: 0 0 0 0.25rem rgb(249, 196, 6, 0.25);
}

.amountText {
  padding: 5px 0px;
  color: rgb(249, 196, 6);
}

.sm_amountText {
  width: 120px;
}

.xs_amountText {
  width: 60px;
}
.numInCart {
  background-color: rgb(249, 196, 6);
  color: #000;
}

.isCurrentNavbarItem {
  color: rgb(249, 196, 6);
}
* {
  // border: 1px solid;
}
</style>
