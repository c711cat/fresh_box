<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg bg-black fixed-top">
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
        <i class="bi bi-list fs-2 px-2 text-primary"></i>
      </button>
      <div
        class="offcanvas offcanvas-start bg-black w-50"
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
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body ps-4">
          <ul class="navbar-nav flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link
                @click="goToUserProducts"
                to="/user-products"
                class="nav-link text-primary"
                :class="{
                  isCurrentNavbarItem: currentPath === '/user-products',
                }"
              >
                所有產品
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/favorite"
                :class="{ isCurrentNavbarItem: currentPath === '/favorite' }"
                class="nav-link text-primary"
              >
                收藏
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/order-list"
                :class="{ isCurrentNavbarItem: currentPath === '/order-list' }"
                class="nav-link text-primary"
              >
                訂單
              </router-link>
            </li>
          </ul>
          <form class="col-lg-4 col-xl-3" role="search">
            <input
              v-if="currentPath === '/order-list'"
              v-model="orderSearchText"
              class="form-control"
              type="search"
              placeholder="Search for name on orders"
              aria-label="Search"
            />
            <input
              v-else
              v-model="productSearchText"
              class="form-control col-1"
              type="search"
              placeholder="Search for product name"
              aria-label="Search"
            />
          </form>
        </div>
      </div>

      <router-link to="/" class="logoTextLink navbar-brand text-center p-0 m-0">
        <span class="logoText text-center text-primary fs-3">FRESH BOX</span>
      </router-link>

      <router-link to="/cart" class="nav-link d-flex flex-row-reverse">
        <div
          style="height: 75px"
          class="h-100 d-flex flex-column align-items-center text-center d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 text-primary"></i>
            <span
              v-if="carts.length >= 1"
              class="sm_cart_num_position translate-middle badge rounded-pill numInCart"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <h5 class="m-0 d-flex align-items-center">
            <span class="amountText sm_amountText text-yellow-light badge"
              >NT$ {{ $filters.currency(undiscountedAmount) }}
            </span>
          </h5>
        </div>

        <div
          class="h-100 d-flex flex-column align-items-center pe-1 d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 iconLink text-primary"></i>
            <span
              v-if="carts.length >= 1"
              class="xs_cart_num_position translate-middle badge rounded-pill numInCart"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <div
            class="m-0 d-flex flex-column justify-content-center align-items-center"
          >
            <span class="amountText xs_amountText badge text-yellow-light"
              >NT$
            </span>
            <span class="amountText xs_amountText badge text-yellow-light"
              >{{ $filters.currency(undiscountedAmount) }}
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
import Offcanvas from "bootstrap/js/dist/offcanvas";
import "bootstrap";
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
      searchInput: false,
    };
  },
  inject: ["emitter"],
  props: {
    currentPath: {},
  },
  watch: {
    productSearchText() {
      this.$router.push("/user-products");
      setTimeout(() => {
        if (this.productSearchText === "") {
          this.emitter.emit("productSearchNull");
        } else {
          this.products.filter((item) => {
            if (item.title.match(this.productSearchText)) {
              this.searchResult.push(item);
            }
          });
          this.emitter.emit("productSearchResult", {
            data: this.searchResult,
            ...this.productSearchText,
          });
          this.searchResult = [];
        }
      }, 1500);
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
        this.emitter.emit("orderSearchResult", {
          data: this.orderSearchResult,
          ...this.orderSearchText,
        });
        this.orderSearchResult = [];
      }
    },
  },
  methods: {
    searchBtn() {
      this.searchInput = !this.searchInput;
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    goToUserProducts() {
      this.emitter.emit("goToUserProducts");
    },
    getOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orderPage = this.orderPage + 1;
          this.orders = res.data.orders;
          if (this.orderPage <= res.data.pagination.total_pages) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`;
            this.$http.get(api).then((res) => {
              this.orders = [...this.orders, ...res.data.orders];
            });
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
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
    const offcanvasElementList = document.querySelectorAll(".offcanvas");
    this.userNavbar = [...offcanvasElementList].map(
      (offcanvasEl) => new Offcanvas(offcanvasEl)
    );
    this.getProducts();
    this.emitter.on("updateProductInCart", () => {
      this.getCart();
    });
    this.emitter.on("clearCart", () => {
      this.getCart();
    });
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
  font-family: "Times New Roman", Times, serif;
}

.iconLink {
  font-weight: 100;
  padding: 7px;
}

.sm_cart_num_position {
  position: absolute;
  top: 14px;
  left: 70px;
}

.xs_cart_num_position {
  position: absolute;
  top: 10px;
  left: 28px;
}

.amountText {
  padding: 5px 0px;
}

.sm_amountText {
  width: 120px;
}

.xs_amountText {
  width: 60px;
}
.numInCart {
  background-color: #f9c406;
  color: #000;
}

.isCurrentNavbarItem {
  font-weight: bold !important;
  color: #f9c406 !important;
}

.text-primary:hover {
  color: #f9c406 !important;
}
</style>
