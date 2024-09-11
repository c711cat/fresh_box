<template>
  <div class="d-flex justify-content-between align-items-center col-12">
    <p
      class="col-2 col-sm-auto flex-wrap mb-0 fs-5 text-primary border border-primary p-2 text-center rounded"
    >
      建立<br class="d-block d-sm-none" />訂單
    </p>

    <div class="position-relative w-100 mx-2 d-flex align-items-center">
      <div class="text-end border-top w-100" :class="payingArrow"></div>
      <div class="arrow right" :class="payingArrow"></div>
    </div>

    <p
      class="col-2 col-sm-auto mb-0 fs-5 border p-2 text-center rounded"
      :class="payingText"
    >
      進行<br class="d-block d-sm-none" />付款
    </p>

    <div class="position-relative w-100 mx-2 d-flex align-items-center">
      <div class="text-end border-top w-100" :class="paidArrow"></div>
      <div class="arrow right" :class="paidArrow"></div>
    </div>

    <p
      class="col-2 col-sm-auto mb-0 fs-5 border p-2 text-center rounded"
      :class="paidText"
    >
      付款<br class="d-block d-sm-none" />完成
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.$route.params.orderId}`;
      this.$http
        .get(api)
        .then((res) => {
          this.order = res.data.order;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
  },
  computed: {
    payingText() {
      if (this.$route.params.orderId) {
        return "text-primary border-primary";
      } else {
        return "text-secondary border-gray-light";
      }
    },
    payingArrow() {
      if (this.$route.params.orderId) {
        return "border-primary";
      } else {
        return "border-gray-light";
      }
    },
    paidText() {
      if (this.order.is_paid) {
        return "text-primary border-primary";
      } else {
        return "text-secondary border-gray-light";
      }
    },
    paidArrow() {
      if (this.order.is_paid) {
        return "border-primary";
      } else {
        return "border-gray-light";
      }
    },
  },
  created() {
    if (this.$route.params.orderId) {
      this.getOrder();
    }
  },
};
</script>

<style lang="scss" scoped>
.arrow {
  border: 1px solid;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  position: absolute;
  right: 1px;
}

.right {
  transform: rotate(-45deg);
}
</style>
