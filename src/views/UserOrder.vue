<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading"></Loading>
  <div v-else>
    <div class="mx-2 pt-4">
      <Order :transOrder="order"></Order>
    </div>
    <div class="text-end col-12 col-lg-7 pe-4 pb-5">
      <router-link
        v-if="order.is_paid"
        to="/user/user-products"
        class="border-0"
      >
        <button type="button" class="btn btn-outline-primary px-4 me-3">
          繼續逛逛
        </button>
      </router-link>
      <router-link v-if="order.is_paid" to="/user/order-list" class="border-0">
        <button type="button" class="btn btn-outline-success px-4">
          查看訂單
        </button>
      </router-link>
      <div v-else>
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
      this.$http.get(api).then((res) => {
        this.order = { ...res.data.order };
        console.log(this.order);
      });
    },
    toPay() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.isLoading = true;
      this.$http.post(api).then((res) => {
        this.isLoading = false;
        this.$pushMsg(res, "付款");
        this.getOrder();
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped></style>
