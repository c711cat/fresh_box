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
          <button type="button" class="btn btn-light rounded-0 rounded-start">
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            v-model="item.qty"
            type="text"
            class="form-control text-center rounded-0"
          />
          <button type="button" class="btn btn-light rounded-0 rounded-end">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: {},
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
        console.log(this.carts);
      });
    },
    delItem(item) {
      console.log(item);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http.delete(api).then((res) => {
        this.$pushMsg(res, "刪除");
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
