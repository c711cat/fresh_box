<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else class="row my-5 mx-auto">
    <div
      v-for="(item, index) in allProducts"
      :key="index"
      class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center"
    >
      <div class="card mb-3 mx-2" style="width: 18rem">
        <img :src="item.imageUrl" class="card-img-top" />

        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">{{ item.title }}</h5>
            <span class="badge text-bg-danger rounded-circle fs-6">{{
              item.buyQty
            }}</span>
          </div>

          <p class="card-text">{{ item.content }} / {{ item.unit }}</p>
          <div class="d-flex justify-content-between mb-2">
            <strong
              class="card-text text-secondary fs-5"
              :class="{
                'text-decoration-line-through':
                  item.price !== item.origin_price,
              }"
              >NT$ {{ item.origin_price }}</strong
            >
            <strong
              v-if="item.price !== item.origin_price"
              class="card-text text-danger fs-5"
              >NT$ {{ item.price }}
            </strong>
          </div>
          <!-- 加入商品的按鈕 -->
          <div v-if="plus" class="d-flex justify-content-end">
            <button
              @click="addCart(item)"
              type="button"
              class="btn btn-outline-primary border-radius"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <!-- 加減商品的input -->
          <div v-else class="input-group">
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
import Loading from "@/components/Loading.vue";

export default {
  data() {
    return {
      allProducts: [],
      pagination: {},
      isLoading: false,
      plus: true,
      carts: {},
    };
  },
  components: { Pagination, Loading },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.allProducts = res.data.products;
        this.pagination = res.data.pagination;
        window.scrollTo(0, 0);
        this.pushBuyQty();
      });
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.post(api, { data: addItem }).then((res) => {
        this.$pushMsg(res, "加入購物車");
        this.getCart();
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
        console.log(this.carts);
        this.getProducts();
      });
    },
    pushBuyQty() {
      this.allProducts.forEach((item) => {
        this.carts.forEach((cartItem) => {
          if (item.id === cartItem.product_id) {
            item.buyQty = cartItem.qty;
          }
        });
      });
      console.log(this.allProducts);
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 190px;
  object-fit: cover;
}

.card {
  height: 370px;
}
</style>
