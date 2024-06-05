<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else class="mx-auto col-12 col-lg-10">
    <div v-if="!carts.length" class="m-5 cartContainer pb-5">
      <h3 class="ps-2 mb-4">購物車空了</h3>
      <router-link
        to="/user-products"
        class="ms-2 p-2 fs-6 border border-primary text-decoration-none"
      >
        繼續逛逛
      </router-link>
    </div>
    <div v-else class="m-3 cartContainer">
      <div
        class="py-2 d-flex flex-wrap justify-content-between align-items-center"
      >
        <h3 class="ps-2 m-0">購物車清單</h3>

        <button @click="cleanCart" class="btn btn-danger" type="button">
          清空購物車
        </button>
      </div>

      <div
        v-for="(item, index) in carts"
        :key="index"
        class="row m-0 col-12 justify-content-center align-items-center border-top pt-3 pb-3"
      >
        <div class="col-auto col-sm-1 p-0">
          <button
            @click="delItem(item)"
            type="button"
            class="w-auto btn btn-outline-danger border-0"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <router-link
          :to="`/product/${item.product.id}`"
          class="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-1 my-1 text-center"
        >
          <img class="imgBody" :src="item.product.imageUrl" alt="product_img" />
        </router-link>
        <!-- 包含 sm 以上字體 -->
        <div
          class="col-sm-4 col-md-3 col-lg-4 col-xl-5 d-flex my-1 align-items-center d-none d-sm-block d-md-block d-lg-block d-xl-flex d-xxl-flex"
        >
          <div class="col-md-12 col-lg-12 col-xl-4">
            {{ item.product.title }}
          </div>
          <div class="col-md-12 col-lg-12 col-xl-4">
            {{ item.product.content }}／{{ item.product.unit }}
          </div>
          <div
            v-if="item.product.origin_price === item.product.price"
            class="text-secondary col-md-12 col-lg-12 col-xl-4"
          >
            NT$ {{ $filters.currency(item.product.origin_price) }}
          </div>
          <div v-else class="text-danger fw-bold col-md-12 col-lg-12 col-xl-4">
            NT$ {{ $filters.currency(item.product.price) }}
          </div>
        </div>
        <!-- xs 字體 -->
        <div
          class="col-7 row mx-0 my-1 align-items-center xs_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <div class="col-md-12 col-lg-12 col-xl-4">
            {{ item.product.title }}
          </div>
          <div class="col-md-12 col-lg-12 col-xl-4">
            {{ item.product.content }}／{{ item.product.unit }}
          </div>
          <div
            v-if="item.product.origin_price === item.product.price"
            class="text-secondary col-md-12 col-lg-12 col-xl-4"
          >
            NT$ {{ $filters.currency(item.product.origin_price) }}
          </div>
          <div v-else class="text-danger fw-bold col-md-12 col-lg-12 col-xl-4">
            NT$ {{ $filters.currency(item.product.price) }}
          </div>
        </div>

        <div
          class="row m-0 align-items-center col-12 col-sm-5 col-md-6 col-lg-5 col-xl-4"
        >
          <div class="py-2 d-flex col-6 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <button
              @click="delOneQty(item)"
              :disabled="item.id === status.delLoadingItem"
              type="button"
              class="btn btn-light btn-sm rounded-0 rounded-start"
            >
              <i class="bi bi-dash-lg"></i>
            </button>

            <input
              :disabled="item.id === status.updateLoadingItem"
              @change="updateQtyOfInput(item)"
              v-model="item.qty"
              type="text"
              class="form-control form-control-sm text-center rounded-0"
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
          <!-- 包含 sm 以上字體 -->
          <div
            class="my-2 text-center text-sm-end col-sm-12 col-md-6 col-lg-6 col-xl-6 d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block"
          >
            NT$ {{ $filters.currency(item.total) }}
          </div>
          <!-- xs 字體 -->
          <div
            class="my-2 text-center text-sm-end col-6 xs_text d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none"
          >
            NT$ {{ $filters.currency(item.total) }}
          </div>
        </div>
      </div>
      <div
        class="row g-1 m-0 border-top pt-3 pb-5 justify-content-center align-items-center"
      >
        <div class="col-6 col-sm-6 col-lg-8 col-xl-8 text-sm-end pe-3">
          小計
        </div>
        <div class="col-5 col-sm-5 col-lg-3 col-xl-3 text-end">
          NT$ {{ $filters.currency(subtotal) }}
        </div>

        <label
          class="form-label col-4 col-sm-6 col-lg-8 col-xl-8 text-sm-end mt-3 pe-3"
          for="couponCode"
        >
          優惠碼
        </label>
        <div class="d-flex col-7 col-sm-5 col-lg-3 col-xl-3">
          <v-select
            :disabled="used_coupon"
            class="col-10 col-sm-9 col-md-10"
            v-model="couponCode"
            label="Select"
            :options="couponOption"
          ></v-select>
          <button
            @click="useCoupon"
            type="button"
            class="btn btn-yellow-200 btn-sm col-auto"
          >
            送出
          </button>
        </div>

        <div
          v-if="used_coupon"
          class="col-6 col-sm-6 col-lg-8 col-xl-8 text-sm-end pe-3"
        >
          優惠碼折抵
        </div>
        <div
          v-if="used_coupon"
          class="col-5 col-sm-5 col-lg-3 col-xl-3 text-end"
        >
          - NT$ {{ $filters.currency(discount) }}
        </div>
        <div
          v-if="used_coupon"
          class="col-6 col-sm-6 col-lg-8 col-xl-8 text-sm-end pe-3"
        >
          折抵後小計
        </div>
        <div
          v-if="used_coupon"
          class="col-5 col-sm-5 col-lg-3 col-xl-3 text-end"
        >
          NT$ {{ $filters.currency(afterDiscount) }}
        </div>

        <div class="col-6 col-sm-6 col-lg-8 col-xl-8 text-sm-end pe-3">
          冷藏宅配
          <div class="infoText col-12 text-yellow-600">
            <i class="bi bi-info-circle"></i>
            滿 NT$ 1,000 免運
          </div>
        </div>

        <div class="col-5 col-sm-5 col-lg-3 col-xl-3 text-end">
          NT$ {{ $filters.currency(shippingFee) }}
        </div>

        <strong
          class="col-6 col-sm-6 col-lg-8 col-xl-8 text-sm-end pe-3 text-danger"
        >
          付款金額
        </strong>
        <strong class="col-5 col-sm-5 col-lg-3 col-xl-3 text-end text-danger">
          NT$ {{ $filters.currency(paymentAmount) }}
        </strong>
      </div>
      <div class="d-flex justify-content-center">
        <div class="pt-3 col-12 col-xl-6">
          <RecipientForm></RecipientForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-select/dist/vue-select.css";
import RecipientForm from "@/views/RecipientForm.vue";
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      status: { addLoadingItem: "", delLoadingItem: "", updateLoadingItem: "" },
      couponCode: "",
      couponOption: ["10%off"],
      shippingFee: 260,
      used_coupon: false,
    };
  },
  inject: ["emitter"],
  components: { RecipientForm },
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
    cleanCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "已清空購物車");
            this.getCart();
            this.emitter.emit("updateProductInCart");
          } else {
            this.$pushMsg.status200(res, "刪除失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
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
  },
};
</script>

<style lang="scss" scoped>
.imgBody {
  width: 100%;
}

.infoText {
  font-size: 13px;
}

.cartContainer {
  padding-top: 100px;
}

.imgBody:hover {
  padding: 1px;
}

.xs_text {
  font-size: 12px;
}
</style>
