<template>
  <div class="row my-5 mx-auto">
    <div
      v-for="(item, index) in allProducts"
      :key="index"
      class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center"
    >
      <div class="card mb-3 mx-2" style="width: 18rem">
        <img :src="item.imageUrl" class="card-img-top" />

        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.content }} / {{ item.unit }}</p>
          <div class="d-flex justify-content-between">
            <p class="card-text text-secondary">NT$ {{ item.origin_price }}</p>
            <strong class="card-text text-danger fs-5"
              >NT$ {{ item.price }}
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

  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      allProducts: [],
      pagination: {},
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        console.log(res);
        this.allProducts = res.data.products;
        this.pagination = res.data.pagination;
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

img {
  height: 190px;
  object-fit: cover;
}

.card {
  height: 370px;
}
</style>
