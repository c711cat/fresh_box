<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <UserNavbar></UserNavbar>
  </div>

  <div>
    <Messages></Messages>
    <router-view />
  </div>
</template>

<script>
import UserNavbar from "../components/UserNavbar.vue";
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
  components: { UserNavbar, Messages },
};
</script>
