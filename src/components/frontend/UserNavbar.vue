<template>
  <nav class="navbar navbar-expand-lg bg-black fixed-top">
    <div
      class="d-flex justify-content-between align-items-center flex-wrap col-12 px-3"
    >
      <router-link to="/" class="navbar-brand text-center m-0">
        <span class="logoText text-center text-primary px-1 fs-3">
          FRESH BOX
        </span>
      </router-link>
      <div
        ref="menu"
        class="offcanvas offcanvas-end bg-black"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        data-bs-backdrop="true"
        data-bs-scroll="true"
      >
        <div class="offcanvas-header px-4">
          <router-link
            @click="() => closeMenu()"
            to="/"
            class="ps-2 offcanvas-title logoText text-decoration-none fs-3 text-primary"
            id="offcanvasNavbarLabel"
          >
            FRESH BOX
          </router-link>
          <button
            @click="() => closeMenu()"
            type="button"
            class="bi bi-x-lg btn btn-outline-primary border-0 btn-lg"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body" :class="currentWidth < 992 ? '' : 'px-4'">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item rounded p-0" :class="isMoileOrPc">
              <router-link
                @click="goToUserProducts"
                to="/user-products"
                class="nav-link text-primary py-2 px-3 rounded"
                :class="isCurrentPage('/user-products')"
              >
                所有產品
              </router-link>
            </li>
            <li class="nav-item rounded p-0" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/favorite"
                class="nav-link text-primary py-2 px-3 rounded"
                :class="isCurrentPage('/favorite')"
              >
                收藏
              </router-link>
            </li>
            <li class="nav-item rounded p-0" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/order-list"
                class="nav-link text-primary py-2 px-3 rounded"
                :class="isCurrentPage('/order-list')"
              >
                訂單
              </router-link>
            </li>
            <li class="nav-item rounded p-0" :class="isMoileOrPc">
              <router-link
                @click="() => closeMenu()"
                to="/QA"
                class="nav-link text-primary py-2 px-3 rounded"
                :class="isCurrentPage('/QA')"
              >
                常見問題
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center col">
        <section class="d-flex align-items-center searchContainer">
          <input
            v-if="currentPath === '/order-list'"
            v-model="orderSearchText"
            :disabled="disabledSearchInput"
            type="search"
            class="d-none d-sm-block form-control searchText"
            placeholder="搜尋訂單者姓名"
            aria-label="Search"
          />
          <input
            v-else
            v-model="productSearchText"
            type="search"
            class="d-none d-sm-block form-control searchText"
            placeholder="搜尋產品名稱"
            aria-label="PCSearch"
          />
          <button
            class="d-none d-sm-block btn btn-outline-primary bi bi-search bg-black fs-4 searchBtn border border-0"
            type="button"
          ></button>
        </section>

        <section class="d-block d-sm-none d-flex align-items-center">
          <div
            class="mobileInputBox px-3 offcanvas offcanvas-top bg-black align-items-center justify-content-center"
            id="mobile"
            data-bs-scroll="true"
            data-bs-backdrop="true"
            tabindex="-1"
            aria-labelledby="mobileLabel"
          >
            <div
              v-if="currentPath === '/order-list'"
              class="d-block d-sm-none w-100 mobileInputWrap"
            >
              <input
                v-model="orderSearchText"
                :disabled="disabledSearchInput"
                class="border-0 form-control mobileInput"
                type="search"
                placeholder="搜尋訂單者姓名"
              />
              <i class="bi bi-search mobileSearchIcon"></i>
            </div>
            <div v-else class="d-block d-sm-none w-100 mobileInputWrap">
              <input
                v-model="productSearchText"
                class="border-0 form-control mobileInput"
                type="search"
                placeholder="搜尋產品名稱"
              />
              <i class="bi bi-search mobileSearchIcon"></i>
            </div>
          </div>
          <button
            type="button"
            class="d-block d-sm-none btn btn-outline-primary bi bi-search bg-black fs-4 searchBtn border border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobile"
            aria-controls="mobile"
          ></button>
        </section>

        <router-link to="/cart" class="nav-link px-2">
          <div>
            <div class="h-auto position-relative">
              <i class="bi bi-cart2 fs-2 text-primary"></i>
              <span v-if="carts.length >= 1" class="badge rounded-5 numInCart">
                {{ carts.length }}
              </span>
            </div>
          </div>
        </router-link>
        <button
          @click="close"
          class="navbar-toggler border-0 col-auto m-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list fs-2 px-1 text-primary"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
