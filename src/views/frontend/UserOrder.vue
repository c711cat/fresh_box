<template>
  <LoadingView v-if="isLoading" />
  <main v-else class="mt-5 pt-4 mb-5">
    <section
      class="mx-2 mt-5 mx-auto col-11 col-sm-11 col-md-10 col-lg-11 col-xl-10 col-xxl-11"
    >
      <OrderView class="pt-2 mb-3" :transOrder="order"></OrderView>
      <section class="col-12 col-lg-5 px-2 ms-auto">
        <div
          v-if="order.is_paid"
          class="col-12 d-flex flex-wrap justify-content-between"
        >
          <router-link to="/user-products" class="border-0 col p-1">
            <button type="button" class="w-100 btnBody btn btn-outline-primary">
              繼續逛逛
            </button>
          </router-link>
          <router-link to="/order-list" class="border-0 col p-1">
            <button type="button" class="w-100 btnBody btn btn-outline-dark">
              查看訂單
            </button>
          </router-link>
        </div>
        <div v-else class="">
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
import OrderView from "@/components/OrderView.vue";
export default {
  data() {
    return {
      order: {},
      isLoading: false,
    };
  },
  components: { OrderView },
  methods: {
    getOrder() {
      const orderId = this.$route.params.orderId || this.OrderId;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.$http
        .get(api)
        .then((res) => {
          this.order = res.data.order;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    toPay() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.isLoading = true;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.$pushMsg.status200(res, "付款成功");
            this.getOrder();
          } else {
            this.$pushMsg.status200(res, "付款失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped>
.btnBody {
  min-width: 100px;
}
</style>
