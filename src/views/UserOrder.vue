<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-2 pt-4">
    <Order ref="order" @order="getOrder"></Order>
  </div>

  <div class="text-end col-12 col-lg-7 pe-4">
    <router-link v-if="order.is_paid" to="/user/user-products" class="border-0">
      <button type="button" class="btn btn-outline-primary px-4 me-3">
        繼續逛逛
      </button>
    </router-link>

    <router-link v-if="order.is_paid" to="/user/order-list" class="border-0">
      <button type="button" class="btn btn-outline-success px-4">
        查看訂單
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
      <button v-else @click="toPay" type="button" class="btn btn-danger px-4">
        確認付款
      </button>
  </div>
</template>

<script>
import Order from "@/components/Order.vue";
export default {
  data() {
    return {
      order: {},
    };
  },
  components: { Order },
  methods: {
    toPay() {
      this.$refs.order.toPay();
    },
    getOrder(order) {
      this.order = { ...order };
    },
  },
};
</script>
