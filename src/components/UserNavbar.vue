<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="userNavbarBg navbar navbar-expand-md fixed-top px-5 row m-0 col-12"
  >
    <div class="container-fluid col-md-auto">
      <router-link to="/" class="">
        <img class="logo" src="../assets/img/flesh_box_logo.png" alt="" />
      </router-link>
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
    </div>
    <div class="collapse navbar-collapse col-md-6" id="user_navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            to="/user/user-products"
            class="nav-link text-center navbarText px-4"
            >所有產品
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/user/order-list"
            class="nav-link text-center navbarText px-4"
            >訂單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/user/favorite"
            class="nav-link text-center navbarText px-4"
            >收藏
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="row m-0 px-4 align-items-center justify-content-between col-12 col-md-5"
    >
      <form class="d-flex col-3 col-sm-5 col-md-5 col-xl-7 px-1" role="search">
        <input
          v-model="searchText"
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
      <router-link
        to="/user/cart"
        class="nav-link col-auto d-flex flex-column align-items-center"
      >
        <div class="position-relative">
          <i class="bi bi-cart2 fs-2 iconLink"> </i>
          <span
            v-if="carts.length >= 1"
            class="position-absolute translate-middle badge rounded-pill bg-danger"
          >
            {{ carts.length }}
            <span class="visually-hidden">cart items</span>
          </span>
        </div>

        <h5>
          <span class="badge text-bg-warning"
            >NT$ {{ undiscountedAmount }}</span
          >
        </h5>
      </router-link>
    </div>
  </nav>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
export default {
  data() {
    return {
      userNavbar: {},
      searchText: "",
      products: [],
      searchResult: [],
      carts: [],
    };
  },
  inject: ["emitter"],
  watch: {
    searchText() {
      if (this.searchText === "") {
        this.emitter.emit("userSearchNull");
      } else {
        this.products.filter((item) => {
          if (item.title.match(this.searchText)) {
            this.searchResult.push(item);
          }
        });
        this.emitter.emit("searchResult", this.searchResult);
        this.searchResult = [];
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
.userNavbarBg {
  background-color: rgb(243, 253, 234);
}

.logo {
  width: 75px;
  padding: 0px;
}

.logo:hover {
  cursor: pointer;
  padding: 2px;
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

.iconLink {
  color: #000000a6;
  font-weight: 100;
  padding: 7px;
}

.iconLink:hover {
  color: black;
}

.position-absolute {
  top: 13px;
  left: 38px;
}
</style>
