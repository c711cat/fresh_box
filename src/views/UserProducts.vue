<template>
  <div class="row my-5 mx-auto">
    <div
      v-for="(item, index) in allProducts"
      :key="index"
      class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center"
    >
      <div class="card mb-3 mx-2" style="width: 18rem">
        <h3
          v-if="isMyFavorite(item)"
          @click="delMyFavorite(item)"
          class="bi bi-suit-heart-fill delmyFavoriteIcon position-absolute z-1"
        ></h3>

        <h3
          v-else
          @click="addMyFavorite(item)"
          class="bi bi-suit-heart myFavoriteIcon position-absolute z-1"
        ></h3>

        <img
          @click="goToProduct(item)"
          :src="item.imageUrl"
          class="imgBody card-img-top position-relative"
        />

        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ item.title }}</h5>
              <span
                v-if="item.buyQty >= 1"
                class="badge text-bg-danger rounded-pill fs-6"
              >
                {{ item.buyQty }}
              </span>
            </div>

            <p class="card-text">{{ item.content }} / {{ item.unit }}</p>
            <div class="d-flex justify-content-between mb-2">
              <strong
                class="card-text text-secondary fs-6"
                :class="{
                  'text-decoration-line-through':
                    item.price !== item.origin_price,
                }"
              >
                NT$ {{ item.origin_price }}
              </strong>
              <strong
                v-if="item.price !== item.origin_price"
                class="card-text text-danger fs-6"
                >NT$ {{ item.price }}
              </strong>
            </div>
          </div>

          <div
            class="btn-group w-100"
            role="group"
            aria-label="Default button group"
          >
            <!-- - -->
            <button
              @click="delOne(item)"
              :disabled="!item.buyQty || item.id === status.delLoadingItem"
              type="button"
              class="btn btn-light w-50"
            >
              <div
                v-if="item.id === status.delLoadingItem"
                class="spinner-border text-dark spinner-grow-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="bi bi-dash-lg"></i>
            </button>
            <!-- + -->
            <button
              @click="addCart(item)"
              :disabled="item.id === status.addLoadingItem"
              type="button"
              class="btn btn-light w-50"
            >
              <div
                v-if="item.id === status.addLoadingItem"
                class="spinner-border text-dark spinner-grow-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="bi bi-plus-lg"></i>
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
      plus: true,
      carts: {},
      status: {
        addLoadingItem: "",
        delLoadingItem: "",
      },
      myFavoriteList: [],
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.allProducts = res.data.products;
        this.pagination = res.data.pagination;
        window.scrollTo(0, 0);
        this.pushBuyQtyId();
        this.getMyFavorite();
      });
    },
    addCart(item) {
      const addItem = { product_id: item.id, qty: 1 };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.status.addLoadingItem = item.id;
      this.$http.post(api, { data: addItem }).then((res) => {
        this.status.addLoadingItem = "";
        this.$pushMsg(res, "加入購物車");
        this.getCart();
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts;
        this.carts.forEach((item) => {
          if (item.qty === 0) {
            this.delItem(item.id);
          } else {
            return;
          }
        });
        this.getProducts();
      });
    },
    pushBuyQtyId() {
      this.allProducts.forEach((item) => {
        this.carts.forEach((cartItem) => {
          if (item.id === cartItem.product_id) {
            item.buyQty = cartItem.qty;
            item.pushCartId = cartItem.id;
          }
        });
      });
    },
    delOne(item) {
      const updateQty = item.buyQty - 1;
      const delItem = { product_id: item.id, qty: updateQty };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.pushCartId}`;
      this.status.delLoadingItem = item.id;
      this.$http.put(api, { data: delItem }).then((res) => {
        this.status.delLoadingItem = "";
        this.$pushMsg(res, "刪除 1 個品項");
        this.getCart();
      });
    },
    goToProduct(item) {
      this.$router.push(`/user/product/${item.id}`);
    },
    delItem(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        return res;
      });
    },
    getMyFavorite() {
      this.myFavoriteList =
        JSON.parse(localStorage.getItem("myFavorite")) || [];
    },
    isMyFavorite(item) {
      let favorite = "";
      this.myFavoriteList.forEach((listItem) => {
        if (item.id === listItem.id) {
          favorite = true;
        }
      });
      return favorite;
    },
    addMyFavorite(addItem) {
      this.myFavoriteList.push(addItem);
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
    },
    delMyFavorite(delItem) {
      this.myFavoriteList.filter((item, index) => {
        if (delItem.id === item.id) {
          return this.myFavoriteList.splice(index, 1);
        }
      });
      localStorage.setItem("myFavorite", JSON.stringify(this.myFavoriteList));
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
.imgBody:hover {
  cursor: pointer;
  border: 2px solid #fff;
}
.badge {
  height: fit-content;
}
.delmyFavoriteIcon {
  right: 0px;
  top: 0px;
  padding: 8px 12px;
  color: #f52424b3;
}
.delmyFavoriteIcon:hover {
  cursor: pointer;
  color: #dc3545;
}
.myFavoriteIcon {
  right: 0px;
  top: 0px;
  padding: 8px 12px;
  color: #ffffffb3;
}
.myFavoriteIcon:hover {
  cursor: pointer;
  color: #f52424;
}
</style>
