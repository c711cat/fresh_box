<template>
  <nav class="navbar navbar-expand-lg bg-light fixed-top">
    <div
      class="col-12 px-3 d-flex justify-content-between align-items-center flex-wrap"
    >
      <router-link to="/" class="navbar-brand text-center m-0">
        <span class="logoText text-center px-3 fs-3">FRESH BOX</span>
      </router-link>
      <div
        ref="adminMenu"
        class="offcanvas offcanvas-end"
        id="admin_offcanvasNavbar"
        aria-labelledby="admin_offcanvasNavbarLabel"
        data-bs-backdrop="true"
        data-bs-scroll="true"
        tabindex="-1"
      >
        <div class="offcanvas-header px-4">
          <router-link
            @click="() => closeMenu()"
            to="/"
            class="offcanvas-title logoText text-decoration-none fs-3 px-2"
            id="offcanvasNavbarLabel"
          >
            FRESH BOX
          </router-link>
          <button
            @click="() => closeMenu()"
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body px-3">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item rounded" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/admin's-products"
                class="nav-link px-3 rounded"
                :class="isCurrentPage(`/dashboard/admin's-products`)"
              >
                產品清單
              </router-link>
            </li>
            <li class="nav-item rounded" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/coupons"
                class="nav-link px-3 rounded"
                :class="isCurrentPage('/dashboard/coupons')"
              >
                優惠券
              </router-link>
            </li>
            <li class="nav-item rounded" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/order-list"
                class="nav-link px-3 rounded"
                :class="isCurrentPage('/dashboard/order-list')"
              >
                訂單
              </router-link>
            </li>
            <li class="nav-item rounded" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/dashboard/admin-QA"
                class="nav-link px-3 rounded"
                :class="isCurrentPage('/dashboard/admin-QA')"
              >
                常見問題
              </router-link>
            </li>
            <li class="nav-item rounded" :class="isMoileOrPc">
              <a @click.prevent="logOut" class="nav-link px-3" href="#">
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="col-auto d-flex justify-conten-end align-items-center ms-auto"
      >
        <form
          class="col-auto d-flex align-items-center searchContainer"
          role="search"
        >
          <input
            v-if="$route.path === '/dashboard/order-list'"
            v-model="orderSearchText"
            :disabled="disabledSearchInput"
            class="d-none d-sm-block form-control searchInput"
            type="search"
            placeholder="搜尋訂單者姓名"
            aria-label="Search"
          />
          <input
            v-else
            v-model="productSearchText"
            class="d-none d-sm-block form-control searchInput"
            type="search"
            placeholder="搜尋產品名稱"
            aria-label="Search"
          />
          <button
            type="button"
            class="d-none d-sm-block btn btn-outline-light bi bi-search fs-4 searchBtn border border-0"
          ></button>
        </form>
        <form class="col-auto d-flex align-items-center" role="search">
          <div
            id="mobile-admin"
            class="mobileInputBox px-3 offcanvas offcanvas-top align-items-center justify-content-center"
          >
            <div
              v-if="$route.path === '/dashboard/order-list'"
              class="d-block d-sm-none w-100 mobileInputWrap"
            >
              <input
                v-model="orderSearchText"
                :disabled="disabledSearchInput"
                class="form-control mobileInput"
                type="search"
                placeholder="搜尋訂單者姓名"
                aria-label="Search"
              />
              <i class="bi bi-search mobileSearchIcon"></i>
            </div>
            <div v-else class="d-block d-sm-none w-100 mobileInputWrap">
              <input
                v-model="productSearchText"
                class="form-control mobileInput"
                type="search"
                placeholder="搜尋產品名稱"
                aria-label="Search"
              />
              <i class="bi bi-search mobileSearchIcon"></i>
            </div>
          </div>

          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobile-admin"
            aria-controls="mobile-admin"
            aria-label="Toggle mobile-admin"
            class="d-block d-sm-none mobileSearchBtn btn bi bi-search fs-4 border border-0"
          ></button>
        </form>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#admin_offcanvasNavbar"
          aria-controls="admin_offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list fs-2 px-1"></i>
        </button>
      </div>
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
      pagination: {},
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
    isCurrentPage(path) {
      let className = "";
      if (this.$route.path === path && this.currentWidth < 992) {
        className = "isCurrentNavbarItem mobileBg";
      }
      if (this.$route.path === path && this.currentWidth >= 992) {
        className = "isCurrentNavbarItem";
      }
      return className;
    },
    closeMenu() {
      this.adminNavbar.hide();
    },
    logOut() {
      this.closeMenu();
      const api = `${process.env.VUE_APP_API}v2/logout`;
      this.$http
        .post(api)
        .then(() => {
          this.$router.push("/login");
          this.$pushMsg.status200("已登出");
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, "登出失敗");
        });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, "取得產品資料失敗");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getOrdersOfPage1() {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.fetchOrdersOfOtherPages(res.data.pagination.total_pages);
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, error.response.data.message);
        });
    },
    fetchOrdersOfOtherPages(total_pages) {
      this.orderPage = this.orderPage + 1;
      if (this.orderPage <= total_pages) {
        const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.orderPage}`;
        this.$http
          .get(api)
          .then((res) => {
            this.pagination = res.data.pagination;
            this.orders = [...this.orders, ...res.data.orders];
            this.fetchOrdersOfOtherPages(total_pages);
          })
          .catch((error) => {
            this.$pushMsg.status404(error.response, "取得訂單資料失敗");
          });
      }
    },
    isCurrentWidth() {
      this.currentWidth = window.innerWidth;
    },
  },
  computed: {
    isMoileOrPc() {
      if (this.currentWidth < 992) {
        return "isMobileItem";
      } else {
        return "";
      }
    },
    disabledSearchInput() {
      if (this.pagination.current_page === this.pagination.total_pages) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.getOrdersOfPage1();
    this.getProducts();
    setTimeout(() => {
      this.isCurrentWidth();
    }, 500);
  },
  mounted() {
    this.adminNavbar = new Offcanvas(this.$refs.adminMenu, { toggle: false });
  },
};
</script>

<style lang="scss" scoped>
.logoText {
  color: #000000a6;
  font-family: "Times New Roman", Times, serif;
}

.logoText:hover,
.nav-link:hover,
.bi-list:hover,
.searchBtn:hover,
.mobileSearchBtn:hover {
  color: black;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.isCurrentNavbarItem {
  color: black;
  font-weight: bold;
}

.isMobileItem:hover {
  background-color: #f1f1f1;
}

.mobileBg {
  background-color: #f1f1f1;
}

.searchBtn {
  color: #000000a6;
}

.searchInput {
  width: 0px;
  padding: 10px 0px;
  border-color: #f8f9fa;
}

.searchContainer:hover .searchInput {
  width: 200px;
  padding: 10px 16px;
  transition: 1s;
  border: 1px solid #dee2e6;
}

.mobileInputBox {
  height: 10%;
}

.mobileSearchBtn {
  color: #000000a6;
}

.mobileInput {
  padding-left: 33px;
}

.mobileInputWrap {
  position: relative;
}

.mobileSearchIcon {
  position: absolute;
  bottom: 7px;
  left: 10px;
}
</style>
