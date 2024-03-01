<template>
  <div
    ref="delModal"
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
          <h5 class="modal-title text-white">刪除產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <span
            >確定刪除
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
          <button type="button" class="btn btn-danger">確定刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.delModal);
  },
};
</script>
