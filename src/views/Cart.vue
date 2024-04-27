<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="!carts.length" class="m-5 cartContainer">
    <h3 class="ps-2">購物車空了</h3>
  </div>
  <div v-else class="m-5 cartContainer">
    <h3 class="ps-2">購物車清單</h3>
    <div
      v-for="(item, index) in carts"
      :key="index"
      class="row m-0 justify-content-center align-items-center border-top pt-3 pb-3"
    >
      <div class="col-12 col-sm-1 col-md-1 text-center p-0">
        <button
          @click="delItem(item)"
          type="button"
          class="w-auto btn btn-outline-danger border-0"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <img
        class="imgBody col-6 col-sm-2 col-md-2 col-lg-2 col-xl-1 my-1"
        :src="item.product.imageUrl"
        alt=""
      />

      <div
        class="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-5 row mx-0 my-1 align-items-center text-sm-start text-center"
      >
        <div class="col-md-12 col-lg-12 col-xl-4">{{ item.product.title }}</div>
        <div class="col-md-12 col-lg-12 col-xl-4">
          {{ item.product.content }}／{{ item.product.unit }}
        </div>
        <div
          v-if="item.product.origin_price === item.product.price"
          class="text-secondary col-md-12 col-lg-12 col-xl-4"
        >
          NT$ {{ item.product.origin_price }}
        </div>
        <div v-else class="text-danger fw-bold col-md-12 col-lg-12 col-xl-4">
          NT$ {{ item.product.price }}
        </div>
      </div>

      <div
        class="row m-0 align-items-center col-11 col-sm-4 col-md-5 col-lg-5 col-xl-4"
      >
        <div class="py-2 d-flex col-12 col-md-6 col-lg-6 col-xl-6">
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

        <div
          class="my-2 text-center text-md-end col-12 col-md-6 col-lg-6 col-xl-6"
        >
          NT$ {{ item.total }}
        </div>
      </div>
    </div>
    <div
      class="row g-1 m-0 border-top pt-3 pb-5 justify-content-center align-items-center"
    >
      <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end pe-3">小計</div>
      <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        NT$ {{ subtotal }}
      </div>

      <label
        class="form-label col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end mt-3 pe-3"
        for="couponCode"
      >
        優惠碼
      </label>
      <div class="d-flex col-5 col-sm-4 col-lg-3 col-xl-2">
        <v-select
          :disabled="used_coupon"
          class="col-9 col-md-10"
          v-model="couponCode"
          label="Select"
          :options="couponOption"
        ></v-select>
        <button
          @click="useCoupon"
          type="button"
          class="btn btn-outline-secondary btn-sm col-auto"
        >
          送出
        </button>
      </div>

      <div
        v-if="used_coupon"
        class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end pe-3"
      >
        優惠碼折抵
      </div>
      <div v-if="used_coupon" class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        - NT$ {{ discount }}
      </div>
      <div
        v-if="used_coupon"
        class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end pe-3"
      >
        折抵後小計
      </div>
      <div v-if="used_coupon" class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        NT$ {{ afterDiscount }}
      </div>

      <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end pe-3">
        冷藏宅配
        <div class="infoText col-12 text-success">
          <i class="bi bi-info-circle"></i>
          滿 NT$ 1000 免運
        </div>
      </div>

      <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        NT$ {{ shippingFee }}
      </div>

      <strong
        class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end pe-3 text-danger"
      >
        付款金額
      </strong>
      <strong
        class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end mb-3 text-danger"
      >
        NT$ {{ paymentAmount }}
      </strong>
    </div>
    <div class="d-flex justify-content-center">
      <div class="pt-3 col-12 col-xl-6">
        <RecipientForm></RecipientForm>
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
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
        this.getshippingFee();
        this.carts.forEach((item) => {
          if (item.qty === 0) {
            this.delItem(item);
          } else {
            return;
          }
        });
      });
    },
    delItem(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http.delete(api).then((res) => {
        this.$pushMsg(res, "刪除");
        this.getCart();
        this.emitter.emit("updateProductInCart");
      });
    },
    addOneToCart(item) {
      const addItem = { product_id: item.product.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
      this.$http.post(api, { data: addItem }).then((res) => {
        this.status.addLoadingItem = "";
        this.couponCode = "";
        this.used_coupon = false;
        this.$pushMsg(res, "加入購物車");
        this.getCart();
        this.emitter.emit("updateProductInCart");
      });
    },
    delOneQty(item) {
      const updateQty = item.qty - 1;
      const delItem = { product_id: item.product.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.status.delLoadingItem = item.id;
      this.$http.put(api, { data: delItem }).then((res) => {
        this.status.delLoadingItem = "";
        this.$pushMsg(res, "刪除");
        this.getCart();
        this.emitter.emit("updateProductInCart");
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
          this, (this.status.updateLoadingItem = "");
          this.$pushMsg(res, "更新數量");
          this.getCart();
          this.emitter.emit("updateProductInCart");
        });
    },
    useCoupon() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http.post(api, { data: { code: this.couponCode } }).then((res) => {
        this.$pushMsg(res, "套用優惠券");
        if (res.data.success) {
          this.used_coupon = true;
        }
        this.getCart();
        this.emitter.emit("updateProductInCart");
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
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.imgBody {
  height: 100px;
  object-fit: cover;
}

.infoText {
  font-size: 13px;
}

.cartContainer {
  padding-top: 100px;
}
</style>
