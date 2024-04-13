<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row m-0 p-0">
    <div class="detailsText pb-2 col-lg-7">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="ps-3">訂單明細</h3>
        <div class="orderId">訂單編號 {{ order.id }}</div>
      </div>

      <div
        v-for="(item, index) in order.products"
        :key="index"
        class="row m-0 justify-content-center align-items-center border-top pt-3 pb-3"
      >
        <div class="d-none d-sm-block col-sm-2 col-xxl-1 m-0 text-center">
          <img class="imgBody" :src="item.product.imageUrl" alt="" />
        </div>

        <div
          class="col-7 col-sm-6 col-md-4 col-lg-5 col-xl-4 col-xxl-7 row mx-0 my-1 align-items-center"
        >
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-4">
            {{ item.product.title }}
          </div>
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-4">
            {{ item.product.content }}／{{ item.product.unit }}
          </div>
          <div
            v-if="item.product.origin_price === item.product.price"
            class="text-secondary col-md-12 col-lg-12 col-xl-12 col-xxl-4"
          >
            NT$ {{ item.product.origin_price }}
          </div>
          <div
            v-else
            class="text-danger fw-bold col-md-12 col-lg-12 col-xl-12 col-xxl-4"
          >
            NT$ {{ item.product.price }}
          </div>
        </div>

        <div
          class="row m-0 align-items-center col-5 col-sm-4 col-md-6 col-lg-5 col-xl-4 col-xxl-4"
        >
          <div class="py-2 d-flex col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            數量：{{ item.qty }}
          </div>

          <div class="my-2 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            NT$ {{ item.total }}
          </div>
        </div>
      </div>

      <div
        class="col-12 row g-1 m-0 border-top py-3 justify-content-center align-items-center"
      >
        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">小計</div>
        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ subtotal }}
        </div>

        <div
          v-if="showDiscount"
          class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end"
        >
          優惠碼折抵
        </div>
        <div
          v-if="showDiscount"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          - NT$ {{ discount }}
        </div>
        <div
          v-if="showDiscount"
          class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end"
        >
          折抵後小計
        </div>
        <div
          v-if="showDiscount"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          NT$ {{ afterDiscount }}
        </div>

        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          冷藏宅配
          <div class="col-12 text-danger">
            <i class="bi bi-info-circle"></i>
            滿 NT$ 1000 免運
          </div>
        </div>

        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ shippingFee }}
        </div>

        <strong class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          付款金額
        </strong>
        <strong class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ paymentAmount }}</strong
        >
        <strong class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          付款狀態
        </strong>
        <strong
          :class="paymentStatusColor"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          {{ paymentStatus }}
        </strong>
      </div>
    </div>
    <div class="col-lg-5">
      <h3 class="border-bottom pb-2 ps-3">收件人資訊</h3>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">姓名</div>
        <div class="py-1 col-sm-10 col-12">{{ order.user.name }}</div>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">email</div>
        <div class="py-1 col-sm-10 col-12">{{ order.user.email }}</div>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">電話</div>
        <div class="py-1 col-sm-10 col-12">{{ order.user.tel }}</div>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">地址</div>
        <div class="py-1 col-sm-10 col-12">{{ order.user.address }}</div>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">備註</div>
        <div class="py-1 col-sm-10 col-12">
          {{ order.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
        products: [],
      },
      shippingFee: 260,
    };
  },
  props: {
    OrderId: {},
    isLoading: {},
  },
  methods: {
    getOrder() {
      const orderId = this.$route.params.orderId || this.OrderId;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.$http.get(api).then((res) => {
        this.order = { ...res.data.order };
        this.getShippingFee();
        this.emitOrderToUserOrder();
      });
    },
    getShippingFee() {
      if (this.order.total >= 1000) {
        this.shippingFee = 0;
      }
      if (this.order.total < 1000) {
        this.shippingFee = 260;
      }
    },
    toPay() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.$emit("loading", true);
      this.$http.post(api).then((res) => {
        this.$pushMsg(res, "付款");
        this.getOrder();
        this.$emit("loading", false);
      });
    },
    emitOrderToUserOrder() {
      this.$emit("order", this.order);
    },
  },
  computed: {
    subtotal() {
      let total = 0;
      Object.values(this.order.products).forEach((item) => {
        total += item.total;
      });
      return total;
    },
    discount() {
      return this.subtotal - this.afterDiscount;
    },
    afterDiscount() {
      return Math.round(this.order.total);
    },
    showDiscount() {
      if (this.discount === 0) {
        return false;
      } else {
        return true;
      }
    },
    paymentAmount() {
      return this.afterDiscount + this.shippingFee;
    },
    paymentStatus() {
      if (this.order.is_paid === true) {
        return "付款完成";
      } else {
        return "未付款";
      }
    },
    paymentStatusColor() {
      if (this.order.is_paid === true) {
        return "text-success";
      } else {
        return "text-danger";
      }
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped>
.detailsText {
  font-size: 14px;
}
.imgBody {
  width: 50px;
  object-fit: cover;
}
.orderId {
  font-size: 12px;
}
</style>
