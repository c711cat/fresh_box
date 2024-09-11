<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="wrap">
    <header
      class="mx-auto mb-2 col-11 col-md-10 col-lg-11 col-xl-10 d-flex justify-content-between align-items-center flex-wrap"
    >
      <h3 class="ps-2">後台優惠券列表</h3>
      <div class="ps-2">
        <button
          @click="openCouponModal(true)"
          type="button"
          class="btn btn-primary"
        >
          新增優惠券
        </button>
      </div>
    </header>

    <div
      class="row my-0 mx-auto align-items-center col-11 col-md-10 col-lg-11 col-xl-10"
    >
      <section
        v-for="coupon in coupons"
        :key="coupon.id"
        :class="{ 'bg-light': coupon.is_enabled === 0 }"
        class="row m-0 align-items-center border-top py-3"
      >
        <div
          :class="{ 'text-secondary': coupon.is_enabled === 0 }"
          class="col-12 col-sm-4 col-lg-2 col-xl-2 py-2"
        >
          名稱：{{ coupon.title }}
        </div>
        <div
          :class="{ 'text-secondary': coupon.is_enabled === 0 }"
          class="col-12 col-sm-4 col-lg-3 col-xl-2 py-2"
        >
          折扣碼：{{ coupon.code }}
        </div>
        <div
          :class="{ 'text-secondary': coupon.is_enabled === 0 }"
          class="col-12 col-sm-4 col-lg-3 col-xl-2 py-2"
        >
          總金額乘以 {{ coupon.percent }} ％
        </div>
        <div
          :class="{ 'text-secondary': coupon.is_enabled === 0 }"
          class="col-12 col-sm-4 col-lg-3 col-xl-3 py-2"
        >
          使用期限：{{ $filters.changeDateStyle(coupon.due_date) }}
        </div>
        <div
          v-if="coupon.is_enabled"
          class="col-12 col-sm-4 col-lg-1 col-xl-1 text-success py-2"
        >
          啟用
        </div>
        <div
          v-else
          class="col-12 col-sm-4 col-lg-1 col-xl-1 text-secondary py-2"
        >
          未啟用
        </div>
        <div
          class="col-12 col-sm-4 col-lg-12 col-xl-2 py-2 text-end text-sm-start text-lg-end"
        >
          <button
            @click="openCouponModal(isNew, coupon)"
            type="button"
            class="btn btn-outline-dark-primary rounded-1 me-2 my-1"
          >
            編輯
          </button>
          <button
            @click="openDelModal(coupon)"
            type="button"
            class="btn btn-outline-danger rounded-1 my-1"
          >
            刪除
          </button>
        </div>
      </section>
    </div>
  </div>
  <CouponModal
    @edit-coupon="updateCoupon"
    @add-coupon="addCoupon"
    :coupon="tempCoupon"
    ref="couponModal"
  />
  <DelModal ref="delModal" @del-coupon="delCoupon" :coupon="tempCoupon" />
</template>

<script>
import CouponModal from "@/components/backend/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";
export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: { CouponModal, DelModal },
  methods: {
    getCoupons() {
      const page = 1;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.coupons = res.data.coupons;
        this.isLoading = false;
      });
    },
    addCoupon(coupon) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      this.isLoading = true;
      this.$http
        .post(api, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.$refs.couponModal.hideModal();
            this.$pushMsg.status200(res, "新增優惠券成功");
            this.getCoupons();
          } else {
            this.$pushMsg.status200(res, "新增優惠券失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openCouponModal(isNew, coupon) {
      this.$refs.couponModal.showModal();
      if (isNew) {
        this.tempCoupon = { is_enabled: 0 };
      } else {
        this.tempCoupon = { ...coupon };
      }
    },
    updateCoupon(coupon) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      this.isLoading = true;
      this.$http
        .put(api, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.$refs.couponModal.hideModal();
            this.$pushMsg.status200(res, "已更新優惠券");
            this.getCoupons();
          } else {
            this.$pushMsg.status200(res, "更新優惠券失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openDelModal(coupon) {
      this.$refs.delModal.showModal();
      this.tempCoupon = { ...coupon };
    },
    delCoupon(coupon) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
      this.isLoading = true;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "已刪除優惠券");
            this.getCoupons();
          } else {
            this.$pushMsg.status200(res, "刪除優惠券失敗");
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
    this.getCoupons();
  },
};
</script>

<style>
.wrap {
  margin-top: 120px;
}
</style>
