<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center headerStyle">
      <h3 class="py-4 mb-0">後台優惠券列表</h3>
      <div>
        <button
          @click="openCouponModal"
          type="button"
          class="btn btn-outline-primary"
        >
          新增優惠券
        </button>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center border-top py-4">
        <div class="col-12">
          <div class="row align-items-center text-center">
            <div class="col-12 col-md-3 py-2">首購禮首購禮首購禮</div>
            <div class="col-6 col-md-2 text-center py-2">折扣％</div>
            <div class="col-6 col-md-2 py-2">使用期限：2024/12/31</div>
            <!-- <div class="col-6 col-md-2 text-success">啟用</div> -->
            <div class="col-6 col-md-2 text-secondary text-center">未開啟</div>
            <div class="col-6 col-md-3 d-flex justify-content-center flex-wrap">
              <button
                type="button"
                class="btn btn-outline-primary rounded-1 me-1 my-1"
              >
                編輯
              </button>
              <button
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
    @add-coupon="addCoupon"
    :coupon="tempCoupon"
    ref="couponModal"
  ></CouponModal>
</template>

<script>
import CouponModal from "@/components/CouponModal.vue";
export default {
  data() {
    return {
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
    };
  },
  components: { CouponModal },
  methods: {
    getCoupons() {
      const page = 1;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http.get(api).then((res) => {
        this.tempCoupon = res.data.coupons;
      });
    },
    addCoupon(coupon) {
      console.log(coupon);

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      this.$http.post(api, { data: coupon }).then((res) => {
        console.log(res);
        this.getCoupons();
        this.$refs.couponModal.hideModal();
      });
    },
    openCouponModal() {
      this.$refs.couponModal.showModal();
      this.tempCoupon = {};
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style lang="scss" scoped>
.headerStyle {
  padding-left: 6%;
  padding-right: 6%;
}
</style>
