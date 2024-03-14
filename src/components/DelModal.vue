<template>
  <div
    ref="Modal"
    class="modal fade"
    id="deleteModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 v-if="tempCoupon.id" class="modal-title text-white">
            刪除優惠券
          </h5>
          <h5 v-else class="modal-title text-white">刪除產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <span v-if="tempCoupon.id">
            確定刪除
            <span class="text-danger fw-bold fs-5">
              {{ tempCoupon.title }}
            </span>
            這張優惠券？
          </span>
          <span v-else>
            確定刪除
            <span class="text-danger fw-bold fs-5">
              {{ tempProduct.title }}
            </span>
            這個產品？
          </span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="tempCoupon.id"
            @click="$emit('del-coupon', tempCoupon)"
            type="button"
            class="btn btn-danger"
          >
            確定刪除
          </button>
          <button
            v-else
            @click="$emit('del-product', tempProduct, pages.current_page)"
            type="button"
            class="btn btn-danger"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalMixin from "@/mixins/modalMixin";

export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
      tempCoupon: {},
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    pages: {},
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
    coupon() {
      this.tempCoupon = this.coupon;
    },
  },
  mixins: [ModalMixin],
};
</script>
