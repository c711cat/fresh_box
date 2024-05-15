<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row m-0 p-0">
    <div class="detailsText pb-2 col-lg-7">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="ps-3">訂單明細</h3>
        <div>
          <div class="orderId">訂單日期 {{ turnDate(order.create_at) }}</div>
          <div class="orderId">訂單編號 {{ order.id }}</div>
        </div>
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
            NT$ {{ $filters.currency(item.product.origin_price) }}
          </div>
          <div
            v-else
            class="text-danger fw-bold col-md-12 col-lg-12 col-xl-12 col-xxl-4"
          >
            NT$ {{ $filters.currency(item.product.price) }}
          </div>
        </div>

        <div
          class="row m-0 align-items-center col-5 col-sm-4 col-md-6 col-lg-5 col-xl-4 col-xxl-4"
        >
          <div class="py-2 d-flex col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            數量：{{ item.qty }}
          </div>

          <div class="my-2 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            NT$ {{ $filters.currency(item.total) }}
          </div>
        </div>
      </div>

      <div
        class="col-12 row g-1 m-0 border-top py-3 justify-content-center align-items-center"
      >
        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">小計</div>
        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ $filters.currency(order.subtotal) }}
        </div>

        <div
          v-if="order.discount > 0"
          class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end"
        >
          優惠碼折抵
        </div>
        <div
          v-if="order.discount > 0"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          - NT$ {{ $filters.currency(order.discount) }}
        </div>
        <div
          v-if="order.discount > 0"
          class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end"
        >
          折抵後小計
        </div>
        <div
          v-if="order.discount > 0"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          NT$ {{ $filters.currency(order.afterDiscount) }}
        </div>

        <div class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end">
          冷藏宅配
          <div class="col-12 text-success">
            <i class="bi bi-info-circle"></i>
            滿 NT$ 1,000 免運
          </div>
        </div>

        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ $filters.currency(order.shippingFee) }}
        </div>

        <strong
          :class="paymentAmountColor"
          class="col-6 col-sm-7 col-lg-8 col-xl-9 text-sm-end"
        >
          付款金額
        </strong>
        <strong
          :class="paymentAmountColor"
          class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end"
        >
          NT$ {{ $filters.currency(order.paymentAmount) }}
        </strong>
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
        <div class="py-1 col-sm-10 col-12">
          {{ order.user.address }}
        </div>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <div class="py-1 fw-bold col-sm-2 col-12">備註</div>
        <div class="py-1 col-sm-10 col-12">{{ order.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        products: {},
        subtotal: 0,
        discount: 0,
        afterDiscount: 0,
        paymentAmount: 0,
        shippingFee: 260,
        user: {},
      },
    };
  },
  props: {
    oneOrder: {},
    transOrder: {},
  },
  watch: {
    transOrder() {
      this.order = { ...this.transOrder };
      this.getSubtotal();
    },
    oneOrder() {},
  },
  methods: {
    getOrder() {
      if (this.oneOrder) {
        this.order = { ...this.oneOrder };
        this.order.user = { ...this.oneOrder.user };
        this.order.products = { ...this.oneOrder.products };
        this.getSubtotal();
      }
    },
    getSubtotal() {
      let subtotal = 0;
      Object.values(this.order.products).forEach((item) => {
        subtotal += item.total;
      });
      this.order.subtotal = subtotal;
      this.getAfterDiscount();
    },
    getAfterDiscount() {
      this.order.afterDiscount = Math.round(this.order.total);
      this.getDiscount();
      this.getShippingFee();
      this.getPaymentAmount();
      this.getShippingFee();
    },
    getDiscount() {
      this.order.discount = this.order.subtotal - this.order.afterDiscount;
    },
    getShippingFee() {
      if (this.order.total >= 1000) {
        this.order.shippingFee = 0;
      }
      if (this.order.total < 1000) {
        this.order.shippingFee = 260;
      }
    },
    getPaymentAmount() {
      this.order.paymentAmount =
        this.order.afterDiscount + this.order.shippingFee;
    },
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
  },
  computed: {
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
    paymentAmountColor() {
      if (this.order.is_paid === true) {
        return "";
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
