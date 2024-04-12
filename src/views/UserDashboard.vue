<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navContainer">
    <UserNavbar></UserNavbar>
  </div>

  <div class="viewContainer">
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

<style lang="scss" scoped>
.navContainer {
  margin-bottom: 120px;
}
.viewContainer {
  margin: 0px 20px;
}
</style>
