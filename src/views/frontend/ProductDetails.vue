<template>
  <div class="row mb-5 mx-auto justify-content-center productDetailsContainer">
    <div class="row m-0 d-cloumn justify-content-center">
      <section class="p-1 col-12 col-md-5 mb-5">
        <img
          class="imgBody col-12 mb-3"
          :srcset="`${product.imageUrl}&w=${currentWidth}`"
          alt=""
        />

        <div class="row m-0 overflow-x-auto align-items-center flex-nowrap">
          <img
            v-for="img in product.images"
            :key="img"
            @click="changeImg(img)"
            :srcset="`${img}&w=500`"
            class="imgItems col-3"
            alt="product-img"
          />
        </div>
      </section>
      <section class="px-4 mb-5 col-12 col-md-5 col-lg-4 col-xl-3">
        <div
          class="border-bottom mb-3 d-flex justify-content-between align-items-center"
        >
          <h4 class="mb-0 py-3 px-1">{{ product.title }}</h4>
          <i
            v-if="isMyFavorite"
            @click="delMyFavorite"
            class="fs-2 px-2 bi bi-suit-heart-fill delmyFavoriteIcon"
          ></i>
          <i
            v-else
            @click="addMyFavorite"
            class="fs-2 px-2 bi bi-suit-heart myFavoriteIcon"
          ></i>
        </div>

        <div v-if="product.description" class="productContent px-1 mb-2">
          <ul v-for="item in product.description" :key="item" class="ps-3 mb-0">
            <li class="">{{ item }}</li>
          </ul>
        </div>
        <p class="productContent p-1 mb-0">
          規格：{{ product.content }} / {{ product.unit }}
        </p>
        <p v-if="product.origin_place" class="mb-0 productContent p-1">
          產地：{{ product.origin_place }}
        </p>
        <p v-if="product.preservation_methods" class="mb-0 productContent p-1">
          保存方式：{{ product.preservation_methods }}
        </p>

        <div class="row m-0 g-3 mb-3">
          <strong
            :class="{
              'text-decoration-line-through':
                product.origin_price !== product.price,
            }"
            class="text-secondary fs-5 w-50"
          >
            NT$ {{ product.origin_price }}</strong
          >
          <strong
            v-if="product.origin_price !== product.price"
            class="text-danger fs-5 w-50 text-end"
          >
            NT$ {{ product.price }}</strong
          >
        </div>
        <div class="d-flex mb-3">
          <button
            :disabled="productQty <= 1"
            @click="delQty"
            type="button"
            class="btn btn-primary rounded-0 rounded-start"
          >
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            v-model="productQty"
            class="form-control text-center rounded-0 border-primary"
            type="number"
          />
          <button
            :disabled="status.addLoadingItem"
            @click="addQty"
            type="button"
            class="btn btn-primary rounded-0 rounded-end"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <button
          @click.stop="addToCart"
          type="button"
          class="btn btn-primary w-100"
        >
          <div
            v-if="status.addLoadingItem"
            class="spinner-border text-light spinner-grow-sm"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <p v-else class="mb-0">加入購物車</p>
        </button>
      </section>
      <div class="col-11 col-md-10 col-lg-9 col-xl-8">
        <div class="accordion m-0" id="accordionPanelsUserOrderList">
          <section v-if="product.notes" class="accordion-item border border-0">
            <h2 class="accordion-header">
              <button
                class="accordion-button bg-white fs-4 fw-bold text-black"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#things-to-note"
                aria-expanded="true"
                aria-controls="things-to-note"
              >
                注意事項
              </button>
            </h2>
            <div id="things-to-note" class="accordion-collapse collapse show">
              <div class="accordion-body border-top">
                <ol class="ms-4 ps-0">
                  <li
                    v-for="item in product.notes"
                    :key="item"
                    class="col-auto"
                  >
                    {{ item }}
                  </li>
                </ol>
              </div>
            </div>
          </section>
          <section class="accordion-item border border-0">
            <h2 class="accordion-header">
              <button
                class="accordion-button bg-white fs-4 fw-bold text-black"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#shopping-notes"
                aria-expanded="true"
                aria-controls="shopping-notes"
              >
                購物須知
              </button>
            </h2>
            <div id="shopping-notes" class="accordion-collapse collapse show">
              <div class="accordion-body border-top">
                <ShoppingNotes />
              </div>
            </div>
          </section>
          <section class="accordion-item border border-0">
            <h2 class="accordion-header">
              <button
                class="accordion-button bg-white fs-4 fw-bold text-black"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#exception-SOP"
                aria-expanded="true"
                aria-controls="exception-SOP"
              >
                商品異常處理流程
              </button>
            </h2>
            <div id="exception-SOP" class="accordion-collapse collapse show">
              <div class="accordion-body border-top">
                <ExceptionSOP />
              </div>
            </div>
          </section>
        </div>
      </div>
      <h3 class="mb-4 pb-3 pt-5 col-11 col-md-10 border-bottom">推薦商品</h3>
      <SwiperImgs class="col-11 col-md-10 px-0" />
    </div>
  </div>