export default {
  data () {
    return {
      userNavbar: {},
      productSearchText: '',
      orderSearchText: '',
      products: [],
      searchResult: [],
      orderSearchResult: [],
      carts: [],
      orders: [],
      pagination: {},
      orderPage: 1,
      open: false,
      currentWidth: '1000'
    }
  },
  inject: ['emitter'],
  props: {
    currentPath: {}
  },
  watch: {
    productSearchText () {
      this.$router.push('/user-products')
      setTimeout(() => {
        if (this.productSearchText === '') {
          this.emitter.emit('productSearchNull')
        } else {
          this.products.filter((item) => {
            if (item.title.match(this.productSearchText)) {
              this.searchResult.push(item)
            }
          })
          this.emitter.emit('productSearchResult', {
            data: this.searchResult,
            ...this.productSearchText
          })
          this.searchResult = []
        }
      }, 1500)
    },
    orderSearchText () {
      this.orderSearchResult = []
      if (this.orderSearchText === '') {
        this.emitter.emit('orderSearchNull')
      } else {
        this.orders.filter((item) => {
          if (item.user.name.match(this.orderSearchText)) {
            this.orderSearchResult.push(item)
          }
        })
        this.emitter.emit('orderSearchResult', {
          data: this.orderSearchResult,
          ...this.orderSearchText
        })
        this.orderSearchResult = []
      }
    }
  },
  methods: {
    isCurrentPage (path) {
      let className = ''
      if (this.currentPath === path && this.currentWidth < 992) {
        className = 'isCurrentNavbarItem mobileBg'
      }
      if (this.currentPath === path && this.currentWidth >= 992) {
        className = 'isCurrentNavbarItem'
      }
      return className
    },
    closeMenu () {
      this.userNavbar.hide()
    },
    getProducts () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得購物車資料失敗')
        })
    },
    goToUserProducts () {
      this.emitter.emit('goToUserProducts')
      this.closeMenu()
    },
    getOrdersOfPage1 () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`
      this.$http
        .get(api)
        .then((res) => {
          this.orders = res.data.orders
          this.fetchOrdersOfOtherPages(res.data.pagination.total_pages)
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得訂單資料失敗')
        })
    },
    fetchOrdersOfOtherPages (totalPages) {
      this.orderPage = this.orderPage + 1
      if (this.orderPage <= totalPages) {
        const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/orders?page=${this.orderPage}`
        this.$http
          .get(api)
          .then((res) => {
            this.orders = [...this.orders, ...res.data.orders]
            this.fetchOrdersOfOtherPages(totalPages)
          })
          .catch((error) => {
            this.$pushMsg.status404(error.response, '取得訂單資料失敗')
          })
      }
    },
    getCurrentWidth () {
      this.currentWidth = window.innerWidth
    }
  },
  computed: {
    isMoileOrPc () {
      if (this.currentWidth < 992) {
        return 'isMobileItem'
      } else {
        return ''
      }
    },
    disabledSearchInput () {
      if (this.pagination.current_page === this.pagination.total_pages) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.getCurrentWidth()
    this.getOrdersOfPage1()
    this.getCart()
    this.getProducts()
    this.emitter.on('updateProductInCart', () => {
      this.getCart()
    })
    this.emitter.on('clearCart', () => {
      this.getCart()
    })
  },
  mounted () {
    this.userNavbar = new Offcanvas(this.$refs.menu, { toggle: false })
  }
}
</script>

<style lang="scss" scoped>
.logoText {
  width: fit-content;
  font-family: "Times New Roman", Times, serif;
}

.numInCart {
  background-color: #f9c406;
  color: #000;
  position: absolute;
  top: 0px;
  right: -13px;
  font-size: clamp(12px, 1.5vw, 14px);
}

.isCurrentNavbarItem {
  font-weight: bold !important;
  color: #f9c406 !important;
}

.text-primary:hover,
.searchBtn:hover {
  color: #f9c406 !important;
}

.searchText {
  width: 0px;
  padding: 6px 0px;
  transition: 1.5s;
  border: 0px;
}

.searchContainer:hover .searchText {
  width: 200px;
  padding: 6px 12px;
}

.btn-outline-primary:hover {
  background-color: #000;
  color: #f9c406;
}

.isMobileItem {
  color: #f9c406 !important;
}

.isMobileItem:hover,
.mobileBg {
  background-color: #333;
}

.mobileInputBox {
  height: 10%;
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
