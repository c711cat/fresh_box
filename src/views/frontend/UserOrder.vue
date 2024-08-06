<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading" />
  <div v-else class="mt-5 pt-4">
    <div
      class="mx-2 mt-5 mx-auto col-11 col-sm-11 col-md-10 col-lg-11 col-xl-10 col-xxl-11"
    >
      <Order class="pt-2" :transOrder="order"></Order>
    </div>
    <div
      class="text-end col-11 col-sm-11 col-md-10 col-lg-11 col-xl-10 col-xxl-11 pb-5 my-0 mx-auto"
    >
      <div v-if="order.is_paid" class="col-lg-7">
        <router-link to="/user-products" class="border-0">
          <button type="button" class="btn btn-outline-dark px-4 me-3">
            繼續逛逛
          </button>
        </router-link>
        <router-link to="/order-list" class="border-0 pe-4">
          <button type="button" class="btn btn-outline-primary px-4">
            查看訂單
          </button>
        </router-link>
      </div>

      <div v-else class="col-lg-7 pe-3">
        <button
          @click="toPay"
          :disabled="isLoading"
          type="button"
          class="btn btn-danger px-4"
        >
          確認付款
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "@/components/Order.vue";
export default {
  data() {
    return {
      order: {},
      isLoading: false,
    };
  },
  components: { Order },
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
