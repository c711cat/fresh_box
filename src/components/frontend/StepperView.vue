<template>
  <div class="d-flex justify-content-between align-items-center col-12">
    <p
      class="col-auto p-2 flex-wrap mb-0 text-primary border border-primary text-center rounded"
      :class="textFontSize"
    >
      建立訂單
    </p>

    <div class="position-relative w-100 mx-2 d-flex align-items-center">
      <div class="text-end border-top w-100" :class="payingArrow"></div>
      <div class="arrow right" :class="payingArrow"></div>
    </div>

    <p
      class="col-auto p-2 mb-0 border text-center rounded"
      :class="[payingText, textFontSize]"
    >
      進行付款
    </p>

    <div class="position-relative w-100 mx-2 d-flex align-items-center">
      <div class="text-end border-top w-100" :class="paidArrow"></div>
      <div class="arrow right" :class="paidArrow"></div>
    </div>

    <p
      class="col-auto p-2 mb-0 border text-center rounded"
      :class="[paidText, textFontSize]"
    >
      付款完成
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      currentWidth: 1000,
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
    getCurrentWidth() {
      this.currentWidth = window.innerWidth;
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
    textFontSize() {
      if (this.currentWidth <= 575) {
        return "fs-6";
      } else {
        return "fs-5";
      }
    },
  },
  created() {
    this.getCurrentWidth();
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
