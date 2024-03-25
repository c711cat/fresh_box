<template>
  <div class="row my-4 mx-auto justify-content-center">
    <div class="row m-0 justify-content-center">
      <img class="imgBody p-1 col-12 col-md-5" :src="product.imageUrl" alt="" />

      <div class="mt-3 px-4 col-12 col-md-5 col-lg-4 col-xl-3">
        <h4>{{ product.title }}</h4>
        <div class="productContent">
          {{ product.content }} / {{ product.unit }}
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
          <button type="button" class="btn btn-light rounded-0 rounded-start">
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            v-model="number"
            type="text"
            class="form-control text-center rounded-0"
          />
          <button type="button" class="btn btn-light rounded-0 rounded-end">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <button type="button" class="btn btn-light w-100">加入購物車</button>
      </div>
    </div>
    <div class="m-1 col-12 col-md-10 col-lg-8">{{ product.description }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      number: 1,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.product;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.imgBody {
  height: 600px;
  object-fit: cover;
}
.productContent {
  color: #77797a;
}
.btn {
  border: 1px solid #dee2e6;
}
</style>
