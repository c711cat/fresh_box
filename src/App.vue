<template>
  <Messages></Messages>
  <router-view />
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import Messages from "@/components/Messages.vue";
import emitter from "@/methods/emitter";

export default {
  components: { Messages },
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
