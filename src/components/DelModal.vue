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
          <h5 class="modal-title text-white">再次確認</h5>
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
          <strong v-if="tempOrder.id">
            確定刪除這張訂單？
            <div class="text-danger fw-bold fs-5">
              訂單編號 {{ tempOrder.id }}
            </div>
            <div class="text-danger fw-bold fs-5">
              訂單日期 {{ turnDate(tempOrder.create_at) }}
            </div>
          </strong>
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
            v-if="tempOrder.id"
            @click="$emit('del-order', tempOrder)"
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
      tempOrder: {},
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
    order: {
      type: Object,
      default() {
        return {};
      },
    },
    pages: {},
  },
  methods: {
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
    coupon() {
      this.tempCoupon = this.coupon;
    },
    order() {
      this.tempOrder = this.order;
    },
  },
  mixins: [ModalMixin],
};
</script>
