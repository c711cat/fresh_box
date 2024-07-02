<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else>
    <div v-if="!carts.length" class="col-10 mx-auto mt-5 pt-5">
      <h3 class="mt-5 ps-2 mb-4">購物車空了</h3>
      <router-link
        to="/user-products"
        class="ms-2 p-2 fs-6 border border-primary text-decoration-none"
      >
        繼續逛逛
      </router-link>
    </div>
    <div
      v-else
      class="cartWrap col-sm-11 col-md-10 mx-auto d-flex flex-wrap bg-light"
    >
      <div class="col-12 col-lg-6 my-3">
        <div
          class="col-12 d-flex justify-content-between align-items-center px-3 mb-2"
        >
          <h3 class="m-0">購買清單</h3>
          <button
            @click="openDelModal"
            class="btn btn-outline-danger"
            type="button"
          >
            清空購物車
          </button>
        </div>
        <div class="col-12 p-2">
          <div
            v-for="(item, index) in carts"
            :key="index"
            class="itemC mb-3 pe-2 d-flex align-items-center bg-white"
          >
            <router-link :to="`/product/${item.product.id}`" class="">
              <img
                v-if="currentWidth >= 250"
                :src="item.product.imageUrl"
                alt="product_img"
              />
            </router-link>

            <div class="col ps-3 py-2 d-flex align-items-center">
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <router-link
                    :to="`/product/${item.product.id}`"
                    class="productTitle text-decoration-none text-black"
                  >
                    {{ item.product.title }}
                  </router-link>
                  <i @click="delItem(item)" class="bi bi-x-lg px-2"></i>
                </div>

                <div>{{ item.product.content }}／{{ item.product.unit }}</div>
                <div v-if="item.product.origin_price === item.product.price">
                  NT$ {{ $filters.currency(item.product.origin_price) }}
                </div>
                <div v-else class="text-danger fw-bold">
                  NT$ {{ $filters.currency(item.product.price) }}
                </div>
                <div class="d-flex flex-wrap align-items-center">
                  <div class="d-flex col-sm-6">
                    <button
                      @click="delOneQty(item)"
                      :disabled="item.id === status.delLoadingItem"
                      type="button"
                      class="btn btn-light btn-sm rounded-0 rounded-start"
                    >
                      <i class="bi bi-dash-lg"></i>
                    </button>

                    <input
                      @change="updateQtyOfInput(item)"
                      :disabled="item.id === status.updateLoadingItem"
                      v-model="item.qty"
                      type="text"
                      class="form-control form-control-sm text-center rounded-0 z-1"
                    />

                    <button
                      @click="addOneToCart(item)"
                      :disabled="item.id === status.addLoadingItem"
                      type="button"
                      class="btn btn-light btn-sm rounded-0 rounded-end"
                    >
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>

                  <strong
                    class="col-12 col-sm-6 d-flex align-items-center flex-row-reverse text-end pe-2 mt-1"
                  >
                    <div>NT$ {{ $filters.currency(item.total) }}</div>
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap align-items-center px-4">
            <div class="mb-1 col-4">小計</div>
            <div class="text-end mb-1 col-8">
              NT$ {{ $filters.currency(subtotal) }}
            </div>
            <div class="d-flex align-items-center mb-1 col-12">
              <label class="form-label m-0 col-4" for="couponCode">
                優惠碼
              </label>
              <div class="d-flex align-items-center col-8 ps-3">
                <v-select
                  class="col"
                  label="Select"
                  :options="couponOption"
                  v-model="couponCode"
                  :disabled="used_coupon"
                ></v-select>
                <button
                  @click="useCoupon"
                  class="btn btn-yellow-200"
                  type="button"
                >
                  送出
                </button>
              </div>
            </div>
            <div v-if="used_coupon" class="mb-1 col-4">優惠碼折抵</div>
            <div v-if="used_coupon" class="text-end mb-1 col-8">
              - NT$ {{ $filters.currency(discount) }}
            </div>

            <div v-if="used_coupon" class="mb-1 col-4">折抵後小計</div>
            <div v-if="used_coupon" class="text-end mb-1 col-8">
              NT$ {{ $filters.currency(afterDiscount) }}
            </div>

            <div class="mb-1 col-4">
              冷藏宅配
              <div class="infoText col-12 text-yellow-600">
                <i class="bi bi-info-circle"></i>
                滿 NT$ 1,000 免運
              </div>
            </div>
            <div class="text-end mb-1 col-8">NT$ {{ shippingFee }}</div>

            <strong class="text-danger col-4">付款金額</strong>
            <strong class="text-danger text-end col-8"
              >NT$ {{ $filters.currency(paymentAmount) }}</strong
            >
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 py-3">
        <RecipientForm class="mt-1"></RecipientForm>
      </div>
    </div>
  </div>
  <delModal
    ref="delModal"
    :allCartItems="allCartItems"
    @del-all-items-of-Cart="cleanCart"
  ></delModal>
