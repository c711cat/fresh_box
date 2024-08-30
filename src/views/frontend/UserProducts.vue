<template>
  <LoadingView v-if="isLoading" />
  <main v-else class="col-11 col-xxl-9 d-flex mx-auto productsContainer">
    <div class="border col-2">
      <section class="list-group">
        <buttom
          @click="goToAllProducts"
          class="list-group-item list-group-item-action"
          :class="{ active: $route.path === '/user-products' }"
          :aria-current="$route.path === '/user-products'"
          >所有類別
        </buttom>
        <buttom
          @click="goToTheCategory(item)"
          v-for="item in categoryList"
          :key="item"
          class="list-group-item list-group-item-action"
          :class="{ active: $route.params.currentCategory === item }"
          :aria-current="$route.params.currentCategory === item"
        >
          {{ item }}
        </buttom>
      </section>
    </div>
    <div class="col-10 border">
      <section v-if="noResults" class="mt-4">
        <h3>查無相符商品</h3>
      </section>
      <section v-if="noFavorites" class="mt-4">
        <h3>目前無收藏的商品</h3>
      </section>
      <div class="d-flex flex-wrap col-12">
        <section v-for="item in allProducts" :key="item.id" class="col-3 px-3">
          <div class="card my-3 mx-auto">
            <h3
              v-if="isMyFavorite(item)"
              @click="delMyFavorite(item)"
              class="bi bi-suit-heart-fill delmyFavoriteIcon position-absolute z-1"
            ></h3>

            <h3
              v-else
              @click="addMyFavorite(item)"
              class="bi bi-suit-heart myFavoriteIcon position-absolute z-1"
            ></h3>
            <div class="position-relative">
              <img
                @click="goToProduct(item)"
                :src="item.imageUrl"
                class="imgBody card-img-top"
              />
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

              <div
                class="btn-group w-100"
                role="group"
                aria-label="Default button group"
              >
                <button
                  @click="delOne(item)"
                  :disabled="!item.buyQty || item.id === status.delLoadingItem"
                  type="button"
                  class="btn btn-light w-50"
                >
                  <div
                    v-if="item.id === status.delLoadingItem"
                    class="spinner-border text-dark spinner-grow-sm"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i v-else class="bi bi-dash-lg"></i>
                </button>

                <button
                  @click="addCart(item)"
                  :disabled="item.id === status.addLoadingItem"
                  type="button"
                  class="btn btn-light w-50"
                >
                  <div
                    v-if="item.id === status.addLoadingItem"
                    class="spinner-border text-dark spinner-grow-sm"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i v-else class="bi bi-plus-lg"></i>
                </button>
              </div>
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
        />
        <div
          v-if="pagination.current_page === pagination.total_pages"
          class="w-100 text-secondary text-center"
        >
          <p class="mb-0 noMore">已無更多商品</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ObserverView from "@/components/frontend/ObserverView.vue";
