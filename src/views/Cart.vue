<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-3">
    <h3 class="ps-2">購物車清單</h3>
    <div
      v-for="(item, index) in carts"
      :key="index"
      class="row m-0 justify-content-center align-items-center border-top pt-3 pb-3"
    >
      <div class="col-1 col-md-1 text-center">
        <button
          @click="delItem(item)"
          type="button"
          class="w-auto btn btn-outline-danger border-0"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <img
        class="imgBody col-2 col-md-2 col-lg-1 col-xl-1"
        :src="item.product.imageUrl"
        alt=""
      />

      <div class="col-4 col-md-3 col-lg-6 col-xl-5 row m-0 align-items-center">
        <div class="col-md-12 col-lg-4">{{ item.product.title }}</div>
        <div class="col-md-12 col-lg-4">
          {{ item.product.content }}／{{ item.product.unit }}
        </div>
        <div
          v-if="item.product.origin_price === item.product.price"
          class="text-secondary col-md-12 col-lg-4"
        >
          NT$ {{ item.product.origin_price }}
        </div>
        <div v-else class="text-danger fw-bold col-md-12 col-lg-4">
          NT$ {{ item.product.price }}
        </div>
      </div>

      <div class="row m-0 align-items-center col-5 col-md-6 col-lg-4 col-xl-4">
        <div class="d-flex col-12 col-md-6 col-lg-6 col-xl-6">
          <button
            @click="delOneQty(item)"
            :disabled="item.id === status.delLoadingItem"
            type="button"
            class="btn btn-light rounded-0 rounded-start"
          >
            <i class="bi bi-dash-lg"></i>
          </button>

          <input
            :disabled="item.id === status.updateLoadingItem"
            @change="updateQtyOfInput(item)"
            v-model="item.qty"
            type="text"
            class="form-control text-center rounded-0"
          />

          <button
            @click="addOneToCart(item)"
            :disabled="item.id === status.addLoadingItem"
            type="button"
            class="btn btn-light rounded-0 rounded-end"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>

        <div
          class="mt-3 text-center text-md-end col-12 col-md-6 col-lg-6 col-xl-6"
        >
          NT$ {{ item.total }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: {},
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
      } else {
        return;
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
</style>
