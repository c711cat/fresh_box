<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3 class="titleStyle py-4 mb-0">後台產品列表</h3>

  <div class="container">
    <div
      v-for="item in products"
      :key="item.id"
      class="row align-items-center border-top py-4"
    >
      <div class="text-center col-12 col-sm-2">
        <img :src="item.imageUrl" class="img-fluid" />
      </div>
      <div class="col-12 col-sm-10">
        <div class="row align-items-center">
          <div class="col-12 col-sm-6 col-lg-3">
            <div>{{ item.title }}</div>
            <div>{{ item.content }}</div>
          </div>
          <div class="col-4 col-sm-3 col-lg">
            <div>原價</div>
            <div>NT$ {{ item.origin_price }}</div>
          </div>
          <div class="col-4 col-sm-3 col-lg">
            <div>售價</div>
            <div>NT$ {{ item.price }}</div>
          </div>
          <div class="col-4 col-sm-6 col-lg">
            數量：{{ item.num }}{{ item.unit }}
          </div>
          <div
            v-if="item.is_enabled"
            class="col-8 col-sm-3 col-lg text-success"
          >
            販售中
          </div>
          <div v-else class="col-8 col-sm-3 col-lg text-secondary">未販售</div>
          <div class="col-4 col-sm-3 col-lg-auto">
            <button
              type="button"
              class="btn btn-outline-primary rounded-1 me-1 my-1"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger rounded-1 me-1 my-1"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.titleStyle {
  padding-left: 6%;
}
</style>
