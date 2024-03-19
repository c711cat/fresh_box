<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Navbar></Navbar>
  <div>
    <Messages></Messages>
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import emitter from "@/methods/emitter";
import Messages from "@/components/Messages.vue";

export default {
  data() {
    return {};
  },
  provide() {
    return {
      emitter,
    };
  },
  components: { Navbar, Messages },
};
</script>
