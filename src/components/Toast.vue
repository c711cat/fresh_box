<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    ref="toast"
    :class="successBorder"
    class="toast mb-2 shadow-none"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div :class="toastBgColor" class="d-flex">
      <div class="border-0 ms-2 p-2">
        <div :class="textColor" class="fs-6">{{ msg.title }}</div>
      </div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div v-if="msg.content" class="toast-body ms-2 text-danger">
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
    toastBgColor() {
      if (this.msg.style === "success") {
        return "success_color";
      } else {
        return "failure_color";
      }
    },
    successBorder() {
      if (this.msg.style === "success") {
        return "success_border";
      } else {
        return "";
      }
    },
    textColor() {
      if (this.msg.style === "success") {
        return "text_success_color";
      } else {
        return "text_failure_color";
      }
    },
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 6000,
    });
    toast.show();
  },
};
</script>

<style lang="scss" scoped>
.success_color {
  background-color: rgb(199, 243, 199);
}

.failure_color {
  background-color: #dc3545;
}

.success_border {
  border: 1px solid rgb(199, 243, 199);
}

.text_success_color {
  color: #727272;
}

.text_failure_color {
  color: white;
}
</style>
