<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    ref="toast"
    class="toast mb-2 shadow-none"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="d-flex align-items-center ms-2 px-2 py-1">
        <div :class="iconStyle" class="me-3 fs-3"></div>
        <div class="text_color fs-6">{{ msg.title }}</div>
      </div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div v-if="msg.content" class="toast-body text-danger border-top ps-4">
      <strong>必填欄位：</strong>{{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from "bootstrap/js/dist/toast";

export default {
  data() {
    return {};
  },
  props: ["msg"],
  computed: {
    iconStyle() {
      if (this.msg.style === "success") {
        return "bi bi-check-circle-fill text-success";
      } else {
        return "bi bi-x-circle-fill text-danger";
      }
    },
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 3000,
    });
    toast.show();
  },
};
</script>

<style lang="scss" scoped>
.text_color {
  color: #727272;
}
</style>
