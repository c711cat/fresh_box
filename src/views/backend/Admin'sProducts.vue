<template>
  <LoadingView v-if="isLoading" />
  <main v-else class="wrap px-3 d-flex flex-column align-items-center">
    <header
      class="row m-0 p-2 col-12 col-xxl-11 justify-content-between align-items-center"
    >
      <h3 v-if="noResults">查無相關商品</h3>
      <h3 v-if="itemsInProducts" class="col-auto col-sm-6 m-0 p-1">
        後台產品列表
      </h3>
      <div v-if="itemsInProducts" class="col-auto p-1">
        <button @click="openModal(true)" type="button" class="btn btn-primary">
          新增產品
        </button>
      </div>
    </header>
    <section
      v-for="item in products"
      :key="item.id"
      :class="{ 'bg-light': item.is_enabled === 0 }"
      class="row m-0 col-12 col-xxl-11 justify-content-center align-items-center py-2 border-top text-center text-sm-start"
    >
      <div
        class="position-relative text-center col-4 col-sm-6 col-md-3 col-lg-2"
      >
        <router-link :to="isPath(item)">
          <img
            :srcset="`${item.imageUrl}&w=500`"
            :class="{
              disabled: item.is_enabled === 0,
              xsWidth: currentWidth <= 450,
            }"
            class="img-fluid linkStyle"
          />
          <div
            v-if="item.is_enabled === 0"
            class="disabledContainer disabled position-absolute start-0 top-0"
          >
            <strong>未 販 售</strong>
          </div>
        </router-link>
      </div>

      <div class="text-start col-8 col-sm-6 col-md-3 col-lg-3 col-xl-2">
        <div>{{ item.title }}</div>
        <div>{{ item.content }}／{{ item.unit }}</div>
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2">
        <div>原價</div>
        <div>NT$ {{ $filters.currency(item.origin_price) }}</div>
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2">
        <div>售價</div>
        <div>NT$ {{ $filters.currency(item.price) }}</div>
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <div>數量</div>
        <div>{{ item.qty }} {{ item.unit }}</div>
      </div>
      <div
        v-if="item.is_enabled"
        class="py-3 px-3 col-12 col-sm-3 col-md-3 col-lg-1 text-success text-end text-md-center"
      >
        販售中
      </div>
      <div
        v-else
        class="py-3 px-3 col-12 col-sm-3 col-md-3 col-lg-1 text-secondary text-end text-md-center"
      >
        未販售
      </div>
      <div class="px-3 text-end col-12 col-md-9 col-lg-12 col-xl-2">
        <button
          @click="openModal(false, item)"
          type="button"
          class="btn btn-outline-dark-primary rounded-1 me-1 my-1"
        >
          編輯
        </button>
        <button
          @click="openDelModal(item)"
          type="button"
          class="btn btn-outline-danger rounded-1 my-1"
        >
          刪除
        </button>
      </div>
    </section>
    <PaginationView
      v-if="openPagination"
      :pages="pagination"
      @emit-pages="getProducts"
    />
  </main>

  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @edit-product="editProduct"
    @add-product="addProduct"
    :pages="pagination"
  />
  <DelModal
    ref="delModal"
    :product="tempProduct"
    @del-product="delProduct"
    :pages="pagination"
  />
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      products: [],
      tempProduct: { is_enabled: 0 },
      isNew: false,
      isLoading: false,
      pagination: {},
      openPagination: true,
      searchText: null,
      currentWidth: 1000
    }
  },
  components: { ProductModal, DelModal, PaginationView },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http
        .get(api)
        .then((res) => {
          this.pagination = res.data.pagination
          this.products = res.data.products
          this.openPagination = true
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得產品資料失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = { description: [''], notes: [''], is_enabled: 0 }
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    addProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product`
      this.isLoading = true
      this.$http
        .post(api, { data: this.tempProduct })
        .then(() => {
          this.getProducts()
          this.$refs.productModal.hideModal()
          this.$pushMsg.status200('新增產品成功')
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '新增產品失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    editProduct (item, currentPage) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.isLoading = true
      this.$http
        .put(api, { data: this.tempProduct })
        .then(() => {
          this.getProducts(currentPage)
          this.$refs.productModal.hideModal()
          this.$pushMsg.status200('更新產品成功')
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '更新產品失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    openDelModal (item) {
      this.$refs.delModal.showModal()
      this.tempProduct = { ...item }
    },
    delProduct (item, currentPage) {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.isLoading = true
      this.$http
        .delete(api)
        .then(() => {
          this.getProducts(currentPage)
          this.$refs.delModal.hideModal()
          this.$pushMsg.status200('已刪除產品')
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '刪除失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    isPath (item) {
      if (item.is_enabled === 0) {
        return '/dashboard/admin-products'
      } else {
        return `/product/${item.id}`
      }
    },
    getCurrentWidth () {
      this.currentWidth = window.outerWidth
    }
  },
  computed: {
    noResults () {
      if (this.searchText !== null && this.products.length === 0) {
        return true
      } else {
        return false
      }
    },
    itemsInProducts () {
      return this.products.length >= 1
    }
  },
  created () {
    this.getCurrentWidth()
    this.getProducts()
    this.emitter.on('adminSearchProductNull', () => {
      this.searchText = null
      this.getProducts()
    })
    this.emitter.on('adminSearchProductResult', (searchResult) => {
      this.products = searchResult.data
      this.searchText = searchResult.data2
      this.openPagination = false
    })
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 120px;
}

img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}

.xsWidth {
  height: 8vh;
}

.linkStyle:hover {
  filter: brightness(1.1);
  border: 3px solid #fff;
}

.disabled:hover {
  box-shadow: none;
  cursor: not-allowed;
}

.disabledContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(253, 253, 253, 0.581);
  color: #6c757d;
}
</style>