</template>

<script>
import SwiperImgs from "@/components/frontend/SwiperImgs.vue";
import Collapse from "bootstrap/js/dist/collapse";
import ExceptionSOP from "@/components/frontend/ExceptionSOP.vue";
import ShoppingNotes from "@/components/frontend/ShoppingNotes.vue";
export default {
  data() {
    return {
      product: {},
      productQty: 1,
      myFavoriteList: [],
      details: {},
      status: {
        addLoadingItem: false,
        delLoadingItem: false,
      },
    };
  },
  inject: ["emitter"],
  components: { SwiperImgs, ExceptionSOP, ShoppingNotes },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http
        .get(api)
        .then((res) => {
          this.product = res.data.product;
          this.product.origin_price = this.$filters.currency(
            this.product.origin_price
          );
          this.product.price = this.$filters.currency(this.product.price);
          this.pushImg();
          this.getMyFavorite();
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          window.scrollTo(0, 0);
        });
    },
    addQty() {
      this.productQty = this.productQty + 1;
    },
    delQty() {
      this.productQty = this.productQty - 1;
    },
    addToCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = true;
      this.$http
        .post(api, {
          data: { product_id: this.product.id, qty: Number(this.productQty) },
        })
        .then((res) => {
          this.$pushMsg.status200(res, "已加入購物車");
          this.productQty = 1;
          this.emitter.emit("updateProductInCart");
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.status.addLoadingItem = false;
        });
    },
    changeImg(img) {
      this.product.imageUrl = img;
    },
    pushImg() {
      this.product.images.splice(0, 0, this.product.imageUrl);
    },
    getMyFavorite() {
      this.myFavoriteList =
        JSON.parse(localStorage.getItem("myFavorite")) || [];
    },
    addMyFavorite() {
      this.myFavoriteList.push(this.product);
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
    delMyFavorite() {
      this.myFavoriteList.filter((listItem, index) => {
        if (this.product.id === listItem.id) {
          return this.myFavoriteList.splice(index, 1);
        }
      });
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
  },
  computed: {
    isMyFavorite() {
      let favorite = "";
      this.myFavoriteList.forEach((listItem) => {
        if (this.product.id === listItem.id) {
          favorite = true;
        }
      });
      return favorite;
    },
    currentWidth() {
      return window.innerWidth;
    },
  },
  watch: {
    productQty() {
      if (this.productQty < 1) {
        this.productQty = 1;
      }
      return this.productQty;
    },
  },
  created() {
    this.getProduct();
  },
  mounted() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.details = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>

<style lang="scss" scoped>
.imgBody {
  height: 50vh;
  object-fit: cover;
}

.imgItems {
  height: 8vh;
  object-fit: cover;
}

.imgItems:hover {
  cursor: pointer;
  padding: 0px;
}

.delmyFavoriteIcon {
  color: #f52424;
}

.delmyFavoriteIcon:hover {
  cursor: pointer;
  color: #bb2d3b;
}

.myFavoriteIcon {
  color: #f52424;
}

.myFavoriteIcon:hover {
  cursor: pointer;
  color: #bb2d3b;
}

.productDetailsContainer {
  padding-top: 120px;
}

.accordion-button:hover {
  color: #ccaf3c !important;
}

.accordion-button:focus {
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  box-shadow: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
