<template>
  <LoadingView v-if="isLoading" />
  <main
    v-else
    class="mx-auto col-11 col-xxl-9 d-flex flex-wrap productsContainer"
  >
    <div
      class="mx-auto mb-3 col-11 col-sm-3 col-lg-2 col-xxl-2"
      :class="{
        'sticky-top stickyTopXs': currentWidth < 576,
        miniWidth: currentWidth < 306,
      }"
    >
      <!-- sm以上 -->
      <section class="d-none d-sm-block list-group sticky-top stickyTopSm">
        <button
          @click="goToAllProducts"
          class="list-group-item list-group-item-action"
          :class="{ active: $route.path === '/user-products' }"
          :aria-current="$route.path === '/user-products'"
          type="button"
        >
          所有類別
        </button>
        <button
          @click="goToTheCategory(item)"
          v-for="item in categoryList"
          :key="item"
          class="list-group-item list-group-item-action"
          :class="{ active: $route.params.currentCategory === item }"
          :aria-current="$route.params.currentCategory === item"
          type="button"
        >
          {{ item }}
        </button>
      </section>
      <!-- xs -->
      <section
        class="bg-white d-block d-sm-none d-flex flex-wrap justify-content-between col-12"
      >
        <button
          @click="goToAllProducts"
          type="button"
          class="btn btnXs m-1 flex-fill"
          :class="{ activeBtnXs: $route.path === '/user-products' }"
        >
          所有類別
        </button>
        <button
          @click="goToTheCategory(item)"
          v-for="item in categoryList"
          :key="item"
          type="button"
          class="btn btnXs m-1 flex-fill"
          :class="{ activeBtnXs: $route.params.currentCategory === item }"
        >
          {{ item }}
        </button>
      </section>
    </div>
    <div class="mx-auto col-11 col-sm-9 col-lg-10 col-xxl-10">
      <section v-if="noResults" class="mt-4 text-center">
        <h3>查無相符商品</h3>
      </section>
      <section v-if="noFavorites" class="mt-4 text-center">
        <h3 class="mb-4">目前無收藏的商品</h3>
        <button
          @click="goToAllProducts"
          class="btn btn-outline-primary"
          type="button"
        >
          繼續逛逛
        </button>
      </section>
      <div class="d-flex flex-wrap col-12">
        <section
          v-for="item in allProducts"
          :key="item.id"
          class="col-12 col-sm-6 col-lg-4 col-xxl-3"
          :class="{ 'ps-4': currentWidth >= 576 }"
        >
          <div @click="goToProduct(item)" class="card mx-auto mb-4">
            <h3
              v-if="isMyFavorite(item)"
              @click.stop="delMyFavorite(item)"
              class="bi bi-suit-heart-fill delmyFavoriteIcon position-absolute z-1"
            ></h3>

            <h3
              v-else
              @click.stop="addMyFavorite(item)"
              class="bi bi-suit-heart myFavoriteIcon position-absolute z-1"
            ></h3>
            <div class="position-relative">
              <img :srcset="`${item.imageUrl}&w=450`" class="card-img-top" />
            </div>

            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between">
                  <h5
                    class="card-title d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
                  >
                    {{ item.title }}
                  </h5>
                  <h5
                    class="card-title xs_title_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
                  >
                    {{ item.title }}
                  </h5>

                  <span
                    v-if="item.buyQty >= 1"
                    class="badge text-bg-danger rounded-pill fs-6 d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
                  >
                    {{ item.buyQty }}
                  </span>
                  <span
                    v-if="item.buyQty >= 1"
                    class="badge text-bg-danger rounded-pill xs_text d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
                  >
                    {{ item.buyQty }}
                  </span>
                </div>

                <p
                  class="card-text d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
                >
                  {{ item.content }} / {{ item.unit }}
                </p>
                <p
                  class="card-text xs_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
                >
                  {{ item.content }} / {{ item.unit }}
                </p>
                <div
                  class="priceContainer d-flex justify-content-between flex-wrap mb-2"
                >
                  <strong
                    class="col-12 col-sm-auto card-text text-secondary fs-6 d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
                    :class="{
                      'text-decoration-line-through':
                        item.price !== item.origin_price,
                    }"
                  >
                    NT$ {{ $filters.currency(item.origin_price) }}
                  </strong>

                  <strong
                    class="col-12 col-sm-auto card-text text-secondary xs_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
                    :class="{
                      'text-decoration-line-through':
                        item.price !== item.origin_price,
                    }"
                  >
                    NT$ {{ $filters.currency(item.origin_price) }}
                  </strong>

                  <strong
                    v-if="item.price !== item.origin_price"
                    class="col-12 col-sm-auto card-text text-danger fs-6 d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
                    >NT$ {{ $filters.currency(item.price) }}
                  </strong>

                  <strong
                    v-if="item.price !== item.origin_price"
                    class="col-12 col-sm-auto card-text text-danger xs_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
                    >NT$ {{ $filters.currency(item.price) }}
                  </strong>
                </div>
              </div>
              <button
                @click.stop="addCart(item)"
                :disabled="item.id === status.addLoadingItem"
                type="button"
                class="btn btn-light addBtn"
              >
                <div
                  v-if="item.id === status.addLoadingItem"
                  class="spinner-border text-light spinner-grow-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p v-else class="mb-0">加入購物車</p>
              </button>
            </div>
          </div>
        </section>
        <ObserverView
          v-if="
            pagination.current_page < pagination.total_pages &&
            $route.path === '/user-products'
          "
          @is-in-view="handleIsInView"
          @is-outside-view="handleIsOutsideView"
          class="mb-4"
        />
        <div
          v-if="pagination.current_page === pagination.total_pages"
          class="w-100 text-secondary text-center mb-4"
        >
          <p class="mb-0 noMore">已無更多商品</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ObserverView from '@/components/frontend/ObserverView.vue'
