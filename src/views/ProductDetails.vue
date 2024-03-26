<template>
  <div class="row my-4 mx-auto justify-content-center">
    <div class="row m-0 d-cloumn justify-content-center">
      <div class="p-1 col-12 col-md-5">
        <img class="imgBody col-12 mb-3" :src="product.imageUrl" alt="" />
        <div class="row m-0 overflow-x-auto flex-nowrap">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            @click="changeImg(img)"
            :src="img"
            class="imgItems col-3 mb-3"
            alt=""
          />
        </div>
      </div>

      <div class="mt-3 px-4 col-12 col-md-5 col-lg-4 col-xl-3">
        <h4 class="mb-3">{{ product.title }}</h4>
        <div class="productContent">
          規格：{{ product.content }} / {{ product.unit }}
        </div>
        <div v-if="product.origin_place" class="productContent">
          產地：{{ product.origin_place }}
        </div>
        <div v-if="product.origin_place" class="productContent">
          保存方式：{{ product.preservation_methods }}
        </div>
        <div class="productContent">
          {{ product.description }}
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
          <button
            :disabled="productQty === 1"
            @click="delQty"
            type="button"
            class="btn btn-light rounded-0 rounded-start"
          >
            <i class="bi bi-dash-lg"></i>
          </button>
          <input
            v-model="productQty"
            type="text"
            class="form-control text-center rounded-0"
          />
          <button
            @click="addQty"
            type="button"
            class="btn btn-light rounded-0 rounded-end"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <button @click="addToCart" type="button" class="btn btn-light w-100">
          加入購物車
        </button>
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
      productQty: 1,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.product;
        this.pushImg();
        console.log(this.product);
      });
    },
    addQty() {
      this.productQty = this.productQty + 1;
    },
    delQty() {
      this.productQty = this.productQty - 1;
    },
    addToCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(api, {
          data: { product_id: this.product.id, qty: this.productQty },
        })
        .then((res) => {
          this.$pushMsg(res, "加入購物車");
        });
    },
    changeImg(img) {
      this.product.imageUrl = img;
    },
    pushImg() {
      this.product.images.splice(0, 0, this.product.imageUrl);
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

.imgItems {
  height: 100px;
  object-fit: cover;
}

.imgItems:hover {
  cursor: pointer;
  padding: 0px;
}

.productContent {
  color: #29211bb3;
  margin-bottom: 10px;
}

.btn {
  border: 1px solid #dee2e6;
}
</style>
