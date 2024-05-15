<template>
  <div
    class="col-11 col-sm-10 col-md-8 col-lg-8 col-xl-10 col-xxl-9 row mt-0 mb-3 mx-auto productsContainer"
  >
    <ul class="mt-1 nav d-flex align-items-center">
      <li @click="getPage1Products" class="nav-item nav-link border-0">
        所有產品
      </li>
      <li>／</li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle border-0"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false"
        >
          {{ currentCategory }}
        </a>
        <ul class="dropdown-menu">
          <li
            @click="chooseCategory(item)"
            v-for="(item, index) in categoryList"
            :key="index"
            class="dropdown-item"
          >
            {{ item }}
          </li>
        </ul>
      </li>
    </ul>
    <div
      v-for="(item, index) in allProducts"
      :key="index"
      class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3"
    >
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

        <img
          @click="goToProduct(item)"
          :src="item.imageUrl"
          class="imgBody card-img-top position-relative"
        />

        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ item.title }}</h5>
              <span
                v-if="item.buyQty >= 1"
                class="badge text-bg-danger rounded-pill fs-6"
              >
                {{ item.buyQty }}
              </span>
            </div>

            <p class="card-text">{{ item.content }} / {{ item.unit }}</p>
            <div class="d-flex justify-content-between mb-2">
              <strong
                class="card-text text-secondary fs-6"
                :class="{
                  'text-decoration-line-through':
                    item.price !== item.origin_price,
                }"
              >
                NT$ {{ item.origin_price }}
              </strong>
              <strong
                v-if="item.price !== item.origin_price"
                class="card-text text-danger fs-6"
                >NT$ {{ item.price }}
              </strong>
            </div>
          </div>

          <div
            class="btn-group w-100"
            role="group"
            aria-label="Default button group"
          >
            <!-- - -->
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
            <!-- + -->
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
    </div>
  </div>

  <Observer
    v-if="pagination.current_page < pagination.total_pages"
    @is-in-view="handleIsInView"
    @is-outside-view="handleIsOutsideView"
  />
</template>

<script>
import Observer from "@/components/Observer.vue";
import { throttle } from "lodash";
import Dropdown from "bootstrap/js/dist/dropdown";
export default {
  data() {
    return {
      newPage: [],
      allProducts: [],
      pagination: {
        current_page: 1,
        total_pages: 2,
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
      transCategory: "",
      getOtherPageProducts: throttle(
        function (options = this.pagination) {
          const { current_page, total_pages } = options;
          if (this.isInView === true && current_page < total_pages) {
            const page = current_page + 1;
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
            this.$http.get(api).then((res) => {
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
            });
          }
        },
        500,
        { leading: true, trailing: true }
      ),
    };
  },
  components: { Observer },
  inject: ["emitter"],
  methods: {
    chooseCategory(category) {
      console.log("chooseCategory", category);
      this.currentCategory = category;
      this.pagination.total_pages = 0;
      this.getAllProducts();
    },
    showCategoryProducts() {
      console.log("showCategoryProducts");
      let inCaterogy = [];
      this.forCategoryAllProducts.filter((item) => {
        if (item.category === this.currentCategory) {
          inCaterogy.push(item);
        }
      });
      this.allProducts = inCaterogy;
      console.log("showCategoryProducts:", this.allProducts);
    },
    getAllProducts() {
      console.log("getAllProducts");
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        this.forCategoryAllProducts = res.data.products;
        this.showCategoryProducts();
      });
    },
    handleLoadmore() {
      this.getOtherPageProducts();
    },
    handleIsInView() {
      this.isInView = true;
      this.handleLoadmore();
    },
    handleIsOutsideView() {
      this.isInView = false;
    },
    getPage1Products(page = 1) {
      this.pagination.current_page = 1;
      this.currentCategory = "選擇類別";
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.allProducts = res.data.products;
        this.pagination = res.data.pagination;
        this.pushBuyQtyId();
        this.getMyFavorite();
      });
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
      this.$http.post(api, { data: addItem }).then((res) => {
        this.status.addLoadingItem = "";
        this.$pushMsg(res, "加入購物車");
        this.getCart();
        this.emitter.emit("updateProductInCart");
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = [...res.data.data.carts];
      });
      this.getPage1Products();
      this.getOtherPageProducts();
    },
    pushBuyQtyId() {
      const cart = [...this.carts];
      this.allProducts.forEach((item) => {
        cart.forEach((cartItem) => {
          if (item.id === cartItem.product_id) {
            item.buyQty = cartItem.qty;
            item.pushCartId = cartItem.id;
          }
        });
      });
    },
    delOne(item) {
      const updateQty = item.buyQty - 1;
      const delItem = { product_id: item.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.pushCartId}`;
      this.status.delLoadingItem = item.id;
      this.$http.put(api, { data: delItem }).then((res) => {
        this.status.delLoadingItem = "";
        this.$pushMsg(res, "刪除 1 個品項");
        if (res.data.data.qty === 0) {
          this.delItem(item.pushCartId);
        }
        this.getCart();
        this.emitter.emit("updateProductInCart");
      });
    },
    goToProduct(item) {
      this.$router.push(`/product/${item.id}`);
    },
    delItem(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        return res;
      });
    },
    getMyFavorite() {
      this.myFavoriteList =
        JSON.parse(localStorage.getItem("myFavorite")) || [];
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
  },
  created() {
    this.pagination.total_pages = 0;
    const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
    this.dropdownList = [...dropdownElementList].map(
      (dropdownToggleEl) => new Dropdown(dropdownToggleEl)
    );

    // this.getCart();
    this.emitter.on("searchResult", (data) => {
      this.pagination.total_pages = 0;
      this.allProducts = data;
    });
    this.emitter.on("userSearchNull", () => {
      this.getPage1Products();
    });
    this.emitter.on("goToCategory", (data) => {
      this.pagination.total_pages = 0;
      console.log("goToCategory", data);
      this.chooseCategory(data);
      this.emitter.off("goToCategory");
    });
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 190px;
  object-fit: cover;
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
</style>