import { throttle } from 'lodash'
import { localStorageHelper } from '@/utils/localStorage'
export default {
  data () {
    return {
      isLoading: false,
      newPage: [],
      allProducts: [],
      pagination: {
        current_page: 1,
        total_pages: 0
      },
      isInView: false,
      carts: [],
      status: {
        addLoadingItem: '',
        delLoadingItem: ''
      },
      myFavoriteList: [],
      categoryList: ['葉菜', '瓜果根球莖', '菇菌', '水果', '辛香料'],
      forCategoryAllProducts: [],
      currentCategory: '選擇類別',
      searchText: '',
      searchResult: [],
      currentWidth: 1000
    }
  },
  components: { ObserverView },
  inject: ['emitter'],
  methods: {
    getOtherPageProductsThrottled: throttle(
      function () {
        if (this.isInView && this.pagination.current_page < this.pagination.total_pages) {
          const nextPage = this.pagination.current_page + 1
          this.fetchProducts(nextPage)
        }
      },
      500,
      { leading: true, trailing: true }
    ),
    fetchProducts (page) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          const { pagination, products } = res.data
          this.pagination = { ...pagination }
          this.newPage = [...products]
          this.allProducts = [...this.allProducts, ...this.newPage]
          this.allProducts.forEach((item) => {
            this.carts.forEach((cartItem) => {
              if (item.id === cartItem.product_id) {
                item.buyQty = cartItem.qty
                item.pushCartId = cartItem.id
              }
            })
          })
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
    },
    whereComeFrom () {
      if (this.$route.params.currentCategory) {
        this.chooseCategory(this.$route.params.currentCategory)
        this.getCart()
      } else {
        if (this.$route.path === '/favorite') {
          this.getCart()
          setTimeout(() => {
            this.allProducts = this.myFavoriteList
            this.pushBuyQtyId()
            this.isLoading = false
          }, 3000)
        } else {
          this.getCart()
          setTimeout(() => {
            this.getPage1Products()
            this.getOtherPageProductsThrottled()
          }, 600)
        }
      }
    },
    getMyFavorite () {
      this.myFavoriteList = localStorageHelper.get('myFavorite') || []
      this.myFavoriteList.forEach((item) => {
        item.buyQty = 0
      })
    },
    isMyFavorite (item) {
      let favorite = ''
      this.myFavoriteList.forEach((listItem) => {
        if (item.id === listItem.id) {
          favorite = true
        }
      })
      return favorite
    },
    addMyFavorite (addItem) {
      this.myFavoriteList.push(addItem)
      localStorageHelper.set('myFavorite', this.myFavoriteList)
    },
    delMyFavorite (delItem) {
      this.myFavoriteList.forEach((item, index) => {
        if (delItem.id === item.id) {
          return this.myFavoriteList.splice(index, 1)
        }
      })
      localStorageHelper.set('myFavorite', this.myFavoriteList)
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts
          this.pushBuyQtyId()
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得購物車資料失敗')
        })
    },
    pushBuyQtyId () {
      this.allProducts.forEach((item) => {
        this.carts.forEach((cartItem) => {
          if (item.id === cartItem.product_id) {
            item.buyQty = cartItem.qty
            item.pushCartId = cartItem.id
          }
        })
      })
    },
    getPage1Products (page = 1) {
      this.pagination.current_page = 1
      this.currentCategory = '選擇類別'
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.allProducts = res.data.products
          this.pagination = res.data.pagination
          this.pushBuyQtyId()
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    chooseCategory (category) {
      this.currentCategory = category
      this.pagination.total_pages = 0
      this.getAllProducts()
    },
    getAllProducts () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          this.forCategoryAllProducts = res.data.products
          this.showCategoryProducts()
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
    },
    showCategoryProducts () {
      const inCaterogy = []
      this.forCategoryAllProducts.forEach((item) => {
        if (item.category === this.currentCategory) {
          inCaterogy.push(item)
        }
      })
      this.allProducts = inCaterogy
      this.pushBuyQtyId()
      this.isLoading = false
    },
    goToAllProducts () {
      this.isLoading = true
      if (this.$route.path === '/user-products') {
        location.reload()
      } else {
        this.$router.push('/user-products')
        this.getCart()
        this.getPage1Products()
      }
    },
    goToTheCategory (category) {
      if (category === '所有類別') {
        this.goToAllProducts()
      } else {
        this.$router.push(`/user-products/${category}`)
        this.chooseCategory(category)
      }
    },
    handleIsInView () {
      this.isInView = true
      this.handleLoadmore()
    },
    handleLoadmore () {
      this.getOtherPageProductsThrottled()
    },
    handleIsOutsideView () {
      this.isInView = false
    },
    addCart (item) {
      const addItem = { product_id: item.id, qty: 1 }
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/cart`
      this.status.addLoadingItem = item.id
      this.$http
        .post(api, { data: addItem })
        .then(() => {
          this.$pushMsg.status200('已加入購物車')
          this.getCart()
          this.emitter.emit('updateProductInCart')
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '加入購物車失敗')
        })
        .finally(() => {
          this.status.addLoadingItem = ''
        })
    },
    goToProduct (item) {
      this.$router.push(`/product/${item.id}`)
    },
    go_to_favorite () {
      if (this.searchText && this.$route.path !== '/favorite') {
        this.allProducts = this.searchResult
        this.getCart()
        this.pushBuyQtyId()
      } else {
        this.allProducts = this.myFavoriteList
        this.getCart()
        this.pushBuyQtyId()
      }
    },
    getCurrentWidth () {
      this.currentWidth = window.innerWidth
    }
  },
  computed: {
    noResults () {
      return this.allProducts.length === 0 && this.searchText !== ''
    },
    noFavorites () {
      return (
        this.myFavoriteList.length === 0 &&
        this.allProducts.length === 0 &&
        this.searchText === ''
      )
    }
  },
  created () {
    this.getCurrentWidth()
    this.isLoading = true
    this.whereComeFrom()
    this.getMyFavorite()
    this.emitter.on('productSearchResult', (searchResult) => {
      this.getCart()
      this.searchText = searchResult[0]
      this.pagination.total_pages = 0
      this.searchResult = searchResult.data
      this.allProducts = searchResult.data
      this.pushBuyQtyId()
    })
    this.emitter.on('productSearchNull', () => {
      this.searchText = ''
      this.getPage1Products()
    })
    this.emitter.on('goToUserProducts', () => {
      this.getPage1Products()
      this.getOtherPageProductsThrottled()
    })
  },
  updated () {
    if (this.$route.path === '/favorite') {
      this.go_to_favorite()
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 23vh;
  object-fit: cover;
}

.priceContainer {
  height: 6vh;
}

.card:hover {
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 7px 0px #8f8f8f;
}

.card:hover .addBtn {
  background-color: #ccaf3c;
  border: 1px solid #ccaf3c;
}

.card .addBtn:hover {
  background-color: #d4bb59;
  border: 1px solid #d1b750;
}

.badge {
  height: fit-content;
}

.delmyFavoriteIcon {
  right: 0px;
  top: 0px;
  padding: 8px 12px;
  color: #f52424b3;
}

.delmyFavoriteIcon:hover {
  cursor: pointer;
  color: #dc3545;
}

.myFavoriteIcon {
  right: 0px;
  top: 0px;
  padding: 8px 12px;
  color: #ffffffb3;
}

.myFavoriteIcon:hover {
  cursor: pointer;
  color: #f52424;
}

.productsContainer {
  padding-top: 100px;
}

.nav-link {
  color: #212529;
  border-bottom: 1px solid #212529;
}

.nav-link:hover {
  cursor: pointer;
  color: #ccaf3c;
  border-bottom: 1px solid #ccaf3c;
}

.xs_title_text {
  font-size: 16px;
}

.xs_text {
  font-size: 14px;
}

.noMore {
  animation-name: noProducts;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes noProducts {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.list-group-item:hover {
  cursor: pointer;
}

.list-group-item.active {
  background-color: #f8f9fa;
  color: #ccaf3c;
  border: 1px solid #dee2e6;
  font-weight: bolder;
}

.stickyTopXs {
  top: 61px;
}

.stickyTopSm {
  top: 75px;
}

.btnXs {
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.btnXs:hover {
  background-color: #ccaf3c;
}

.activeBtnXs {
  color: #000;
  font-weight: bolder;
  border: 1px solid #ccaf3c;
  background-color: #ccaf3c;
}

.miniWidth {
  padding-top: 29px;
}
</style>