import { throttle } from "lodash";
import Dropdown from "bootstrap/js/dist/dropdown";
export default {
  data() {
    return {
      isLoading: false,
      newPage: [],
      allProducts: [],
      pagination: {
        current_page: 1,
        total_pages: 0,
      },
      isInView: false,
      carts: [],
      status: {
        addLoadingItem: "",
        delLoadingItem: "",
      },
      myFavoriteList: [],
      dropdownList: {},
      categoryList: ["葉菜", "瓜果根球莖", "菇菌", "水果", "辛香料"],
      forCategoryAllProducts: [],
      currentCategory: "選擇類別",
      searchText: "",
      searchResult: [],
      getOtherPageProducts: throttle(
        function (options = this.pagination) {
          const { current_page, total_pages } = options;
          if (this.isInView === true && current_page < total_pages) {
            const page = current_page + 1;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
            this.$http
              .get(api)
              .then((res) => {
                this.pagination = { ...res.data.pagination };
                this.newPage = [...res.data.products];
                this.allProducts = [...this.allProducts, ...this.newPage];
                this.allProducts.forEach((item) => {
                  this.carts.forEach((cartItem) => {
                    if (item.id === cartItem.product_id) {
                      item.buyQty = cartItem.qty;
                      item.pushCartId = cartItem.id;
                    }
                  });
                });
              })
              .catch((error) => {
                this.$pushMsg.status404(error.response.data.message);
              });
          }
        },
        500,
        { leading: true, trailing: true }
      ),
    };
  },
  components: { ObserverView },
  inject: ["emitter"],
  methods: {
    whereComeFrom() {
      if (this.$route.params.currentCategory) {
        this.chooseCategory(this.$route.params.currentCategory);
        this.getCart();
      } else {
        if (this.$route.path === "/favorite") {
          this.getCart();
          setTimeout(() => {
            this.allProducts = this.myFavoriteList;
            this.pushBuyQtyId();
            this.isLoading = false;
          }, 3000);
        } else {
          this.getCart();
          setTimeout(() => {
            this.getPage1Products();
            this.getOtherPageProducts();
          }, 600);
        }
      }
    },
    getMyFavorite() {
      this.myFavoriteList =
        JSON.parse(localStorage.getItem("myFavorite")) || [];
      this.myFavoriteList.forEach((item) => {
        item.buyQty = 0;
      });
    },
    isMyFavorite(item) {
      let favorite = "";
      this.myFavoriteList.forEach((listItem) => {
        if (item.id === listItem.id) {
          favorite = true;
        }
      });
      return favorite;
    },
    addMyFavorite(addItem) {
      this.myFavoriteList.push(addItem);
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
    delMyFavorite(delItem) {
      this.myFavoriteList.filter((item, index) => {
        if (delItem.id === item.id) {
          return this.myFavoriteList.splice(index, 1);
        }
      });
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.pushBuyQtyId();
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    pushBuyQtyId() {
      this.allProducts.forEach((item) => {
        this.carts.forEach((cartItem) => {
          if (item.id === cartItem.product_id) {
            item.buyQty = cartItem.qty;
            item.pushCartId = cartItem.id;
          }
        });
      });
    },
    getPage1Products(page = 1) {
      this.pagination.current_page = 1;
      this.currentCategory = "選擇類別";
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.allProducts = res.data.products;
          this.pagination = res.data.pagination;
          this.pushBuyQtyId();
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    chooseCategory(category) {
      this.currentCategory = category;
      this.pagination.total_pages = 0;
      this.getAllProducts();
    },
    getAllProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.forCategoryAllProducts = res.data.products;
            this.showCategoryProducts();
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    showCategoryProducts() {
      let inCaterogy = [];
      this.forCategoryAllProducts.filter((item) => {
        if (item.category === this.currentCategory) {
          inCaterogy.push(item);
        }
      });
      this.allProducts = inCaterogy;
      this.pushBuyQtyId();
      this.isLoading = false;
    },
    goToAllProducts() {
      if (this.$route.path === "/user-products") {
        location.reload();
      } else {
        this.$router.push("/user-products");
        this.getCart();
        this.getPage1Products();
      }
    },
    goToTheCategory(category) {
      if (category === "所有類別") {
        this.goToAllProducts();
      } else {
        this.$router.push(`/user-products/${category}`);
        this.chooseCategory(category);
      }
    },
    handleIsInView() {
      this.isInView = true;
      this.handleLoadmore();
    },
    handleLoadmore() {
      this.getOtherPageProducts();
    },
    handleIsOutsideView() {
      this.isInView = false;
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
      this.$http
        .post(api, { data: addItem })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已加入購物車");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "加入購物車失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.status.addLoadingItem = "";
        });
    },
    delOne(item) {
      const updateQty = item.buyQty - 1;
      const delItem = { product_id: item.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.pushCartId}`;
      this.status.delLoadingItem = item.id;
      this.$http
        .put(api, { data: delItem })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已刪除 1 個品項");
            if (res.data.data.qty === 0) {
              this.delItem(item.pushCartId);
            }
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "刪除失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.status.delLoadingItem = "";
        });
    },
    delItem(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (this.searchText === "") {
            location.reload();
          }

          return res;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    goToProduct(item) {
      this.$router.push(`/product/${item.id}`);
    },
    go_to_favorite() {
      if (this.searchText && this.$route.path !== "/favorite") {
        this.allProducts = this.searchResult;
        this.getCart();
        this.pushBuyQtyId();
      } else {
        this.allProducts = this.myFavoriteList;
        this.getCart();
        this.pushBuyQtyId();
      }
    },
  },
  computed: {
    noResults() {
      return this.allProducts.length === 0 && this.searchText !== "";
    },
    noFavorites() {
      return (
        this.myFavoriteList.length === 0 &&
        this.allProducts.length === 0 &&
        this.searchText === ""
      );
    },
  },
  created() {
    this.isLoading = true;
    this.whereComeFrom();
    this.getMyFavorite();
    this.emitter.on("productSearchResult", (searchResult) => {
      this.getCart();
      this.searchText = searchResult[0];
      this.pagination.total_pages = 0;
      this.searchResult = searchResult.data;
      this.allProducts = searchResult.data;
      this.pushBuyQtyId();
    });
    this.emitter.on("productSearchNull", () => {
      this.searchText = "";
      this.getPage1Products();
    });
    this.emitter.on("goToUserProducts", () => {
      this.getPage1Products();
      this.getOtherPageProducts();
    });
  },
  mounted() {
    const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
    this.dropdownList = [...dropdownElementList].map(
      (dropdownToggleEl) => new Dropdown(dropdownToggleEl)
    );
  },
  updated() {
    if (this.$route.path === "/favorite") {
      this.go_to_favorite();
    }
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 20vh;
  object-fit: cover;
}

.priceContainer {
  height: 6vh;
}

.imgBody:hover {
  cursor: pointer;
  border: 2px solid #fff;
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

.dropdown-item:hover {
  cursor: pointer;
  color: #ccaf3c;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #f8f9fa;
  color: #ccaf3c;
}

.dropdown-item:focus-visible {
  outline: 2px solid #ccaf3c;
  border-radius: 3%;
}

.xs_title_text {
  font-size: 14px;
}

.xs_text {
  font-size: 12px;
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
  background-color: #fff;
  color: #ccaf3c;
  border: 1px solid #dee2e6;
}
</style>
