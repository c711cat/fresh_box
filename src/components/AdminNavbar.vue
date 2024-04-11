<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="bg-body-tertiary navbar navbar-expand-md fixed-top px-5 row m-0 col-12"
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
    <div class="collapse navbar-collapse col-md-8" id="user_navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            to="/dashboard/admin's-products"
            class="nav-link text-center navbarText px-4"
            >產品清單
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard/coupons"
            class="nav-link text-center navbarText px-4"
            >優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/dashboard/order-list"
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
      </ul>
    </div>
    <div
      class="row m-0 align-items-center justify-content-center col-12 col-md-3"
    >
      <form class="d-flex col-9 col-md-12" role="search">
        <input
          v-model="searchText"
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          @click="search"
          class="btn btn-outline-secondary btn-sm"
          type="submit"
        >
          <i class="bi bi-search"></i>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";
export default {
  data() {
    return {
      adminNavbar: {},
      searchText: "",
      searchResult: [],
      products: [],
    };
  },
  inject: ["emitter"],
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
    search() {
      Object.values(this.products).filter((item) => {
        if (item.title.match(this.searchText)) {
          this.searchResult.push(item);
        }
        this.emitter.emit("adminSearchResult", this.searchResult);
      });
      this.searchResult = [];
    },
  },
  created() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.adminNavbar = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
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

.logOutLink:hover {
  cursor: pointer;
}
</style>
