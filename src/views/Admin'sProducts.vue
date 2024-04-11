<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else>
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="titleStyle py-4 mb-0">後台產品列表</h3>
      <div>
        <button
          @click="openModal(true)"
          type="button"
          class="btn btn-outline-primary me-5"
        >
          新增產品
        </button>
      </div>
    </div>
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
              <div>{{ item.content }}／{{ item.unit }}</div>
            </div>
            <div class="col-4 col-sm-3 col-lg">
              <div>原價</div>
              <div>NT$ {{ $filters.currency(item.origin_price) }}</div>
            </div>
            <div class="col-4 col-sm-3 col-lg">
              <div>售價</div>
              <div>NT$ {{ $filters.currency(item.price) }}</div>
            </div>
            <div class="col-4 col-sm-6 col-lg">
              數量：{{ item.qty }} {{ item.unit }}
            </div>
            <div
              v-if="item.is_enabled"
              class="col-8 col-sm-3 col-lg text-success"
            >
              販售中
            </div>
            <div v-else class="col-8 col-sm-3 col-lg text-secondary">
              未販售
            </div>
            <div
              class="col-auto col-sm-3 col-lg-auto d-flex justify-content-start flex-wrap"
            >
              <button
                @click="openModal(false, item)"
                type="button"
                class="btn btn-outline-primary rounded-1 me-1 my-1"
              >
                編輯
              </button>
              <button
                @click="openDelModal(item)"
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
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @edit-product="editProduct"
    @add-product="addProduct"
    :pages="pagination"
  >
  </ProductModal>
  <DelModal
    ref="delModal"
    :product="tempProduct"
    @del-product="delProduct"
    :pages="pagination"
  >
  </DelModal>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  components: { ProductModal, DelModal, Pagination },
  inject: ["emitter"],
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.pagination = res.data.pagination;
        this.isLoading = false;
        this.products = res.data.products;
        window.scrollTo(0, -100);
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      this.$refs.productModal.showModal();
    },
    addProduct(item) {
      this.tempProduct = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      this.isLoading = true;
      this.$http.post(api, { data: this.tempProduct }).then((res) => {
        this.$pushMsg(res, "新增產品");
        this.getProducts();
        if (res.data.success) {
          this.$refs.productModal.hideModal();
        } else {
          return;
        }
      });
    },
    editProduct(item, current_page) {
      this.tempProduct = item;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.isLoading = true;
      this.$http.put(api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false;
        this.$pushMsg(res, "更新產品");
        this.getProducts(current_page);
        if (res.data.success) {
          this.$refs.productModal.hideModal();
        } else {
          return;
        }
      });
    },
    openDelModal(item) {
      this.$refs.delModal.showModal();
      this.tempProduct = { ...item };
    },
    delProduct(item, current_page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        this.isLoading = false;
        this.$pushMsg(res, "刪除產品");
        this.getProducts(current_page);
        if (res.data.success) {
          this.$refs.delModal.hideModal();
        } else {
          return;
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.emitter.on("adminSearchNull", () => {
      this.getProducts();
    });
    this.emitter.on("adminSearchResult", (data) => {
      this.products = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.titleStyle {
  padding-left: 6%;
}
</style>
