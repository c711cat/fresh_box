<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-5">
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
      class="row g-1 m-0 border-top pt-3 justify-content-center align-items-center"
    >
      <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">小計</div>
      <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">NT$ 2000</div>
      <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
        運費
        <div class="infoText col-12 text-danger">
          <i class="bi bi-info-circle"></i>
          滿 NT$ 1000 免運
        </div>
      </div>

      <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        NT$ {{ shippingFee }}
      </div>

      <strong class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
        付款金額
      </strong>
      <strong class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
        NT$ {{ paymentAmount }}
      </strong>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: [],
      status: { addLoadingItem: "", delLoadingItem: "", updateLoadingItem: "" },
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
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
      });
    },
    addOneToCart(item) {
      const addItem = { product_id: item.product.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
      this.$http.post(api, { data: addItem }).then((res) => {
        this.status.addLoadingItem = "";
        this.$pushMsg(res, "加入購物車");
        this.getCart();
      });
    },
    delOneQty(item) {
      const updateQty = item.qty - 1;
      const delItem = { product_id: item.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.status.delLoadingItem = item.id;
      this.$http.put(api, { data: delItem }).then((res) => {
        this.status.delLoadingItem = "";
        this.$pushMsg(res, "刪除");
        this.getCart();
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
        .put(api, { data: { product_id: item.id, qty: updateQty } })
        .then((res) => {
          this, (this.status.updateLoadingItem = "");
          this.$pushMsg(res, "更新數量");
          this.getCart();
        });
    },
  },
  computed: {
    subtotal() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.final_total;
      });
      return total;
    },
    shippingFee() {
      if (this.subtotal >= 1000) {
        return 0;
      } else {
        return 260;
      }
    },
    paymentAmount() {
      return this.subtotal + this.shippingFee;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid black;
}
.imgBody {
  height: 100px;
  object-fit: cover;
}

.infoText {
  font-size: 13px;
}
</style>
