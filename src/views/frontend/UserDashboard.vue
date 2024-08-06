<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="userViewContainer">
    <div>
      <UserNavbar :currentPath="this.$route.path"></UserNavbar>
      <router-view />
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import UserNavbar from "@/components/frontend/UserNavbar.vue";
import Footer from "@/components/frontend/Footer.vue";

export default {
  data() {
    return {};
  },
  components: { UserNavbar, Footer },
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
