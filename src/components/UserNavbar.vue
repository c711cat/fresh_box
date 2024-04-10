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
      <form class="d-flex col-8 col-sm-7 col-md-9 col-xl-10 px-1" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success btn-sm" type="submit">
          <i class="bi bi-search"></i>
        </button>
      </form>
      <router-link to="/user/cart" class="nav-link col-auto">
        <i class="bi bi-cart2 fs-2 iconLink"> </i>
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
    };
  },
  created() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.userNavbar = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
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
  background-color: rgb(229, 247, 213);
  padding: 2px;
}

.navbarText:hover {
  background-color: rgb(229, 247, 213);
}

.navbar-toggler:focus {
  box-shadow: none;
}

.bi-list:hover {
  background-color: rgb(229, 247, 213);
}

.bi-cart2 {
  padding: 0px 7px;
}

.iconLink {
  color: rgba(0, 0, 0, 0.65);
  font-weight: 100;
}

.iconLink:hover {
  color: rgb(76, 154, 8);
}
</style>
