<template>
  <div class="row my-4 mx-auto justify-content-center">
    <div class="row m-0 d-cloumn justify-content-center">
      <div class="p-1 col-12 col-md-5 position-relative">
        <img class="imgBody col-12 mb-3" :src="product.imageUrl" alt="" />
        <h2
          v-if="isMyFavorite"
          @click="delMyFavorite"
          class="bi bi-suit-heart-fill delmyFavoriteIcon position-absolute z-1"
        ></h2>

        <h2
          v-else
          @click="addMyFavorite"
          class="bi bi-suit-heart myFavoriteIcon position-absolute z-1"
        ></h2>
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
        <h4 class="mb-3 border-bottom pb-3">{{ product.title }}</h4>
        <div v-if="product.description" class="productContent mb-4">
          {{ product.description }}
        </div>
        <div class="productContent">
          規格：{{ product.content }} / {{ product.unit }}
        </div>
        <div v-if="product.origin_place" class="productContent">
          產地：{{ product.origin_place }}
        </div>
        <div v-if="product.preservation_methods" class="productContent">
          保存方式：{{ product.preservation_methods }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      productQty: 1,
      myFavoriteList: [],
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.product;
        this.pushImg();
        this.getMyFavorite();
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
          data: { product_id: this.product.id, qty: Number(this.productQty) },
        })
        .then((res) => {
          this.$pushMsg(res, "加入購物車");
          this.productQty = 1;
        });
    },
    changeImg(img) {
      this.product.imageUrl = img;
    },
    pushImg() {
      this.product.images.splice(0, 0, this.product.imageUrl);
    },
    getMyFavorite() {
      this.myFavoriteList =
        JSON.parse(localStorage.getItem("myFavorite")) || [];
    },
    addMyFavorite() {
      this.myFavoriteList.push(this.product);
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
    delMyFavorite() {
      this.myFavoriteList.filter((listItem, index) => {
        if (this.product.id === listItem.id) {
          return this.myFavoriteList.splice(index, 1);
        }
      });
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
  },
  computed: {
    isMyFavorite() {
      let favorite = "";
      this.myFavoriteList.forEach((listItem) => {
        if (this.product.id === listItem.id) {
          favorite = true;
        }
      });
      return favorite;
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
  color: #9c9ea1;
  margin-bottom: 10px;
}

.btn {
  border: 1px solid #dee2e6;
}
.delmyFavoriteIcon {
  right: 5px;
  top: 5px;
  padding: 8px 12px;
  color: #f52424b3;
}
.delmyFavoriteIcon:hover {
  cursor: pointer;
  color: #dc3545;
}
.myFavoriteIcon {
  right: 5px;
  top: 5px;
  padding: 8px 12px;
  color: #ffffffb3;
}
.myFavoriteIcon:hover {
  cursor: pointer;
  color: #f52424;
}
</style>
