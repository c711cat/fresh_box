<template>
  <LoadingView v-if="isLoading" />
  <div v-else>
    <section
      v-if="!carts.length"
      class="emptyContainer d-flex flex-column align-items-center justify-content-center col-10 mx-auto text-center"
    >
      <h3 class="mb-4">購物車空了</h3>
      <router-link to="/user-products" class="">
        <button type="button" class="btn btn-outline-primary">繼續逛逛</button>
      </router-link>
    </section>
    <main
      v-else
      class="cartWrap col-sm-11 col-md-9 col-lg-10 mx-auto d-flex flex-wrap bg-light"
    >
      <div class="col-12 col-lg-6 my-3">
        <header
          class="col-12 d-flex flex-wrap justify-content-between align-items-center ps-2 pe-3 mb-2"
        >
          <h3 class="m-0">購買清單</h3>
          <button
            @click="openDelModal"
            class="btn btn-outline-danger"
            type="button"
          >
            清空購物車
          </button>
        </header>
        <div class="col-12 p-2">
          <section
            v-for="item in carts"
            :key="item.id"
            class="itemC mb-3 d-flex bg-white"
          >
            <router-link :to="`/product/${item.product.id}`" class="">
              <img
                v-if="currentWidth >= 250"
                :src="item.product.imageUrl"
                alt="product_img"
              />
            </router-link>

            <div class="col ps-3 d-flex">
              <div
                class="w-100 d-flex flex-column justify-content-between position-relative"
              >
                <i
                  @click="delItem(item)"
                  class="bi bi-x-lg px-2 position-absolute end-0"
                ></i>
                <router-link
                  :to="`/product/${item.product.id}`"
                  class="productTitle text-decoration-none fw-bolder mt-1"
                >
                  {{ item.product.title }}
                </router-link>

                <div
                  v-if="item.product.origin_price === item.product.price"
                  class="text-secondary pb-1"
                >
                  NT$ {{ $filters.currency(item.product.origin_price) }}
                </div>
                <div v-else class="text-secondary pb-1">
                  NT$ {{ $filters.currency(item.product.price) }}
                </div>
                <div class="d-flex flex-wrap mb-2">
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

                  <div
                    class="col-12 col-sm-6 d-flex align-items-center flex-row-reverse text-end mt-1 pe-2 fw-bolder"
                  >
                    <div>NT$ {{ $filters.currency(item.total) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="d-flex space flex-wrap col align-items-center ps-1 pe-2"
          >
            <div class="d-flex flex-wrap col-12 align-items-center">
              <strong class="col-4">小計</strong>
              <strong class="text-end col-8">
                NT$ {{ $filters.currency(subtotal) }}
              </strong>
            </div>

            <div class="d-flex align-items-center col-12 flex-wrap">
              <v-select
                class="col-8 flex-fill col-sm-9 text-secondary"
                label="Select"
                :options="couponOption"
                v-model="couponCode"
                :disabled="used_coupon"
                placeholder="使用優惠碼"
              ></v-select>
              <button
                @click="useCoupon"
                class="btn btn-primary btnBody border border-primary rounded-0 rounded-end-2 py-0 col flex-fill"
                type="button"
              >
                送出
              </button>
            </div>

            <div v-if="used_coupon" class="d-flex align-items-center col-12">
              <div class="col-4">優惠碼折抵</div>
              <div class="text-end col-8">
                - NT$ {{ $filters.currency(discount) }}
              </div>
            </div>

            <div
              v-if="used_coupon"
              class="d-flex align-items-center col-12 flex-wrap"
            >
              <div class="col-4">折抵後小計</div>
              <div class="text-end col-8">
                NT$ {{ $filters.currency(afterDiscount) }}
              </div>
            </div>

            <div class="d-flex col-12 flex-wrap">
              <div class="col-4">冷藏宅配</div>
              <div class="text-end col-8">NT$ {{ shippingFee }}</div>
              <div class="infoText col-12 text-primary d-flex">
                <i class="bi bi-info-circle me-1"></i>
                <p class="mb-0">滿 NT$ 1,000 免運</p>
              </div>
            </div>

            <div class="d-flex align-items-center col-12 flex-wrap">
              <strong class="col-4">付款金額</strong>
              <strong class="text-primary text-end col-8"
                >NT$ {{ $filters.currency(paymentAmount) }}</strong
              >
            </div>
          </section>
        </div>
      </div>
      <section class="col-12 col-lg-6 py-3">
        <RecipientForm class=""></RecipientForm>
      </section>
    </main>
  </div>
  <delModal
    ref="delModal"
    :allCartItems="allCartItems"
    @del-all-items-of-Cart="cleanCart"
  ></delModal>
</template>

<script>
import "@/assets/styles/v-select.css";
import RecipientForm from "@/components/frontend/RecipientForm.vue";
import delModal from "@/components/DelModal.vue";
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      status: { addLoadingItem: "", delLoadingItem: "", updateLoadingItem: "" },
      couponOption: ["10%off"],
      couponCode: "",
      shippingFee: 290,
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
        this.shippingFee = 290;
      }
      if (this.couponCode && this.subtotal - this.discount >= 1000) {
        this.shippingFee = 0;
      }
      if (this.couponCode && this.subtotal - this.discount < 1000) {
        this.shippingFee = 290;
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
* {
  // border: 1px solid;
}
.cartWrap {
  margin: 110px 0px 30px 0px;
}

img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}

img:hover {
  border: 1px solid #fff;
  cursor: pointer;
}

.productTitle {
  color: #000;
  font-size: 20px;
}

.productTitle:hover {
  color: #212529;
}

.bi-x-lg {
  top: 4px;
}

.bi-x-lg:hover {
  color: #dc3545;
  cursor: pointer;
}

.infoText {
  font-size: 14px;
}

.btnBody {
  height: 35px;
}

.space {
  row-gap: 12px;
  column-gap: 12px;
}

.emptyContainer {
  height: 89vh;
  margin-top: 90px;
}
</style>
