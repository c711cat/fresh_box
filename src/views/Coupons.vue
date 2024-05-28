<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading v-if="isLoading"></Loading>
  <div
    v-else
    class="mx-auto col-10 col-sm-11 col-md-10 col-lg-11 col-xl-11 col-xxl-10"
  >
    <div
      class="pt-4 pb-3 d-flex flex-wrap justify-content-between align-items-center"
    >
      <h3>後台優惠券列表</h3>
      <div>
        <button
          @click="openCouponModal(true)"
          type="button"
          class="btn btn-outline-primary"
        >
          新增優惠券
        </button>
      </div>
    </div>
    <div>
      <div class="row m-0 align-items-center">
        <div class="col-12">
          <div
            v-for="(coupon, index) in coupons"
            :key="index"
            class="row align-items-center border-top py-2"
          >
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 py-2">
              名稱：{{ coupon.title }}
            </div>
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 py-2">
              折扣碼：{{ coupon.code }}
            </div>
            <div class="col-12 col-sm-4 col-md-3 col-lg-2 py-2">
              總金額乘以 {{ coupon.percent }} ％
            </div>
            <div class="col-12 col-sm-5 col-md-3 col-lg-3 py-2">
              使用期限：{{ $filters.changeDateStyle(coupon.due_date) }}
            </div>
            <div
              v-if="coupon.is_enabled"
              class="col-12 col-sm-2 col-md-8 col-lg-1 text-success py-2"
            >
              啟用
            </div>
            <div
              v-else
              class="col-12 col-sm-2 col-md-8 col-lg-1 text-secondary py-2"
            >
              未啟用
            </div>
            <div
              class="col-12 col-sm-5 col-md-4 col-lg-2 d-flex justify-content-end flex-wrap"
            >
              <button
                @click="openCouponModal(isNew, coupon)"
                type="button"
                class="btn btn-outline-primary rounded-1 me-1 my-1"
              >
                編輯
              </button>
              <button
                @click="openDelModal(coupon)"
                type="button"
                class="btn btn-outline-danger rounded-1 me-1 my-1"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CouponModal
    @edit-coupon="updateCoupon"
    @add-coupon="addCoupon"
    :coupon="tempCoupon"
    ref="couponModal"
  ></CouponModal>
  <DelModal
    ref="delModal"
    @del-coupon="delCoupon"
    :coupon="tempCoupon"
  ></DelModal>
</template>

<script>
import CouponModal from "@/components/CouponModal.vue";
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
      this.$http
        .get(api)
        .then((res) => {
          this.coupons = res.data.coupons;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
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
            this.getCoupons();
            this.$pushMsg.status200(res, "新增優惠券成功");
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
        this.tempCoupon = {};
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
          this.getCoupons();
          if (res.data.success) {
            this.$refs.couponModal.hideModal();
            this.$pushMsg.status200(res, "更新優惠券成功");
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
          this.getCoupons();
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "已刪除優惠券");
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
