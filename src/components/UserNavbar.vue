<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="navbarBg navbar navbar-expand-lg flex-row-reverse justify-content-between fixed-top"
  >
    <router-link
      to="/"
      class="logo logo_lg d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block"
    >
      <img class="w-100" src="../assets/img/logo_light_font.png" alt="" />
    </router-link>
    <router-link
      to="/"
      class="logo logo_md d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none"
    >
      <img class="w-100" src="../assets/img/logo_light_font.png" alt="" />
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
      <router-link
        to="/user/cart"
        class="nav-link d-flex flex-row-reverse col-1 col-sm-1 col-md-1 col-lg"
      >
        <div
          style="height: 75px"
          class="h-100 d-flex flex-column align-items-center"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 iconLink"></i>
            <span
              v-if="carts.length >= 1"
              class="position-absolute translate-middle badge rounded-pill bg-danger"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <h5 class="m-0 d-flex align-items-center">
            <span class="badge text-bg-warning"
              >NT$ {{ undiscountedAmount }}
            </span>
          </h5>
        </div>
      </router-link>
    </div>

    <div class="collapse navbar-collapse col-lg-11" id="user_navbarNav">
      <ul class="navbar-nav px-5 align-items-center col-lg-6">
        <li class="nav-item col-12 col-lg-auto ps-4 pe-2">
          <router-link
            to="/user/user-products"
            class="nav-link text-center navbarText"
            >所有產品
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link
            to="/user/order-list"
            class="nav-link text-center navbarText"
            >訂單
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link
            to="/user/favorite"
            class="nav-link text-center navbarText"
            >收藏
          </router-link>
        </li>
        <form class="col-12 col-lg-5 col-xl-5 ps-4" role="search">
          <input
            v-model="searchText"
            class="form-control searchText"
            type="search"
            placeholder="Search"
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
.navbarBg {
  background-color: #727272;
}

.logo {
  position: absolute;
  width: 75px;
  padding: 0px;
  top: 5px;
}

.logo_lg {
  right: 48%;
}

.logo_md {
  right: 45%;
}

.logo:hover {
  cursor: pointer;
  padding: 2px;
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
  color: black;
}

.iconLink {
  color: #ccaf3c;
  font-weight: 100;
  padding: 7px;
}

.iconLink:hover {
  color: rgb(249, 196, 6);
}

.position-absolute {
  top: 13px;
  left: 38px;
}
</style>
