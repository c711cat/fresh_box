<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="userNavbarBg navbar navbar-expand-lg flex-row-reverse justify-content-between fixed-top"
  >
    <router-link to="/" class="logo">
      <img class="w-100" src="../assets/img/flesh_box_logo.png" alt="" />
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
        <i class="bi bi-list fs-1 px-2"></i>
      </button>
      <router-link
        to="/user/cart"
        class="nav-link d-flex flex-row-reverse col-4 col-sm-3 col-md-3 col-lg"
      >
        <div class="d-flex flex-column align-items-center">
          <div class="position-relative">
            <i class="bi bi-cart2 fs-2 iconLink"></i>
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
              >NT$ {{ undiscountedAmount }}
            </span>
          </h5>
        </div>
      </router-link>
    </div>

    <div class="collapse navbar-collapse col-lg-9" id="user_navbarNav">
      <ul class="navbar-nav px-5 align-items-center">
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
        <form class="ps-4 col-lg-3 col-xl-5" role="search">
          <input
            v-model="searchText"
            class="form-control me-2"
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
* {
  // border: 1px solid;
}
.userNavbarBg {
  background-color: rgb(243, 253, 234);
}

.logo {
  position: absolute;
  width: 75px;
  padding: 0px;
  top: 13%;
  right: 45%;
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
