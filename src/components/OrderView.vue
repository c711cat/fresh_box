<template>
  <div class="row m-0 p-0">
    <section class="detailsText pb-2 col-lg-7">
      <header
        class="d-flex align-items-center justify-content-between flex-wrap"
      >
        <h3 class="ps-3">訂單明細</h3>
        <div class="ps-3">
          <p class="orderId mb-0">訂單日期 {{ turnDate(order.create_at) }}</p>
          <p class="orderId mb-0">訂單編號 {{ order.id }}</p>
        </div>
      </header>

      <main
        v-for="item in order.products"
        :key="item.id"
        class="row m-0 justify-content-center align-items-center border-top pt-3 pb-3"
      >
        <router-link
          :to="`/product/${item.product.id}`"
          class="d-none d-sm-block col-sm-2 col-xxl-1 m-0 text-center p-0"
        >
          <img class="imgBody" :src="item.product.imageUrl" alt="" />
        </router-link>
        <div
          class="col-7 col-sm-6 col-md-4 col-lg-5 col-xl-4 col-xxl-7 row mx-0 my-1 align-items-center"
        >
          <router-link
            :to="`/product/${item.product.id}`"
            class="col-md-12 col-lg-12 col-xl-12 col-xxl-4 titleLink"
          >
            {{ item.product.title }}
          </router-link>
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
      </main>

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
          <div class="col-12 text-yellow-600">
            <i class="bi bi-info-circle"></i>
            滿 NT$ 1,000 免運
          </div>
        </div>

        <div class="col-5 col-sm-4 col-lg-3 col-xl-2 text-end">
          NT$ {{ order.shippingFee }}
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
    </section>
    <section class="col-lg-5">
      <h3 class="border-bottom pb-2 ps-3">收件人資訊</h3>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <p class="mb-0 py-1 fw-bold col-sm-2 col-12">姓名</p>
        <p class="mb-0 py-1 col-sm-10 col-12">{{ order.user.name }}</p>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <p class="mb-0 py-1 fw-bold col-sm-2 col-12">email</p>
        <p class="mb-0 py-1 col-sm-10 col-12">{{ order.user.email }}</p>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <p class="mb-0 py-1 fw-bold col-sm-2 col-12">電話</p>
        <p class="mb-0 py-1 col-sm-10 col-12">{{ order.user.tel }}</p>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <p class="mb-0 py-1 fw-bold col-sm-2 col-12">地址</p>
        <p class="mb-0 py-1 col-sm-10 col-12">
          {{ order.user.address }}
        </p>
      </div>
      <div class="px-4 mb-2 d-flex flex-wrap">
        <p class="mb-0 py-1 fw-bold col-sm-2 col-12">備註</p>
        <p class="mb-0 py-1 col-sm-10 col-12">{{ order.message }}</p>
      </div>
    </section>
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
        shippingFee: 290,
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
    oneOrder() {
      this.order = { ...this.oneOrder };
      this.getSubtotal();
    },
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
        this.order.shippingFee = 290;
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

.titleLink {
  text-decoration: none;
  color: #212529;
}

.titleLink:hover {
  font-weight: bold;
}
</style>