</template>

<script>
import "vue-select/dist/vue-select.css";
import RecipientForm from "@/views/RecipientForm.vue";
import delModal from "@/components/DelModal.vue";
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      status: { addLoadingItem: "", delLoadingItem: "", updateLoadingItem: "" },
      couponOption: ["10%off"],
      couponCode: "",
      shippingFee: 260,
      used_coupon: false,
      allCartItems: false,
      currentWidth: 300,
    };
  },
  inject: ["emitter"],
  components: { RecipientForm, delModal },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.getshippingFee();
          this.carts.forEach((item) => {
            if (item.qty === 0) {
              this.delItem(item);
            } else {
              return;
            }
          });
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    delItem(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "刪除商品成功");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "刪除商品失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    addOneToCart(item) {
      const addItem = { product_id: item.product.id, qty: 1 };
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
          this.couponCode = "";
          this.used_coupon = false;
        });
    },
    delOneQty(item) {
      const updateQty = item.qty - 1;
      const delItem = { product_id: item.product.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.status.delLoadingItem = item.id;
      this.$http
        .put(api, { data: delItem })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已刪除 1 個品項");
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
    updateQtyOfInput(item) {
      if (item.qty < 0) {
        item.qty = 0;
      }
      const updateQty = Number(item.qty);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.status.updateLoadingItem = item.id;
      this.$http
        .put(api, { data: { product_id: item.product.id, qty: updateQty } })
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已更新數量");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "更新數量失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.status.updateLoadingItem = "";
        });
    },
    useCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http
        .post(api, { data: { code: this.couponCode } })
        .then((res) => {
          if (res.data.success) {
            this.used_coupon = true;
            this.$pushMsg.status200(res, "套用優惠券成功");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "套用優惠券失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    getshippingFee() {
      if (!this.couponCode && this.subtotal >= 1000) {
        this.shippingFee = 0;
      }
      if (!this.couponCode && this.subtotal < 1000) {
        this.shippingFee = 260;
      }
      if (this.couponCode && this.subtotal - this.discount >= 1000) {
        this.shippingFee = 0;
      }
      if (this.couponCode && this.subtotal - this.discount < 1000) {
        this.shippingFee = 260;
      }
    },
    openDelModal() {
      this.allCartItems = true;
      this.$refs.delModal.showModal();
    },
    cleanCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "已清空購物車");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "刪除失敗");
          }
        })
        .catch((error) => {
          this.allCartItems = false;
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    getCurrentWidth() {
      this.currentWidth = window.outerWidth;
    },
  },
  computed: {
    subtotal() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.total;
      });
      return total;
    },
    discount() {
      return this.subtotal - this.afterDiscount;
    },
    afterDiscount() {
      let afterDiscount = 0;
      this.carts.forEach((item) => {
        afterDiscount += item.final_total;
      });
      return Math.round(afterDiscount);
    },
    paymentAmount() {
      let total = 0;
      if (this.couponCode) {
        total = this.afterDiscount + this.shippingFee;
      } else {
        total = this.subtotal + this.shippingFee;
      }
      return total;
    },
  },
  created() {
    this.isLoading = true;
    this.getCart();
    this.getCurrentWidth();
  },
};
</script>

<style lang="scss" scoped>
.cartWrap {
  margin: 110px 0px 30px 0px;
}

img {
  height: 130px;
  width: 100px;
  object-fit: cover;
}

img:hover {
  border: 1px solid #fff;
  cursor: pointer;
}

.productTitle:hover {
  font-weight: bolder;
  cursor: pointer;
}

.bi-x-lg:hover {
  color: #dc3545;
  cursor: pointer;
}

.infoText {
  font-size: 13px;
}
</style>
