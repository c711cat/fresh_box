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
          <strong> {{ delText }} </strong><br />
          <strong v-if="tempOrder.id"> {{ delItemId }} </strong><br />
          <strong v-if="tempOrder.id"> {{ delItemTime }} </strong>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <!-- 優惠券 -->
          <button @click="delItem" type="button" class="btn btn-danger">
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
    allOrders: {},
    pages: {},
  },
  methods: {
    turnDate(date) {
      return new Date(date * 1000).toLocaleString("taiwan", { hour12: false });
    },
    delItem() {
      if (this.coupon.id) {
        this.$emit("del-coupon", this.tempCoupon);
      }
      if (this.tempProduct.id) {
        this.$emit("del-product", this.tempProduct, this.pages.current_page);
      }
      if (this.tempOrder.id) {
        this.$emit("del-order", this.tempOrder, this.pages.current_page);
      }
      if (this.allOrders) {
        this.$emit("del-all-orders");
      }
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
  computed: {
    delText() {
      if (this.coupon.id) {
        console.log(this.coupon);
        return `確定刪除 ${this.coupon.title} 這張優惠券？`;
      }
      if (this.tempOrder.id) {
        return "確定刪除這張訂單？";
      }
      if (this.allOrders) {
        return "確定刪除全部訂單？";
      }
      if (this.tempProduct.id) {
        return `確定刪除 ${this.tempProduct.title} 這個產品？`;
      } else {
        return "";
      }
    },
    delItemId() {
      if (this.tempOrder) {
        return `訂單編號： ${this.tempOrder.id}`;
      } else {
        return "";
      }
    },
    delItemTime() {
      if (this.tempOrder) {
        return `訂單時間： ${this.turnDate(this.tempOrder.create_at)}`;
      } else {
        return "";
      }
    },
  },
};
</script>
