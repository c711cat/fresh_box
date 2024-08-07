<template>
  <div class="row mb-5 mx-auto justify-content-center productDetailsContainer">
    <div class="row m-0 d-cloumn justify-content-center">
      <div class="p-1 col-12 col-md-5 position-relative mb-5">
        <img class="imgBody col-12 mb-3" :src="product.imageUrl" alt="" />
        <h2
          v-if="isMyFavorite"
          @click="delMyFavorite"
          class="bi bi-suit-heart-fill delmyFavoriteIcon position-absolute z-1"
        ></h2>
        <h2
          v-else
          @click="addMyFavorite"
          class="bi bi-suit-heart myFavoriteIcon position-absolute z-1"
        ></h2>
        <div class="row m-0 overflow-x-auto align-items-center flex-nowrap">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            @click="changeImg(img)"
            :src="img"
            class="imgItems col-3"
            alt=""
          />
        </div>
      </div>
      <div class="mt-3 px-4 col-12 col-md-5 col-lg-4 col-xl-3">
        <h4 class="mb-3 border-bottom pb-3 px-1">{{ product.title }}</h4>
        <div v-if="product.description" class="productContent px-1 mb-2">
          <ul
            v-for="(item, index) in product.description"
            :key="index"
            class="ps-3 mb-0"
          >
            <li class="">{{ item }}</li>
          </ul>
        </div>
        <div class="productContent p-1">
          規格：{{ product.content }} / {{ product.unit }}
        </div>
        <div v-if="product.origin_place" class="productContent p-1">
          產地：{{ product.origin_place }}
        </div>
        <div v-if="product.preservation_methods" class="productContent p-1">
          保存方式：{{ product.preservation_methods }}
        </div>

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
            :disabled="productQty === 1"
            @click="delQty"
            type="button"
            class="btn btn-light rounded-0 rounded-start border border-gray-light"
          >
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            v-model="productQty"
            type="text"
            class="form-control text-center rounded-0"
          />
          <button
            @click="addQty"
            type="button"
            class="btn btn-light rounded-0 rounded-end border border-gray-light"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <button
          @click="addToCart"
          type="button"
          class="btn btn-light w-100 border border-gray-light"
        >
          加入購物車
        </button>
      </div>
      <div class="col-11 col-md-10 col-lg-9 col-xl-8">
        <div class="accordion m-0" id="accordionPanelsUserOrderList">
          <div v-if="product.notes" class="accordion-item border border-0">
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
                <div
                  v-for="(item, index) in product.notes"
                  :key="index"
                  class="d-flex"
                >
                  <div class="col-auto">{{ index + 1 }}.</div>
                  <div class="flex-fill">{{ item }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item border border-0">
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
                <ShoppingNotes></ShoppingNotes>
              </div>
            </div>
          </div>
          <div class="accordion-item border border-0">
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
                <ExceptionSOP></ExceptionSOP>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="mb-4 pb-3 pt-5 col-10 border-bottom">推薦商品</h3>
      <SwiperImgs class="col-lg-10"></SwiperImgs>
    </div>
  </div>
</template>

<script>
import SwiperImgs from "@/components/SwiperImgs.vue";
import Collapse from "bootstrap/js/dist/collapse";
import ExceptionSOP from "@/components/ExceptionSOP.vue";
import ShoppingNotes from "@/components/ShoppingNotes.vue";
export default {
  data() {
    return {
      product: {},
      productQty: 1,
      myFavoriteList: [],
      details: {},
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
      this.$http
        .post(api, {
          data: { product_id: this.product.id, qty: Number(this.productQty) },
        })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已加入購物車");
            this.productQty = 1;
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.statue200(res, "加入購物車失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
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
  },
  created() {
    this.getProduct();
    const collapseElementList = document.querySelectorAll(".collapse");
    this.details = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid;
}
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
  right: 5px;
  top: 5px;
  padding: 8px 12px;
  color: #f52424b3;
}

.delmyFavoriteIcon:hover {
  cursor: pointer;
  color: #dc3545;
}

.myFavoriteIcon {
  right: 5px;
  top: 5px;
  padding: 8px 12px;
  color: #ffffffb3;
}

.myFavoriteIcon:hover {
  cursor: pointer;
  color: #f52424;
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
</style>
