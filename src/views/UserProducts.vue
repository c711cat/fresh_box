<template>
  <div class="my-3 d-flex flex-wrap">
    <div v-for="(item, index) in allProducts" :key="index" class="mx-auto">
      <div class="card" style="width: 18rem">
        <img :src="item.imageUrl" class="card-img-top" />

        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.content }} / {{ item.unit }}</p>
          <div class="d-flex justify-content-between">
            <p class="card-text text-secondary">
              原價 {{ item.origin_price }}元
            </p>
            <strong class="card-text text-danger fs-5"
              >特價 {{ item.price }}元
            </strong>
          </div>
          <!-- 加入商品的按鈕 -->
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary border-radius">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <!-- 加減商品的input -->
          <div class="input-group input-group">
            <button type="button" class="btn btn-outline-primary">
              <i class="bi bi-dash-lg"></i>
            </button>
            <input class="form-control" />
            <button type="button" class="btn btn-outline-primary">
              <i class="bi bi-plus-lg"></i>
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
      allProducts: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((res) => {
        console.log(res);
        this.allProducts = res.data.products;
        console.log(this.allProducts);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
// * {
//   border: 1px solid black;
// }
</style>
