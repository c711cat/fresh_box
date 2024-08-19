<template>
  <div class="toast-container end-0 mt-3 container-fluid">
    <ToastView v-for="(msg, index) in messages" :key="msg + index" :msg="msg" />
  </div>
</template>

<script>
import ToastView from "@/components/ToastView.vue";

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: { ToastView },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("push-message", (message) => {
      const { style = "success", title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  top: 80px;
}
</style>
