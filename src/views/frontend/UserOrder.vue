<template>
  <LoadingView v-if="isLoading" />
  <main v-else class="mt-5 pt-4 mb-5">
    <div class="d-flex justify-content-center col-12 mt-4 mb-3 py-3">
      <div
        class="col-11 col-sm-11 col-md-10 col-lg-11 col-xl-10 col-xxl-11 px-4"
      >
        <router-view />
      </div>
    </div>
    <section
      class="mx-2 mx-auto col-11 col-sm-11 col-md-10 col-lg-11 col-xl-10 col-xxl-11"
    >
      <OrderView class="pt-2 mb-3" :transOrder="order" />
      <section class="col-12 col-lg-5 px-4 ms-auto">
        <div
          v-if="order.is_paid"
          class="col-12 d-flex flex-wrap justify-content-between"
        >
          <router-link to="/order-list" class="border-0 col p-1">
            <button type="button" class="w-100 btnBody btn btn-outline-primary">
              查看訂單
            </button>
          </router-link>
          <router-link to="/user-products" class="border-0 col p-1">
            <button type="button" class="w-100 btnBody btn btn-primary">
              繼續逛逛
            </button>
          </router-link>
        </div>
        <div v-else>
          <button
            @click="toPay"
            :disabled="isLoading"
            type="button"
            class="btn btn-primary w-100"
          >
            確認付款
          </button>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import OrderView from '@/components/OrderView.vue'
export default {
  data () {
    return {
      order: {},
      isLoading: false
    }
  },
  components: { OrderView },
  methods: {
    getOrder () {
      const orderId = this.$route.params.orderId || this.OrderId
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/order/${orderId}`
      this.$http
        .get(api)
        .then((res) => {
          this.order = res.data.order
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '取得訂單資料失敗')
        })
    },
    toPay () {
      const api = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`
      this.isLoading = true
      this.$http
        .post(api)
        .then(() => {
          this.$pushMsg.status200('付款成功')
          this.getOrder()
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response, '付款失敗')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
.btnBody {
  min-width: 100px;
}

.btn-outline-primary:hover{
  background-color: #fff;
  border:1px solid #887426;
  color:#887426;
}
</style>
