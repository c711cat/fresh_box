<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <UserNavbar></UserNavbar>
  </div>

  <div>
    <Messages></Messages>
    <router-view />
  </div>
  <Footer></Footer>
</template>

<script>
import UserNavbar from "../components/UserNavbar.vue";
import emitter from "@/methods/emitter";
import Messages from "@/components/Messages.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {};
  },
  provide() {
    return {
      emitter,
    };
  },
  components: { UserNavbar, Messages, Footer },
};
</script>
