<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="toast-container end-0 top-0 mt-3 container-fluid">
    <Toast v-for="(msg, index) in messages" :key="index" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from "@/components/Toast.vue";

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: { Toast },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("push-message", (message) => {
      const { style = "success", title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
