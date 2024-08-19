<template>
  <MessagesView />
  <router-view />
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import MessagesView from "@/components/MessagesView.vue";
import emitter from "@/methods/emitter";

export default {
  components: { MessagesView },
  provide() {
    return {
      emitter,
    };
  },
  mounted() {
    AOS.init();
  },
};
</script>

<style lang="scss">
@import "@/assets/all.scss";
</style>
