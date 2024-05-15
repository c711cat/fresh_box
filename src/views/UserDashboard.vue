<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="userViewContainer">
    <div>
      <UserNavbar></UserNavbar>
      <Messages></Messages>
      <router-view />
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
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

<style lang="scss" scoped>
.userViewContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
