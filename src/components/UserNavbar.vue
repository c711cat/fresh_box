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
        class="fs-5 pt-1 pe-3 logoText d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
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
        <div
          style="height: 75px"
          class="h-100 d-flex flex-column align-items-center"
        >
          <div class="h-auto position-relative">
            <i class="bi bi-cart2 fs-2 iconLink"></i>
            <span
              v-if="carts.length >= 1"
              class="position-absolute translate-middle badge rounded-pill numInCart"
            >
              {{ carts.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </div>

          <h5 class="m-0 d-flex align-items-center">
            <span class="amountText badge">NT$ {{ undiscountedAmount }} </span>
          </h5>
        </div>
      </router-link>
    </div>

    <div class="collapse navbar-collapse col-lg-11" id="user_navbarNav">
      <ul class="navbar-nav px-5 align-items-center col-lg-6">
        <li class="nav-item col-12 col-lg-auto ps-4 pe-2">
          <router-link
            to="/user-products"
            class="nav-link text-center navbarText"
            >所有產品
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link to="/order-list" class="nav-link text-center navbarText"
            >訂單
          </router-link>
        </li>
        <li class="nav-item col-12 col-lg-auto px-2">
          <router-link to="/favorite" class="nav-link text-center navbarText"
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
  background-color: #000;
}

.logoRouterLink {
  width: 1px;
  position: absolute;
  right: 50%;
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

.form-control:focus {
  border-color: #ccaf3c;
  box-shadow: 0 0 0 0.25rem rgb(249, 196, 6, 0.25);
}

.amountText {
  width: 120px;
  color: rgb(249, 196, 6);
}

.numInCart {
  background-color: rgb(249, 196, 6);
  color: #000;
}
</style>
